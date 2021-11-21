import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'middleware/mongodb';
import Question from 'models/question';
import Quiz from 'models/quiz';
import dayjs from "dayjs";

type QuestionType = {
    _id: string,
    question: string,
    options: Array<string>,
    time: Number
}

type QuizType = {
    _id: string,
    date: Date,
    questions: Array<string>
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<{}>
) => {
    try {
        const quiz: QuizType = await Quiz.findOne({ date: dayjs().format('YYYY-MM-DD') });

        if (!quiz) {
            const data: QuestionType[] = await Question.find().sort({ 'usedCount': 1 }).limit(10).exec();
            const questionIds = data.map(question => question._id);
            // insert
            const done = await Quiz.create({
                date: dayjs().format('YYYY-MM-DD'),
                questions: questionIds
            });

            // update usedCount
            questionIds.forEach(async id => {
                await Question.findOneAndUpdate({ _id: id }, { $inc: { usedCount: 1 }});
            });
        }

        res.status(200).json({success: true});
    } catch (error) {
        console.log(error)
    }
}

export default connectDB(handler);