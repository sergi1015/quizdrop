import mongoose from 'mongoose';
import Quiz from "models/quiz";
var Schema = mongoose.Schema;

var reward = new Schema({
    account: {
        type: String,
        required: true
    },
    quiz: {
        type: Schema.Types.ObjectId,
        ref: Quiz
    },
    points: {
        type: Number,
        required: true
    },
    token: {
        type: Number,
        required: true
    },
    datetime: {
        type: String,
        required: true
    },
    reward_sent: {
        type: Boolean,
        required: true
    }
});

var Reward = mongoose.models.Reward || mongoose.model('Reward', reward);

export default Reward;
