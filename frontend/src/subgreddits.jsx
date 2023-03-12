import React, { useState } from "react";
// import axios from "axios"
import Navbar from "./Navbar";
import Show from "./Show";
function Subgreddits(){
  const [name,setName] = useState("")
  const [desc,setDesc] = useState("")
  const [tag,setTag] = useState("")
  const [banned,setBanned] = useState("")
  const [allwords,setAllwords] = useState([])
  const [alltags,setAlltags] = useState([])
  function handleTag(e){
      e.preventDefault()
      const tags = [...alltags]
      tags.push(tag)
      setAlltags(tags)
      setTag("")
  }
  function handleKey(e){
    e.preventDefault()
    const words= [...allwords]
    words.push(banned)
    setAllwords(words)
    setBanned("")

  }
async function handleAddData(e){
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes();
  const mail = window.localStorage.getItem('mail')
  console.log("added a greddit")
  e.preventDefault();
  const response = await fetch('/api/newdata',{
    method: 'POST' ,
  headers : {
    'Content-Type' : 'application/json',
  } ,
  body: JSON.stringify({
        mail,
        name,
        desc,
        time,
        alltags,
        allwords,
    }),
  })
 
setAlltags([])
}
return(
    <div>
<Navbar/>
 <Show/>
 <button style={{marginLeft:"50%",marginTop:"6%",right:"50%"}}type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
+
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Create a New Subgreddiit</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form  method="POST" >
  <div class="mb-3">
    <label  class="form-label">Name</label>
    <input type="text" onChange={(e)=>{setName(e.target.value)}}class="form-control"/>
  </div>
  <div class="mb-3">
    <label  class="form-label">Description</label>
    <input type="text" onChange={(e)=>{setDesc(e.target.value)}}class="form-control" />
  </div>
  <div class="mb-3">
    <label  class="form-label">Tags</label>
    <input type="text" onChange={(e)=>{setTag(e.target.value)}} value={tag} class="form-control" />
    <button class="btn" onClick={handleTag}>+</button>
  </div>
  <div class="mb-3">
    <label  class="form-label">Banned Keywords</label>
    <input type="text" onChange={(e)=>{setBanned(e.target.value)}} value={banned} class="form-control" />
    <button class="btn" onClick={handleKey}>+</button>
  </div>

  <div class="input-group mb-3">
  <input type="file" class="form-control" id="inputGroupFile02"/>
</div>
  <button type="submit" onClick={handleAddData} class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Submit</button>
</form>
      </div>
    </div>
  </div>
</div>
</div>

)
}
export default Subgreddits;