import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'middleware/mongodb';
import dayjs from 'dayjs';
import Reward from 'models/reward';

type ErrorType = {
    message: string
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Array<Object> | ErrorType>
) => {
    try {
        const { account } = req.body;
        const quizzes = await Reward.find({ account, datetime: { $lte: dayjs().subtract(1, 'day').format('YYYYMMDD') + '235959' } }).populate('quiz');
        const list = quizzes.map(obj => ({
            quiz: obj.quiz._id,
            reward: obj.token,
            date: obj.quiz.date
        }));

        res.json(list);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export default connectDB(handler);