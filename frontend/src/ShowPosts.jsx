import React,{useEffect, useState} from "react";
import axios from "axios"
import CardPosts from "./CardPosts";

function ShowPosts(props){
    const [posts,setPosts] = useState([])
    useEffect(()=>{
      axios
      .post("/api/getposts",{
         id : props.ID
      })
      .then((response)=>{
      setPosts(response.data);
      //console.log("showposts")
      //console.log(posts)
      })
      .catch((error) => {
          console.log(error);
        });
        
      
    },[])

return (<CardPosts data={posts}/>)
}
export default ShowPosts 
