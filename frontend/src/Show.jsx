import React,{useState} from "react";
import axios from "axios"
import Card from "./Card"
function Show(){
    const [greds,setGreds] = useState([])
axios
.post("/api/subgreddits",{
   email : window.localStorage.getItem('mail')
})
.then((response)=>{
setGreds(response.data);
})
.catch((error) => {
    console.log(error);
  });

return (<Card data={greds}/>)
}
export default Show 
