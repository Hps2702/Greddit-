import axios from "axios";
import React ,{useState} from "react";
import './styles.css' 
function SignUp(){
  // const [cnt, setCnt] = useState(true);
const [fname,setfName] = useState("")
const [lname,setlName] = useState("")
const [uname,setuName] = useState("")
const [age,setAge] = useState("")
const [phn,setPhn] = useState("")
const [mail,setMail] = useState("")
const [pwd,setPwd] = useState("")
function resetInputs(){
  setfName("")
  setlName("")
  setuName("")
  setAge("")
  setPhn("")
  setMail("")
  setPwd("")
};
// const navigate = useNavigate();
async function handleSignUp(event){
  console.log("register")
  event.preventDefault();
  const response = await fetch('/api/register',{
    method: 'POST' ,
  headers : {
    'Content-Type' : 'application/json',
  } ,
  body: JSON.stringify({
    fname,
    lname,
    uname,
    age,
    phn,
    mail,
    pwd,
    }),
  })
  resetInputs();
  const data = await response.json()
  console.log(data)
  if(data.status==="ok") {
    alert('Registered Successfully')
  }else if(data.status==="error"){
    alert('Already Registered')
  }
  // setCnt(false)
}
    return (<form method="POST">
       <div class="mb-3">
         <br/>
          <input placeholder="First Name" value={fname}onChange={(e)=>{setfName(e.target.value)}} type="text" class="form-control"  aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
          <input placeholder="Last Name" value={lname}onChange={(e)=>{setlName(e.target.value)}}type="text" class="form-control" aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
          <input placeholder="User Name" value={uname}onChange={(e)=>{setuName(e.target.value)}}type="text" class="form-control"  aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
          <input placeholder="Age" value={age} onChange={(e)=>{setAge(e.target.value)}}type="text" class="form-control"  aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
          {/* <label for="exampleInputPhone" class="form-label"></label> */}
          <input type="text" value={phn} onChange={(e)=>{setPhn(e.target.value)}}placeholder="Phone" class="form-control"  aria-describedby="emailHelp"/>
        </div>
       
        <div class="mb-3">
          {/* <label for="exampleInputEmail1" class="form-label"></label> */}
          <input type="email" value={mail} onChange={(e)=>{setMail(e.target.value)}} placeholder="Email" class="form-control"  aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
          {/* <label for="exampleInputPassword1" class="form-label"></label> */}
          <input type="password" value={pwd} onChange={(e)=>{setPwd(e.target.value)}}placeholder="Password" class="form-control" />
        </div>
        <button type="submit" onClick={handleSignUp}class="btn btn-primary">Submit</button>
      </form>);
      
}
export default SignUp;