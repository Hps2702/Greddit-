import axios from "axios";
import React, { useEffect,useState } from "react";

function Report(props){
  // let {id} = useParams;
  const [reports,setReports] = useState([])
  function another(e){
    e.preventDefault()
}
function handleDelete(ind,pid){
  axios
  .post('/api/delpost',{
    ind, id:props.ID , pid
  })
  .then((res)=>{
    setReports(res.data)
  })
  .catch((err)=>console.log(err))
  alert("Successfully Deleted the Post!!")
}
function handleIgnore(ind){
  axios.post('/api/ignore',{
    ind
  })
}
function handleBlock(ind,aname){
  axios
  .post('/api/blockuser',{
    id:props.ID,aname,ind
  })
  .then((res)=>{
    setReports(res.data)
  })
  .catch((err)=>console.log(err))
}
  useEffect(()=>{
  axios
  .post('/api/getreport',{
    id:props.ID
  })
  .then((res)=>{
    setReports(res.data)
  })
  .catch((err)=>console.log(err))
  },[])
return(
    <div><table class="table">
    <thead class="thead-dark">
      <tr>
     
        <th scope="col">Reported by</th>
        <th scope="col">Abuser</th>
        <th scope="col">Concern</th>
        <th scope="col">Post</th>
        <th scope="col">Block</th>
        <th scope="col">Delete</th>
        <th scope="col">Ignore</th>
      </tr>
    </thead>
    <tbody>

      {reports.map((val)=>(
        <tr>
          <td>{val.abuser}</td>
        <td>{val.user}</td>
        <td>{val.concern}</td>
        <td>{val.pdata}</td>
      {val.ignore==="true" ?  <td><i style={{color:"red"}} class="fa-sharp fa-solid fa-ban"></i></td> :  <td><i onClick={()=>{handleBlock(val.abuser,val._id);another()}} class="fa-sharp fa-solid fa-ban"></i></td>} 
       {val.ignore==="true" ? <td><i style={{color:"red"}}class="fa-solid fa-trash"></i></td> : <td><i onClick={()=>{handleDelete(val._id,val.pid);another()}}class="fa-solid fa-trash"></i></td>} 
      {val.ignore==="true" ?  <td><i style={{color:"red"}}class="fa-solid fa-wind"></i></td> :  <td><i onClick={()=>{handleIgnore(val._id);another()}} class="fa-solid fa-wind"></i></td>}
        </tr>
        
      ))}
      
       

    </tbody>
  </table></div>
)
}

export default Report