import React from 'react'; 
import './index.css';
import Profile from './Profile';
import Home from './Home'
import Subgreddits from './subgreddits'
import SingleSub from './singleSub';
import SingleSubgred from './SingleSubgred';
// import { BrowserRouter, Route } from 'react-router-dom';
import { Routes, Route, useNavigate,Navigate } from "react-router-dom";
import SavedPosts from './SavedPosts';
import MainPage from './MainPage';
import AllSubgreddits from './AllSubgreddits';
console.log("jigjiga");



function App(){
var checkLogged = window.localStorage.getItem('check');
console.log(checkLogged);
const navigate = useNavigate();



return (
      <Routes>
        {
        (checkLogged==="true") ? <>
        <Route path="/profile" element={<Profile />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/subgreddits" element={<Subgreddits />} />
        <Route path="/subgreddits/:id" element={<SingleSub />} />
        <Route path="/allsubgreddits" element ={<AllSubgreddits/>}/>
        <Route path="/allsubgreddits/:id" element ={<SingleSubgred/>}/>
        <Route path="/savedposts" element={<SavedPosts />} />
        <Route path="/" element={<Navigate to= "/profile" />} />
      </>:
      <>
        <Route path="/" element={<Home />} />
      <Route path="/mainpage" element={<Navigate to= "/" />} />
      <Route path="/subgreddits" element={<Navigate to= "/" />} />
      <Route path="/subgreddits/:id" element={<Navigate to= "/" />} />
      <Route path="/allsubgreddits" element={<Navigate to= "/" />} />
      <Route path="/allsubgreddits/:id" element={<Navigate to= "/" />} />
      <Route path="/savedposts" element={<Navigate to= "/" />} />
      <Route path="/profile" element={<Navigate to= "/" />} />
      </> } 
      
      </Routes>
    )

      }



export default App;
// return (
//   <BrowserRouter>
//   <Routes>
//     <Route path="/" element ={<Home loginHome={checkLogged}/>} />
//     <Route path="/profile" element ={<Profile/>} />
//     <Route path="/mainpage" element ={<MainPage/>} />
//   </Routes>
//   </BrowserRouter>
// );
