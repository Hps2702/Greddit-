import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chip from '@mui/material/Chip';
import axios from "axios";
function CardAll(props){
  // const [butn,setBtn] = useState(false)
    // console.log(props)
    const [req,setReq] = useState([])
   
    const umail = window.localStorage.getItem('mail')
    function handleJoin(ind,arr,arr1){
     //console.log(props.data)
      if(arr1 && arr1.includes(umail)) {
        alert("Already left the Greddit!!")
      }
      else {
arr.push(umail)
setReq(arr);
      axios.post('/api/userrequest',{
        ind , arr
      })
    .then((res)=>{
      if(res.status==="ok") alert("Already sent ")
      else alert("User Request Sent")
    })
    .catch ((err)=>{
      console.log(err)
  });
setReq([])
alert("Join Request Sent")
      }
    }
    function handleLeave(ind){
            axios
            .post ('/api/leave',{
              ind , umail
            })
            alert("Left the greddit")
    }
    function mapped(gred){
 //console.log(gred)
     return (
<div class="col">
<div class="card"> 
<img src="https://wallpapercave.com/wp/wp2599594.jpg" class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{gred.Name}</h5>
    <p class="card-text">{gred.Description}</p>
    <i class="fa-solid fa-users">{gred.joinedusers.length + 1}</i>
    <i style={{marginLeft:"1%"}}class="fa-solid fa-image">{gred.Posts}</i>
    <i style={{marginLeft:"1%"}}class="fa-regular fa-clock"></i>{gred.createdAt}
    <div style={{marginBottom:"3%"}} class="col">
      <span style={{marginRight:"0.5%"}}>Tags : </span>
    {
 gred.tags.map((val)=>(
  <Chip label={val} variant="outlined" />
 ))
}

    </div>
    <div style={{marginBottom:"3%"}} class="col">
      <span style={{marginRight:"0.5%"}}>Banned Keywords : </span>
    {
 gred.bannedwords.map((val)=>(
  <Chip label={val} variant="outlined" />
 ))
}

    </div>
 
   {(gred.Mail===umail ) ? <div>
 <button style={{marginRight:"1%"}}class="btn btn-primary">  <i  onClick={()=>{handleGreddit(gred._id);another()}} class=" pointer-link fa-solid fa-arrow-up-right-from-square"></i>
 </button> <button class="btn btn-secondary" disabled >Leave</button></div> : null }   

{(gred.joinedusers.includes(umail) && (gred.Mail!== umail) )  ? <div><button style={{marginRight:"1%"}}class="btn btn-primary">  <i  onClick={()=>{handleGreddit(gred._id);another()}} class=" pointer-link fa-solid fa-arrow-up-right-from-square"></i>
 </button>
 <button onClick={()=>{handleLeave(gred._id);another()}}class="btn btn-danger">Leave</button></div>  : null}
 {
     (!(gred.joinedusers.includes(umail)) && (gred.Mail!== umail) )  ? <div><button style={{marginRight:"1%"}} class="btn btn-dark" onClick={()=>{handleJoin(gred.Name,gred.joinrequests,gred.leftusers);another()}}>Join</button>
     </div>  : null
 }
{/* */}
</div>
</div>
</div>

      )
    }
    const navigate = useNavigate();
    function another(e){
    e.preventDefault()
    }
      function handleGreddit(ind){
     navigate(`/allsubgreddits/${ind}`)
      }
      const arr1 =[]
      const arr2 = []
      const arr3 = []
 {props.data.map((val)=>{
if(val.Mail===umail) arr1.push(val)
else if(val.joinedusers.includes(umail)) arr2.push(val)
else arr3.push(val)
 })}
 return (
  <div style={{padding:"5%"}}>
   <div class="row row-cols-1 row-cols-md-3 g-4">
   {
    arr1.map(mapped)
  }
  {
    arr2.map(mapped)
  }
    {
    arr3.map(mapped)
  }
  </div>
  </div>
 )
}

export default CardAll;