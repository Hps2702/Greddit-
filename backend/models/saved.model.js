const mongoose = require("mongoose")
mongoose.set('strictQuery',true);
const Post = new mongoose.Schema({
    content :{
        type: String,
        required: true,
    },
      sname :{
        type: String,
          required: true,  
      },
      comments: {
          type: Array,
          default: [],
      },
      pid:{
        type: String,
        required:true,
      },
      subgred:{
        type: String,
        required:true,
      },
      oname:{
        type: String,
        required:true,
      }
    },
{collection:'savedata'})

const model=mongoose.model('SaveData',Post)
module.exports = model