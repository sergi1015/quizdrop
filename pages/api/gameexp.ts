import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'middleware/mongodb';
import Reward from 'models/reward';

type ErrorType = {
    message: string
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Object | ErrorType>
) => {
    try {
        const { account } = req.body;

        const [response] = await Reward.aggregate([
            { $match: { account: account } },
            {
            $group: {
                _id: "$account",
                total: {
                    $sum: "$points"
                }
            }
        }]);

        const total = (response && response.total) ? response.total : 0;

        res.json({ exp: total });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export default connectDB(handler);