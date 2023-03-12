const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require('bcrypt')
const methodOverride = require("method-override")
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const User = require("./models/user.model");
const SubgredData = require("./models/subgredditinfo.model");
const Post = require("./models/posts.model")
const Report = require("./models/report.model")
const Save = require("./models/saved.model")
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
const DB = "mongodb+srv://assign1:Potterhead31@cluster0.ra2wrez.mongodb.net/mydb?retryWrites=true&w=majority"
mongoose
  .connect(DB)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("mongodb not connected");
  });

app.post("/api", async (req, res) => {
  

  const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.check2,salt)
//console.log(hash)
    const user1 = await User.findOne({
    email: req.body.check1,
  });
  const user = await bcrypt.compare(req.body.check2 , user1.password)
 // console.log(user)
  if (user1) {
    if (user) {
      const token = jwt.sign(
        {
          email: req.body.check1,
          password: hash,
        },
        "secret123"
      );
      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "ok", user: false });
    }
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  console.log("registerserve");
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.pwd,salt)
    const user = await User.create({
      fname: req.body.fname,
      lname: req.body.lname,
      uname: req.body.uname,
      phn: req.body.phn,
      age: req.body.age,
      email: req.body.mail,
      password: hash,         
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});
app.post("/api/profile/getData", async (req, res) => {
  // console.log("here")
  //   console.log(req.body.email)
  const data = await User.findOne({email:req.body.email})
    //  console.log(data)
    res.json(data);
  });
app.post("/api/profile",async(req,res)=>{
   //console.log(req.body)
   console.log("edited")
  //  console.log(req.body)
   const user = await User.findOneAndUpdate({email:req.body.mail},{
    fname: req.body.fname,
    lname: req.body.lname,
    uname: req.body.uname,
    phn: req.body.phn,
    age: req.body.age,
    email: req.body.mail,
    password: req.body.pwd,
   });
})
app.post("/api/subgreddits", async (req, res) => {

  const data = await SubgredData.find({Mail : req.body.email});
  // console.log(data)
  res.json(data);
});
app.get("/api/subgreddits/:id", async (req, res) => {
  const data = await SubgredData.findById(req.params.id);
  // console.log(data)
  res.json(data);
});

// app.delete('/subgreddits/:id',async(req,res)=>{
//     await SubgredData.findByIdAndDelete(req.params.id);
//     res.redirect('/subgreddits')
// })
app.post("/api/delete", async (req, res) => {
  // console.log(req.body.x)
  console.log(req.body.ind);
  const data = await SubgredData.findByIdAndDelete(req.body.ind);
  res.redirect("/subgreddits");
});
app.post("/api/userdelete",async(req,res)=>{
  console.log(req.body.val)
  console.log(req.body.mailid)
  await User.updateOne({email : req.body.mailid},{$pull:{followers:req.body.val}})
  await User.updateOne({email:req.body.val},{$pull:{following:req.body.mailid}})
  const data = await User.findOne({email:req.body.mailid})
     console.log(data)
    res.json(data);
  //res.redirect("/profile");
})
app.post("/api/newdata", async (req, res) => {
  console.log(req.body);

  const user = await SubgredData.create({
    Mail : req.body.mail,
    Name: req.body.name,
    Description: req.body.desc,
    ctime : req.body.time,
    tags : req.body.alltags,
    bannedwords: req.body.allwords
  });
});

app.post("/api/newpost",async(req,res)=>{
 // console.log(req.body)
 console.log("newpost")

  const post = await Post.create({
     content: req.body.content,
    id : req.body.id,
    uname : req.body.uname
  });
  await SubgredData.findOneAndUpdate({_id:req.body.id},{$set:{Posts: (req.body.num+1)}})
  const data = await Post.find({id:req.body.id})
 // console.log(data)
  res.json(data)
})
app.post("/api/getposts",async(req,res)=>{
  //console.log(req.body.id)
  const data = await Post.find({id:req.body.id})
 // console.log(data)
  res.json(data)
})
app.post("/api/userrequest",async(req,res)=>{
  console.log(req.body.ind)
  console.log(req.body.arr)

  await SubgredData.findOneAndUpdate({Name : req.body.ind},{$set : {joinrequests: req.body.arr}})

 //  res.json({status: "error"})
//  }

})
app.post("/api/getuserrequests",async(req,res)=>{
  const data = await SubgredData.findById(req.body.ind)
  //console.log(data)
  res.json(data)
})
app.post("/api/acceptrequests",async(req,res)=>{

  await SubgredData.findOneAndUpdate({_id : req.body.ind},{$set : {joinedusers: req.body.userdata}})
  await SubgredData.findOneAndUpdate({_id : req.body.ind},{$pull : {joinrequests: req.body.val}})
  console.log(req.body.userdata)
  const data = await SubgredData.findById(req.body.ind)
  console.log(req.body.val)
  console.log("accptreq")
  res.json(data)
})
app.post("/api/rejectrequests",async(req,res)=>{
  console.log("rej")
  await SubgredData.findOneAndUpdate({_id:req.body.ind},{$set : {joinrequests:req.body.arr1}})
  const data = await SubgredData.findById(req.body.ind)
  console.log("rejectreq")
  res.json(data)
})
app.get("/api/allsubgreddits",async(req,res)=>{
  const data = await SubgredData.find({})
 // console.log("allsubgreds")
  //console.log(data)
  
  res.json(data)
})
app.post("/api/editpost",async(req,res)=>{
  console.log(req.body.comment,req.body.uid)
  await Post.findOneAndUpdate({_id : req.body.uid},{$push : {comments: req.body.comment}})
  await Save.findOneAndUpdate({pid:req.body.uid},{$push:{comments: req.body.comment}})
  const data = await Post.find({id:req.body.sid})
 res.json(data)
})
app.post("/api/editvote",async(req,res)=>{
  await Post.findOneAndUpdate({_id:req.body.uid},{$set :{uparr : req.body.arr1 }})
  await Post.findOneAndUpdate({_id:req.body.uid},{$set :{downarr : req.body.arr2 }})
  const data = await Post.find({id:req.body.sid})
 // console.log(data)
  res.json(data)
})
app.post("/api/makereport",async(req,res)=>{
  const rep = await  Report.create({
   concern: req.body.concern,
   sid : req.body.sid,
   user: req.body.user,
   abuser : req.body.abuser,
   pid: req.body.pid,
   pdata : req.body.pdata
 });

})
app.post("/api/details",async(req,res)=>{
 const data= await SubgredData.findById(req.body.id)
 res.json(data)
})
app.post("/api/getreport",async(req,res)=>{
  const data = await Report.find({sid:req.body.id})
  res.json(data)
})
app.post("/api/blockuser",async(req,res)=>{
  await SubgredData.findOneAndUpdate({_id : req.body.id},{$push : {blockedusers: req.body.aname}})
await Report.findByIdAndDelete(req.body.ind)
const data = await Report.find({sid:req.body.id})
res.json(data)
//console.log(data)
})

app.post("/api/addfollowers",async(req,res)=>{
  console.log(req.body.who,req.body.me)
const data = await User.findOne({email:req.body.who})
console.log(data.followers)
if(data.followers.includes(req.body.me)) {res.json({status:"error"})}
else {
await User.findOneAndUpdate({email:req.body.who},{$push:{followers:req.body.me}})
await User.findOneAndUpdate({email:req.body.me},{$push:{following:req.body.who}})
res.json({status:"ok"})
}

})
app.post("/api/savepost",async(req,res)=>{
  console.log(req.body.ind,req.body.sname)
  const data1 = await Save.findOne({pid:req.body.ind})
  if(data1) {res.json({status:"error"})}
  else {
  const data = await Post.findById(req.body.ind)
  //console.log(data)

  const save = await Save.create({
    content : data.content,
    sname : req.body.sname,
    comments: data.comments,
    pid: req.body.ind,
    subgred : req.body.sub,
    oname : req.body.oname
  })
  res.json({status:"ok"})
  }
})
app.post("/api/getsaved",async(req,res)=>{
 // console.log("jigajiga")
  const data = await Save.find({sname: req.body.email})
  //console.log(data)
  res.json(data)
})
app.post("/api/unsave",async(req,res)=>{
  await Save.findByIdAndDelete(req.body.ind);
  const data = await Save.find({sname: req.body.email})
  res.json(data)
})
app.post("/api/delpost",async(req,res)=>{
  // console.log(req.body.ind)
  // console.log(req.body.pid)
  await Report.findByIdAndDelete(req.body.ind)
  await Post.findByIdAndDelete(req.body.pid)
  const data1 = await SubgredData.findById(req.body.id)
  console.log(data1)
   await SubgredData.findOneAndUpdate({_id:req.body.id},{$set:{Posts: (Number(data1.Posts)-1)}})
  const data = await Report.find({sid:req.body.id})
  res.json(data)
})
app.post("/api/ignore",async(req,res)=>{
  await Report.findByIdAndUpdate(req.body.ind,{$set : {ignore : true}})
})
app.post("/api/leave",async(req,res)=>{
  await SubgredData.findOneAndUpdate({_id:req.body.ind},{$push : {leftusers : req.body.umail}})
  await SubgredData.findOneAndUpdate({_id:req.body.ind},{$pull : {joinedusers : req.body.umail}})
})
app.listen(5000, function () {
  console.log("Server started on port 3001");
});

