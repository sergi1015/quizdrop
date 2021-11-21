import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var studymaterial = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    added_date: {
        type: String,
        required: true
    }
});

var StudyMaterial = mongoose.models.StudyMaterial || mongoose.model('StudyMaterial', studymaterial);

export default StudyMaterial;
