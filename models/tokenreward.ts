import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var tokenreward = new Schema({
    value: [{
        type: Number,
    }]
}, { collection: 'tokenreward' });

var Tokenreward = mongoose.models.Tokenreward || mongoose.model('Tokenreward', tokenreward);

export default Tokenreward;
