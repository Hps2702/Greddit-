import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Delete from "./Delete";
import Chip from '@mui/material/Chip';

function Card(props){
  
    function mapped(gred){

     return (
<div class="col">
<div class="card"> 
<img src="https://wallpapercave.com/wp/wp2599594.jpg" class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{gred.Name}</h5>
    <p class="card-text">{gred.Description}</p>
    <i class="fa-solid fa-users">{gred.joinedusers.length + 1}</i>
    <i style={{marginLeft:"1%"}}class="fa-solid fa-image">{gred.Posts}</i>
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
 
   { <div>
 <button style={{marginRight:"1%"}}class="btn btn-secondary">  <i  onClick={()=>{handleGreddit(gred._id);another()}} class=" pointer-link fa-solid fa-arrow-up-right-from-square"></i>
 </button> <Delete ind={gred._id}/></div>  }   </div>
</div>

</div>

      )
    }
    const navigate = useNavigate();
    function another(e){
    e.preventDefault()
    }
      function handleGreddit(ind){
     navigate(`/subgreddits/${ind}`)
      }
return (<div style={{padding:"5%"}}>
<div class="row row-cols-1 row-cols-md-3 g-4">
{props.data.map(mapped)
}
</div>
</div>)
}

export default Card;