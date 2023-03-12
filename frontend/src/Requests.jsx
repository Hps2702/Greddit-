import axios from "axios";
import React, { useState,useEffect } from "react";
function Requests(props){
    const [reqs,setReqs] = useState([])
    const [users,setUsers] = useState([])
    function another(e) {
      e.preventDefault();
    }
    function handleAddUser(val){
 //console.log("adding")
    const userdata = [...users]
    userdata.push(val)
    axios.post('/api/acceptrequests',{
      ind : props.ID , userdata , val
    })
    .then((response)=>{
      setReqs(response.data.joinrequests)
      setUsers(response.data.joinedusers)
    })
    .catch((err)=>{
      console.log(err)
    })
window.location.reload()
    }
    function handleRejectUser(val){
     
     // userdata.push(val)
     console.log(val)
     console.log("reject")
     console.log(reqs)
     const arr = [...reqs]
 const arr1= arr.filter(element => element !== val)
     console.log(arr1)
      axios.post('/api/rejectrequests',{
        ind : props.ID , arr1
      })
      .then((response)=>{
        setReqs(response.data.joinrequests)
        setUsers(response.data.joinedusers)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    useEffect(()=>{
        axios.post('/api/getuserrequests',{
            ind : props.ID
        })
        .then((response)=>{
       setReqs(response.data.joinrequests)
       setUsers(response.data.joinedusers)
        })
        .catch((err)=>{
          console.log(err)
        })
    },[])

    return(
   
    // <h1>hiii</h1>
    <div style={{padding:"1%"}}>
         
    { reqs.map((val)=>(
        <div>
            <br/>
              <span>{val}</span> 
            
         
          <button style={{marginLeft:"1%"}} onClick={()=>{handleAddUser(val);another()}}class="btn btn-dark">✓</button>
          <button style={{marginLeft:"1%"}} onClick={()=>{handleRejectUser(val);another()}}class="btn btn-dark">X</button>
              {/* <i class="fa-sharp fa-solid fa-xmark"></i> */}
        </div>
       
    
     ))}
    </div>
  
  
    )

}

export default Requests