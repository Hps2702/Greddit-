import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar"
function SavedPosts(){
    const [posts,setPosts] = useState([])
      useEffect(()=>{
          axios
          .post('/api/getsaved',
          {
            email : window.localStorage.getItem('mail')
          })
          .then((response)=>{
              setPosts(response.data)
          })
          .catch((error)=>{
              console.log(error)
          })
      },[])
function handleUnsave(ind){
    axios
    .post('/api/unsave',{
        ind , email : window.localStorage.getItem('mail')
    })
    .then((response)=>{
        setPosts(response.data)
    })
    .catch((error)=>{
        console.log(error)
    })
    alert("Unsaved Successfully!!")
}
function another(e){
    e.preventDefault()
}
      return(
          <div >
              <Navbar/>
              <div style={{padding:"5%",paddingTop:"0%"}}>
               {
       posts.map((val)=>(
<div style={{marginTop:"1%",padding:"1%"}}class="card">
  <div class="card-header">
    {/* {props.word.map(fun(val.content))} */}
    {/* {props.word.map(function(element){val.content}) */}
 {val.content}
 <p><span>Posted In {val.subgred}</span> </p>
 <p><span>Posted By {val.oname}</span></p>
<a onClick={()=>{handleUnsave(val._id);another()}}><i style={{color:"black"}}class="fa-solid fa-bookmark"></i></a>

 
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

    </div>
    </div>
    </div>
  </div>
</div>
       ))
   }

          </div>
          </div>
      )
      
}

export default SavedPosts