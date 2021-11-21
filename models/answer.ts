import mongoose from 'mongoose';
import Quiz from "models/quiz";
import Question from "models/question";
var Schema = mongoose.Schema;

var answer = new Schema({
    account: {
        type: String,
        required: true
    },
    quiz: {
        type: Schema.Types.ObjectId,
        ref: Quiz
    },
    answers: [{
        question: {
            type: Schema.Types.ObjectId,
            ref: Question
        },
        chosen: String
    }]
});

var Answer = mongoose.models.Answer || mongoose.model('Answer', answer);

export default Answer;
