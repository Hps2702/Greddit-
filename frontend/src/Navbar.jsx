import React from "react";
import { useNavigate } from "react-router-dom";
function Navbar(props)
{
    const navigate = useNavigate();
function handleLogout()
{
  console.log("loggedout");
  window.localStorage.setItem('check',"false");
  navigate("/");
}
function handleProfile()
{
  navigate("/profile");
}
function handleIconClick()
{
  navigate("/mainpage");
}
    return(
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  {/* <a class="navbar-brand" href="#">Navbar</a> */}
  <a class="navbar-brand pointer-link" onClick={handleIconClick}>
   <img style={{marginLeft:"1px",marginRight:"10px"}}src="https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?width=720&auto=webp&s=be9d031a2551b47bcd40ec45feec636d42a32127" width="30" height="30" class="d-inline-block align-top" alt=""/>
   Greddiit</a>

  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" onClick = {()=>navigate("/subgreddits")}>My SubGreddits <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" onClick = {()=>navigate("/allsubgreddits")} >All SubGreddits <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" onClick = {()=>navigate("/savedposts")} ><i style={{color:"black"}}class="fa-solid fa-bookmark"></i>Saved Posts<span class="sr-only">(current)</span></a>
      </li>
      {/* <form class="form-inline my-2 my-lg-0 d-flex">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
    </form> */}
    <div>
    <li  class="nav-item dropdown">
        <a  class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
{props.name}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" onClick={handleProfile} >Profile</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" onClick={handleLogout}><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
        </div>
      </li>
    </div>
    
    </ul>
   
  </div>
</nav>

    )

}
export default Navbar;
