import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import CardAll from "./CardAll"
import SettingsPage from "./Settings";

function AllSubgreddits(){
    const [greds,setGreds] = useState([])
    const [arr,setArr] = useState([])
    const [ren,setRen] = useState(true)
    const mailid = window.localStorage.getItem('mail')
    useEffect(()=>{
    axios
    .get("/api/allsubgreddits")
    .then((response)=>{
      //console.log(response.data)
    setGreds(response.data);
    })
    .catch((error) => {
        console.log(error);
      });
greds.sort((a,b)=>{
  if((a.Mail === mailid || a.joinedusers.includes(mailid)) && !(b.Mail === mailid || b.joinedusers.includes(mailid))) {
    return -1;
  }
  else if (!(a.Mail === mailid || a.joinedusers.includes(mailid)) && (b.Mail === mailid || b.joinedusers.includes(mailid))) {
    return 1;
  }
  else return 0;
})
      
  },[])
  
    function handleCreation(e){
        e.preventDefault();
        setRen(false)
        const clone = [] .concat(greds)   
      clone.sort(function(a,b){
        return ( new Date(b.createdAt) - new Date(a.createdAt))
      })
     setArr(clone)
    
    }
    function handleDesc(e){
        e.preventDefault();
        setRen(false)
        //console.log("sort desc")
        const clone = [] .concat(greds)   
        clone.sort(function(a,b){
         if(a.Name > b.Name) return -1;
         if(b.Name>a.Name) return 1;
         return 0;
     })

    setArr(clone)
    }
    function handleAsc(e){
       e.preventDefault();
       // console.log("sort asc")
          setRen(false)
       const clone = [] .concat(greds)   
       clone.sort(function(a,b){
        if(a.Name > b.Name) return 1;
        if(b.Name>a.Name) return -1;
        return 0;
    })
   
    setArr(clone)
  
    }
    function handleFollowers(e){
      e.preventDefault();
      setRen(false)
      const clone = [] .concat(greds)   
      clone.sort(function(a,b){
       if(a.People > b.People) return 1;
       if(b.People>a.People) return -1;
       return 0;
   })
  
   setArr(clone)

    }
  

    return (<div >
        <Navbar/>
        
        <div></div>
        <div style={{marginLeft:"15%",padding: "5%"}}>
        <button class="btn btn-primary btn-md" onClick={handleAsc}>Name(Ascending Order)</button>
<button style={{marginLeft: "5%"}} onClick={handleDesc}class="btn btn-primary btn-md">Name(Descending Order)</button>
<button style={{marginLeft: "5%"}} onClick={handleCreation}class="btn btn-primary btn-md">Creation Time</button>
<button style={{marginLeft: "5%"}} onClick={handleFollowers}class="btn btn-primary btn-md">Followers</button>
        </div>
  
   {
       ren && <SettingsPage/>
   }  

      < CardAll  data={arr} />

    </div>)

}

export default AllSubgreddits;
