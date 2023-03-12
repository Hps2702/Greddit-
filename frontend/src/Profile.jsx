import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./styles.css";
import Modal from "./modal";
import axios from "axios";
function Profile() {
  
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [uname, setUname] = useState("");
  const [age, setAge] = useState("");
  const [phn, setPhn] = useState("");
  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");
  const [followers ,setFollowers] = useState([])
  const [following,setFollowing] = useState([])
  function resetInputs() {
    setFname("");
    setLname("");
    setUname("");
    setAge("");
    setPhn("");
    setMail("");
    setPwd("");
  }
//  console.log("jjjjjjjjlll")
 // console.log( window.localStorage.getItem('mail'))
useEffect(()=>{ axios
  .post('/api/profile/getData',{
    email : window.localStorage.getItem('mail')
  })
  .then((response)=>{
   
    setFname(response.data.fname)
    setLname(response.data.lname)
    setUname(response.data.uname)
    setPhn(response.data.phn)
    setAge(response.data.age)
    setMail(response.data.email)
    setPwd(response.data.password)
    setFollowers(response.data.followers)
    setFollowing(response.data.following)
    // console.log(response.data.followers)
    //console.log("lului")
    //console.log(followers)
  })

  .catch((error) => {
    console.log(error);
  });},[])
 
  async function handleEdit(e) {
    console.log(fname,lname,uname,phn,age,mail,pwd)
    console.log("edit me")
    e.preventDefault();
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        lname,
        uname,
        age,
        phn,
        mail,
        pwd,
      }),
    });
    //resetInputs();
  }
  return (
    <div>
      <Navbar name={uname} />
      <br />
      <br />
      <br />
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <form class="form-floating" >
              <div class="form-row">
                <div>
                  <label>First name</label>
                  <input
                     defaultValue = {fname}
                    onChange={(e) => {
                      setFname(e.target.value);
                    }}
                    type="text"
                    class="form-control"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label >Last name</label>
                  <input
                
                   defaultValue={lname}
                    onChange={(e) => {
                      setLname(e.target.value);
                    }}
                    type="text"
                    class="form-control"
                    placeholder="Last name"
                  />
                </div>
                <div>
                  <label for="validationDefaultUsername">Username</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroupPrepend2">
                        @
                      </span>
                    </div>
                    <input
                      onChange={(e) => {
                        setUname(e.target.value);
                      }}
                      defaultValue={uname}
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend2"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div>
                  <label>Email</label>
                  <input
                    onChange={(e) => {
                      setMail(e.target.value);
                    }}
                    defaultValue={mail}
                    type="email"
                    class="form-control"
                    placeholder="email"
                    required
                  />
                </div>
                <div>
                  <label>Age</label>
                  <input
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    defaultValue={age}
                    type="text"
                    class="form-control"
                    placeholder="age"
                    required
                  />
                </div>
                <div>
                  <label>Contact</label>
                  <input
                    onChange={(e) => {
                      setPhn(e.target.value);
                    }}
                    defaultValue={phn}
                    type="text"
                    class="form-control"
                    placeholder="contact"
                    required
                  />
                </div>
                {/* <div>
                  <label >Password</label>
                  <input
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    defaultValue={pwd}
                    required
                  />
                </div> */}
              </div>
              <br/>
              <button type="submit" onClick={handleEdit} class="btn btn-outline-secondary">Edit</button>
              {/* <button type="submit" onClick={handleEdit} class="btn btn-outline-secondary">Save Changes</button> */}
            </form>
          </div>
          <div
            class="col-sm-12 col-md-6 col-lg-6 profile-card"
            style={{ paddingRight: "7%" }}
          >
            <br />
            <div class="card" style={{ height: "60%", width: "70%" }}>
              <img
                style={{ position: "relative", width: "100%", height: "60%" }}
                src="https://tse4.mm.bing.net/th?id=OIP.a23OolVvCXDfu0vIti2fHwHaHa&pid=Api&P=0"
                class="card-img-top"
                alt="profileImg"
              />
              <div class="card-body">
                <Modal data={followers} findWhat={"Followers"} />
                <Modal data={following} findWhat={"Following"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
