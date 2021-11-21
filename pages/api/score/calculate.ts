import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'middleware/mongodb';
import Quiz from 'models/quiz';
import Answer from 'models/answer';
import Tokenreward from 'models/tokenreward';
import Reward from 'models/reward';
import dayjs from "dayjs";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import GameReward from "build/contracts/GameReward.json";

const provider = new Web3.providers.HttpProvider(process.env.rpcUrl);
const web3 = new Web3(provider);
const GameRewardContract = new web3.eth.Contract(GameReward.abi as AbiItem[], process.env.GAME_REWARD_CONTRACT);

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Object | null>
) => {
    try {
        const { account, quiz } = req.body;
        let points = 0, reward = 0;

        const tokenReward = await Tokenreward.findOne();
        const answerModel = await Answer.findOne({ account, quiz });
        const quizModel = await Quiz.findOne({ _id: quiz }).populate('questions');
        let rewardModel = await Reward.findOne({ account, quiz });

        if (!answerModel) throw new Error("No answers found.");

        if (rewardModel) {
            points = rewardModel.points;
            reward = rewardModel.token;
        } else {
            answerModel.answers.forEach(answer => {
                const question = quizModel.questions.find(q => q._id.toString() === answer.question.toString());
                // check if answer is correct
                // correct answer should be on the first index of array
                // the question's options will be shuffled on get request
                if (question && question.options[0] === answer.chosen) {
                    points++;
                }
            });

            const result = await GameRewardContract.methods.checkLock(account).call();

            // check if locked
            if (result && result[0]) {
                const multiplier = result[1];
                reward = points * tokenReward.value * multiplier;
            }

            rewardModel = new Reward({
                account,
                quiz,
                points,
                token: reward,
                datetime: dayjs().format('YYYYMMDDHHmmss'),
                reward_sent: false
            });
            rewardModel.save();
        }

        if (!rewardModel.reward_sent && reward > 0) {
            const block = await web3.eth.getBlock("latest");
            const a = GameRewardContract.methods.addReward(account, Web3.utils.toWei(reward.toString(), 'ether').toString());

            const tx = {
                from: process.env.OWNER_WALLET_ADDRESS,
                to: process.env.GAME_REWARD_CONTRACT,
                gas: block.gasLimit,
                data: a.encodeABI()
            };
            // sign transaction
            const signPromise = await web3.eth.accounts.signTransaction(tx, process.env.PK);
            const res = await web3.eth.sendSignedTransaction(signPromise.rawTransaction);

            rewardModel.reward_sent = true;
            rewardModel.save();
        }

        res.json({ points, reward });
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ message: error });
    }
}

export default connectDB(handler);