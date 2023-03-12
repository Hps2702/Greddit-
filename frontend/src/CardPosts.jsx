import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function CardPosts(props){

   const me = window.localStorage.getItem('mail')
   const [comment,setComment] = useState("")
   const [posts,setPosts] = useState([])
 
  const [concern,setConcern] = useState("")
  const [uname,setUname] = useState("")
  const [pdata,setPdata] = useState("")
  const [gred,setGred] = useState([])
let {id} = useParams();

   useEffect(()=>{
    console.log(id)
    axios
    .post("/api/getposts",{
       id 
    })
    .then((response)=>{
    setPosts(response.data);
    })
    .catch((error) => {
        console.log(error);
      });
      
  axios
  .post("/api/details",{
      id
  })
  .then((response)=>{
  setGred(response.data);
  })
  .catch((error) => {
      console.log(error);
    });
  },[])

function handleAddComment(uid){
    //console.log("add comment")
    let newword = comment
    for(let index=0; index < gred.bannedwords.length;index++){
      let changeword = newword.replace(gred.bannedwords[index],"***")
     newword= changeword
    }

//console.log("here")
axios.post('/api/editpost',{
     comment:newword, uid ,sid : id
})
.then((res)=>{
setPosts(res.data)
setComment(" ");
})
.catch((err)=>{
    console.log(err)
    setComment(" ");
})


}

function handleUpvote(num1,num2,uid,arr1,arr2){

  const mailid = window.localStorage.getItem('mail')
  if(arr1.includes(mailid)){
    alert("Already Upvoted!!")
  }
  else {
  arr1.push(mailid)
   axios
   .post('/api/editvote',{
   uid ,sid : id ,arr1,arr2
   })
   .then((res)=>{
    setPosts(res.data)
   
    })
    .catch((err)=>{
        console.log(err)
       
    })
  }
}
function handleDownvote(num1,num2,uid,arr1,arr2){
const mailid = window.localStorage.getItem('mail')
  if(arr2.includes(mailid)) {
    alert("Already downvoted!!")
  }
  else {
    arr2.push(mailid)
   axios
   .post('/api/editvote',{
  uid,sid:id , arr1 , arr2
   })
   .then((res)=>{
    setPosts(res.data)
   
    })
    .catch((err)=>{
        console.log(err)
       
    })
  }
}
async function handleReport(pid){
  console.log(uname)
  const abuser = window.localStorage.getItem('mail')
    await axios
      .post('/api/makereport',{
        concern , sid : id , pid , user:uname , abuser , pdata
      })
setUname("")
      
}
function another(e){
    e.preventDefault()
}
async function handleSave(ind,oname){

  const sub = gred.Name
  const res = await fetch('/api/savepost',{
    method: 'POST' ,
    headers : {
      'Content-Type' : 'application/json',
    } ,
    body: JSON.stringify({
      ind , sname : window.localStorage.getItem('mail') , sub , oname
      }),
  })

  const data = await res.json()
  if(data.status==="error") {alert("Already Saved")}
  else alert("Post Saved Successfully")
}
async function handleFollow(who,me){

const res = await fetch('/api/addfollowers',{
  method: 'POST' ,
  headers : {
    'Content-Type' : 'application/json',
  } ,
  body: JSON.stringify({
   who,
   me,
    }),
})
const data = await res.json()
if(data.status==="ok") {alert("Started Following")}
else {alert("Already Following")}

}
    return (<div style={{padding:"5%",paddingTop:"0%"}}>
   {
       posts.map((val)=>(
<div style={{marginTop:"1%",padding:"1%"}}class="card">
  <div class="card-header">
 {val.content}

  <a style={{margin:"2%"}} onClick={()=>{handleUpvote(val.upvote,val.downvote,val._id,val.uparr,val.downarr);another()}}> <i class="fa-solid fa-arrow-up"></i>{val.uparr.length}</a>
 <a style={{margin:"2%"}} onClick={()=>{handleDownvote(val.upvote,val.downvote,val._id,val.uparr,val.downarr);another()}}><i class="fa-solid fa-arrow-down"></i>{val.downarr.length}</a> 
<a style={{margin:"2%"}}><i onClick={()=>{handleSave(val._id,val.uname);another()}}class="fa-solid fa-bookmark"></i></a>
{ val.uname === me ? null : <span><a style={{margin:"2%"}} onClick ={()=>{setUname(val.uname);setPdata(val.content)}}data-bs-toggle="modal" data-bs-target={"#exampleModal" + val._id} ><i class="fa-sharp fa-solid fa-circle-exclamation"></i></a>
<a style={{margin:"2%"}}><i onClick={()=>{handleFollow(val.uname,me);another()}}class="fa-solid fa-plus"></i></a></span> } 

{ val.uname === gred.Mail ? <p>Posted by Moderator</p>  : null }
    
    {gred.blockedusers && gred.blockedusers.includes(val.uname) ? <p>Posted by Blocked User</p>: null} 
    {!(val.uname === gred.Mail || gred.blockedusers && gred.blockedusers.includes(val.uname)) ? <p>Posted by {val.uname}</p> : null}
 
  </div>
  <div class="modal fade" id={"exampleModal"+val._id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Report</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form>
  <div class="mb-3">
    <label  class="form-label">Concern</label>
    <input type="text" onChange={(e)=>{setConcern(e.target.value)}}class="form-control"/>
  </div>
  <button type="submit" onClick={()=>{handleReport(val._id);another()}} class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Submit</button>
</form>
      </div>
    </div>
  </div>
</div>
  <div class="card-body">
  <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id={"flush-headingOne"+val._id}>
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapseOne"+val._id} aria-expanded="false" aria-controls="flush-collapseOne">
        Comments ({val.comments.length}) 
      </button>
    </h2>
    <div id={"flush-collapseOne"+val._id} class="accordion-collapse collapse" aria-labelledby={"flush-headingOne"+val._id}data-bs-parent="#accordionFlushExample">
{val.comments.map((a)=>(
    <div class="accordion-item card-body">{a}</div>
))}
    <div class="row">
    <div class="col-sm-8">
    <form style={{padding:"1%",marginTop:"1%"}}>
      <div class="form-group">
        <input onChange={(e)=>{setComment(e.target.value);}} value={comment} type="text" class="form-control"  />
      </div>
    </form>
  </div>
  <div style={{padding:"1%",marginTop:"0%"}} class="col-sm-4">
      <button  onClick={()=>{handleAddComment(val._id);another()}} class="btn btn-dark" type="button">Add a Comment</button></div>
</div>
    </div>
    </div>
    </div>
  </div>
</div>
       ))
   }

    </div>)
}
export default CardPosts
