import mongoose from 'mongoose';
import Question from "./question";
var Schema = mongoose.Schema;

var quiz = new Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: Question
    }]
}, { collection: 'quizzes'});

var Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quiz);

export default Quiz;
