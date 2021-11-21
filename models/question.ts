import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var question = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    usedCount: {
        type: Number,
        required: true
    }
});

var Question = mongoose.models.Question || mongoose.model('Question', question);

export default Question;
