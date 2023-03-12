const mongoose = require("mongoose")
mongoose.set('strictQuery', true);
const User = new mongoose.Schema({
    fname : {
        type: String,
    required: true
    },   lname : {
        type: String,
    required: true,
    },
    uname : {
        type: String,
    required: true,
unique: true
    },
    phn :{
        type:Number,
        required:true
    },
    age :{
        type:Number,
        required:true
    },

    email : {type: String,
    required: true,
unique: true},
    password : {type: String,
        required: true},
        followers :{
            type : Array,
            default : []
        },
        following :{
            type : Array,
            default : []
        },
       
}, 
{collection: 'userdata'}
)

const model = mongoose.model('UserData',User)
module.exports = model