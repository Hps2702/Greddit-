import React,{useState}  from "react";
// import ReactDOM from "react-dom";
import { useNavigate} from "react-router-dom";
import './styles.css'
// import axios from "axios"

function Login(){

const [loginVal,setLoginVal] = useState({
  entry1: "",
  entry2: ""
});
function handleChange(event){
  const { name, value } = event.target;
 setLoginVal(prevValue=>{
   if(name==="entry1"){
     return {
       entry1: value,
       entry2: prevValue.entry2
     };
   } else if(name==="entry2"){
     return {
       entry1:prevValue.entry1,
       entry2: value
     };
   }
 });
}
const navigate = useNavigate();
async function checkforLogin(event)
{
  
  console.log(loginVal.entry1);
  console.log(loginVal.entry2);
  var check1=loginVal.entry1;
  var check2=loginVal.entry2;
  setLoginVal(prevValue=> {
    return {
            entry1: "",
            entry2: ""
    };
  });
  event.preventDefault();
  const response = await fetch('/api/',{
    method: 'POST' ,
  headers : {
    'Content-Type' : 'application/json',
  } ,
  body: JSON.stringify({
    check1,
    check2,
    }),
  })
  const data = await response.json()
 if(data.user){
   alert('Login Successful')
   window.localStorage.setItem('check',"true");
   window.localStorage.setItem('mail',check1);
  // window.location.href='/profile'
  navigate("/profile")
 }
 else {
   if(data.status==="ok") alert('Please check username and password');
   else alert('User Not Registered')
 }
  console.log(data);
 
}

    return (<form method="POST" onSubmit={checkforLogin}>
       <div class="mb-3">
         <br/>
          <input value={loginVal.entry1} name="entry1" onChange={handleChange} placeholder="Email" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
          <input name="entry2" onChange={handleChange} type="password" placeholder="Password" class="form-control" id="exampleInputPassword1"
          value={loginVal.entry2}/>
        </div>
        <button type="submit"  disabled={(!loginVal.entry1||!loginVal.entry2)} class="btn btn-primary" >Submit</button>
      </form>);
}
export default Login;