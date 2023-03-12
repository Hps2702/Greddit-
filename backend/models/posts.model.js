const mongoose = require("mongoose")
mongoose.set('strictQuery',true);
const Post = new mongoose.Schema({
  uparr : {
    type : Array,
    default : []
  }, 
  downarr : {
    type : Array,
    default : []
  },
  upvote:{
    type:Number,
    default:0,
      },
      downvote:{
          type:Number,
          default:0,
            },
    content :{
        type: String,
        required: true,
    },
      uname :{
        type: String,
          required: true,  
      },
      comments: {
          type: Array,
          default: [],
      },
      id :{
        type: String,
        required: true,  
      },
    },
{collection:'postdata'})

const model=mongoose.model('PostData',Post)
module.exports = model