import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'middleware/mongodb';
import Claimhistory from 'models/claimhistory';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<{}>
) => {
    try {
        const { id } = req.query;
        const history = await Claimhistory.find({ account: id }).sort({ datetime: "desc" });
        const list = history.map(obj => ({
            tokens: obj.tokens,
            datetime: obj.datetime
        }));

        res.status(200).json({ list });
    } catch (error) {
        console.log(error)
    }
}

export default connectDB(handler);