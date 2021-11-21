import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'middleware/mongodb';
import Answer from 'models/answer';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Object | null>
) => {
    try {
        const { account, quiz, question, answer: chosenAnswer  } = req.body;
        const answerModel = await Answer.findOne({ account, quiz });

        // update if not exist
        if (answerModel) {
            const index = answerModel.answers.map((ans: any) => ans.question.toString()).indexOf(question);
            answerModel.answers[index].chosen = chosenAnswer;
            answerModel.save();
        } else {
            const newAnswer = await Answer.create({
                account,
                quiz,
                answers: [{
                    question,
                    chosen: chosenAnswer
                }]
            });
        }

        res.json({ submitted: true});
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export default connectDB(handler);