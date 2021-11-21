import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'middleware/mongodb';
import Claimhistory from 'models/claimhistory';
import dayjs from "dayjs";
import Web3 from "web3";

const provider = new Web3.providers.HttpProvider(process.env.rpcUrl);
const web3 = new Web3(provider);

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<{}>
) => {
    try {
        const { account, tokens, hash } = req.body;

        const transaction = await web3.eth.getTransaction(hash);

        if (transaction) {
            const done = await Claimhistory.create({
                account: transaction.from,
                tokens,
                datetime: dayjs().format('YYYYMMDDHHmmss')
            });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error)
    }
}

export default connectDB(handler);