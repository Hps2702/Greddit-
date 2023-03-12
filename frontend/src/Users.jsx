import axios from "axios";
import Chip from '@mui/material/Chip';
import React, { useState,useEffect } from "react";
function Users(props){
   
    const [users,setUsers] = useState([])
    const [blocked,setBlocked] = useState([])
    useEffect(()=>{
        axios.post('/api/getuserrequests',{
            ind : props.ID
        })
        .then((response)=>{
       setUsers(response.data.joinedusers)
       setBlocked(response.data.blockedusers)
        })
    },[])

    return(
   
    // <h1>hiii</h1>
    <div style={{padding:"1%"}}>
         <span>You </span> 
         <span><Chip label={"Moderator"}/></span>
    {users.map((val)=>(
        <div>
            <br/>
            {/* <h1>hii</h1> */}
              <span>{val}</span> <span>
                  {blocked.includes(val) ? <Chip label={"Blocked"} color="secondary"/> : <Chip label={"Not Blocked"} color="primary"/> }
                  </span> </div>
       
    
     ))}
    </div>
  
  
    )

}

export default Users