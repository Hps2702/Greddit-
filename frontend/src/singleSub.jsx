import React,{useState} from "react"
import { useParams } from "react-router-dom";
import axios from "axios"
import Navbar from "./Navbar"
import Requests from "./Requests";
import Users from "./Users"
import Report from "./Report";
function SingleSub(){
   // const [name,setName] = useState()
    let {id} = useParams();

return (<div>
    <Navbar/>
    <br/>
    <br/>
    <ul style={{position:"relative",marginTop:"-2.86%",backgroundColor:"grey",paddingLeft:"25%"}}class="nav nav-tabs" id="myTab" role="tablist">
           <span>
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Users</button>
  </span>
  <span>
     <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Joining Requests</button>
  </span>
   <span>
    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Reports</button>
  </span>
  <span>
    <button class="nav-link" id="nnn-tab" data-bs-toggle="tab" data-bs-target="#nnn" type="button" role="tab" aria-controls="nnn" aria-selected="false">Stats</button>
  </span>
     

</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"><Users ID={id}/></div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"><Requests ID={id}/></div>
  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"><Report ID={id}/></div>
  <div class="tab-pane fade" id="nnn" role="tabpanel" aria-labelledby="nnn-tab"></div>
</div>
   
</div>)
}
export default SingleSub;