const mongoose = require("mongoose")
mongoose.set('strictQuery', true);
const subgred = new mongoose.Schema({
   Mail : {type:String,
required:true},
  Posts:{
      type: Number,
      default : 0,
  },
  leftusers :{
      type : Array,
      default : []
  },
        Name :{type: String,
            required: true},
            Description :{type: String,
                required: true},
                Image :{
                    data: Buffer,
                    contentType: String
                },
                ctime : {
                    type: String,
            required: true
                },
                tags :{
                    type :Array ,
                    default : [],
                },
                bannedwords :{
                    type :Array ,
                    default : [],
                },
                joinrequests :{
                    type : Array ,
                    default : [],
                },
                joinedusers :{
                    type : Array ,
                    default : [],
                },
                blockedusers :{
                    type:Array,
                    default : [],
                }
              
       
}, 
{collection: 'subgredditdata' , timestamps:true}
)

const model = mongoose.model('SubgredditData',subgred)
module.exports = model