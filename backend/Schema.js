const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    
    questionTitle:{
        type:String,
        required:true,
    },
    answers:{
        type:[String],
        required:true,
    },
    correctAnswer:{
        type:String,
        required:true,
    }
},{timestamps: true});


const Question = mongoose.model('Question',questionSchema);

module.exports = Question;