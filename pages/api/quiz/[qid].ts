import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from 'middleware/mongodb';
import Quiz from 'models/quiz';
import Answer from 'models/answer';

type QuestionType = {
    _id: string,
    question: string,
    options: Array<string>,
    time: Number
}

const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
}

const saveDefaultAnswer = async (account: string, quiz: string, question: string) => {
    const answerModel = await Answer.findOne({ account, quiz });

    // update if not exist
    if (answerModel) {
        answerModel.answers.push({
            question,
            chosen: ''
        });
        answerModel.save();
    } else {
        await Answer.create({
            account,
            quiz,
            answers: [{
                question,
                chosen: ''
            }]
        });
    }
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Object | null>
) => {
    try {
        const { account } = req.body;
        const { qid } = req.query;
        const quiz = await Quiz.findOne({ _id: qid }).populate([{ path: 'questions', strictPopulate: false }]);
        const answer = await Answer.findOne({ account, quiz: quiz._id });
        // const totalAnswered = (answer) ? answer.answers.length : 0;

        if (!quiz) throw new Error("Quiz not found.");
        // if (totalAnswered == 10) throw new Error("You are done answering with this quiz.");

        const answeredQuestions = (answer) ? answer.toObject().answers.map((an: any) => an.question.toString()) : [];
        // shuflle questions
        const questions: Array<QuestionType> = shuffleArray(quiz.toObject().questions);
        // filter not answered questions
        const unansweredQuestions = questions.filter((question: QuestionType) => {
            return answeredQuestions.indexOf(question._id.toString()) === -1;
        });

        if (! unansweredQuestions.length) {
            res.json({ isDone: true });
        } else {
            const selectedQuestion = unansweredQuestions[0];
            // shuffle choices
            const question: QuestionType = { ...selectedQuestion, options: shuffleArray(selectedQuestion.options) }
            // set default for answer (null) for user
            // to disallow refreshing the game and reset the timer
            // this means that the selected question will not be available on next request
            await saveDefaultAnswer(account, qid.toString(), question._id);

            res.json({ ...question, question_number: answeredQuestions.length + 1 });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export default connectDB(handler);