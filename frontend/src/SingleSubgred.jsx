import React,{useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import Navbar from "./Navbar";
import "./styles.css"
import CardPosts from "./CardPosts";
function SingleSubgred(){
    let {id} = useParams();
    const [content,setContent] = useState("")
    const [gred,setGred] = useState([])
const [posts,setPosts] = useState([])
useEffect(()=>{
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
    async function handleAddPost(e){
      let newword = content
    for(let index=0; index < gred.bannedwords.length;index++){
      let changeword = newword.replace(gred.bannedwords[index],"***")
     newword= changeword
    }
 
e.preventDefault()
await axios
.post('/api/newpost',{
    content :newword,
uname : window.localStorage.getItem('mail'),
id,
num: gred.Posts,
})
.then((res)=>{
    setPosts(res.data)
})
.catch((error) => {
    console.log(error);
  });
  window.location.reload()
    }

    return(<div>
        <Navbar/>
        <table><tr><td> <span> <img style={{borderRadius:"1%",paddingTop:"5%",paddingBottm:"2%",paddingLeft:"5%",height:"5%",width:"29%"}} alt="aot" src="https://wallpapercave.com/wp/wp2123907.png"/>
  </span> </td>
  <td> <span style={{right:"30%",position:"absolute"}}>
    <h1>{gred.Name}</h1>
    <p>{gred.Description}</p>
  </span></td></tr></table>
 
 

<div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModal1Label" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModal1Label">Create a New Post</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form  method="POST" >
  <div class="mb-3">
    <label  class="form-label">Content</label>
    <input type="text" onChange={(e)=>{setContent(e.target.value)}}class="form-control"/>
  </div>
  <button type="submit" onClick={handleAddPost} class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Submit</button>
</form>
      </div>
    </div>
  </div>
</div>
 
<CardPosts  ID={id} />
<button style={{marginLeft:"50%",marginTop:"3%",right:"50%"}}type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">
+
</button>


    </div>)
}
export default SingleSubgred