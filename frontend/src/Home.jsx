import React,{useState}  from "react";
import ReactDOM from "react-dom";
import './styles.css';
import Login from "./Login";
import SignUp from "./Signup";

import { BrowserRouter , Routes, Route } from 'react-router-dom';
function Home()
{
  const [isRegistered , setIsRegistered] = useState(true);
  function renderLogin(){
        setIsRegistered(true);
  }
  function renderSignUp(){
    setIsRegistered(false);
  }
   return (
   <div><div     style={{
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)',
}}>
    

   <button type="button" onClick={renderLogin} class="btn btn-primary btn-lg">Login</button>
<button style={{marginLeft:"10px"}}type="button" onClick={renderSignUp} class="btn btn-primary btn-lg">Register</button>
   {
     isRegistered&&(<Login/>)
   }
   {
     !isRegistered&&(<SignUp/>)
   }
   </div>
       <nav  className="customNav navbar navbar-light bg-light">
    <a class="navbar-brand" href="#">
      <img style={{marginLeft:"1px",marginRight:"10px"}}src="https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?width=720&auto=webp&s=be9d031a2551b47bcd40ec45feec636d42a32127" width="30" height="30" class="d-inline-block align-top" alt=""/>
       Greddiit</a>  
    
    </nav></div>) ;   

}

export default Home;