import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'middleware/mongodb';
import Quiz from 'models/quiz';
import Answer from 'models/answer';
import dayjs from 'dayjs';
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import GameReward from "build/contracts/GameReward.json";

const provider = new Web3.providers.HttpProvider(process.env.rpcUrl);
const web3 = new Web3(provider);
const GameRewardContract = new web3.eth.Contract(GameReward.abi as AbiItem[], process.env.GAME_REWARD_CONTRACT);

type ErrorType = {
    message: string
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Object | ErrorType>
) => {
    try {
        const { account } = req.body;
        const quiz = await Quiz.findOne({ date: dayjs().format('YYYY-MM-DD') });
        if (!quiz) throw new Error("I'm sorry but you don't have any more quizzes to play. Check again tomorrow.");
        // check if done answering
        console.log('quiz')
        console.log(quiz)
        const answer = await Answer.findOne({ account, quiz: quiz._id });
        if (answer) {
            if (answer.answers.length == 10) {
                throw new Error("You are done answering the quiz for today.");
            }
        }

        const result = await GameRewardContract.methods.checkLock(account).call();
        if (!(result && result[0])) {
            throw new Error("Please lock a token.");
        }

        res.json({ id: quiz._id });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export default connectDB(handler);