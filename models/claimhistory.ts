import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var claimhistory = new Schema({
    account: {
        type: String,
        required: true
    },
    tokens: {
        type: Number,
        required: true
    },
    datetime: {
        type: String,
        required: true
    },
}, { collection: 'claimhistory' });

var Claimhistory = mongoose.models.Claimhistory || mongoose.model('Claimhistory', claimhistory);

export default Claimhistory;
