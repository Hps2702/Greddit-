import axios from "axios";
import React from "react";
function Delete(props){
    function another(e){
        e.preventDefault()
        }
async function handleDelete(ind){
    
    console.log("got clicked")
    axios.
    post('/api/delete',{
        ind,
    })
    .then((res)=>{
        console.log("received");
      window.location.reload();
    })
    .catch ((err)=>{
        console.log(err)
    });

}

    return (  
   
    <button onClick={(e)=>{handleDelete(props.ind);another(e)}} class="btn btn-danger" >Delete</button> )

}

export default Delete;