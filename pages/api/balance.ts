import type { NextApiRequest, NextApiResponse } from 'next';
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import QdropToken from "build/contracts/QdropToken.json";

const provider = new Web3.providers.HttpProvider(process.env.rpcUrl);
const web3 = new Web3(provider);
const QdropTokenContract = new web3.eth.Contract(QdropToken.abi as AbiItem[], process.env.QDROP_TOKEN_CONTRACT);

type ErrorType = {
    message: string
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Object | ErrorType>
) => {
    try {
        const { account } = req.body;

        const result = await QdropTokenContract.methods.balanceOf(account).call();
        const balance = web3.utils.fromWei(result.toString(), 'ether');

        res.json({ balance });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export default handler;