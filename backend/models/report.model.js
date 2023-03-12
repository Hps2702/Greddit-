const mongoose = require("mongoose")
mongoose.set('strictQuery',true);
const Report = new mongoose.Schema({
    ignore :{
        type: String,
        default : false,
    },
    pdata:{
        type:String,
        required:true,
    },
   sid:{
       type:String,
       required:true,
   },
   pid :{
    type:String,
    required:true,
   },
   user :{
    type:String,
    required:true,
   },
   abuser :{
    type:String,
    required:true,
   },
   concern :{
    type:String,
    required:true,
   },
},
{collection:'reportdata'})

const model = mongoose.model('ReportData',Report)
module.exports = model