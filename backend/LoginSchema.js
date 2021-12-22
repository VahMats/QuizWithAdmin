const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({

    username:{
        type:String,
        required:true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        required:false,
    }
},{timestamps:true})

const logReq = mongoose.model('logReq',loginSchema);

module.exports = logReq;