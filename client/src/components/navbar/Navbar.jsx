import React, { useState } from 'react'
import "./navbar.scss"
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import axios from '../../api/axios'
import { useEffect } from 'react'

const Navbar = () => {
  const {auth,setAuth,userId,setUserId,username,setUsername,avatarImg,setAvatarImg,searchTerm,setSearchTerm} = useAuth();
  
  axios.defaults.withCredentials = true
  //User details
  
 
  

  const location = useLocation();
  

  useEffect(() => {
    const fetchProfile = async  (e) =>{
      
        try {
            const res = await axios.get("https://book-logger-app.onrender.com/profile")
            if(res.data.status == "logged in"){
              setAuth(true)
              setUsername(res.data.username)
              setAvatarImg(res.data.avatarImg)
              setUserId(res.data.id)
            } else{
              setAuth(false)
            }
            console.log(res)
            
        } catch (err) {
            console.log(err)
        }
    }
    fetchProfile()
}, [])



const handleLogout =  async () =>{
  try {
    const res = await axios.get("https://book-logger-app.onrender.com/logout")
    console.log(res.data.status);
    window.location.reload(true);
  } catch (err) {
    console.log(err)
  }
}
console.log(avatarImg)

//Navbar Toggle
const toggleButton = document.getElementsByClassName("toggleButton")[0];
const navOptions = document.getElementsByClassName("navOptions")[0];
console.log(navOptions)



const handleActiveClick = () => {
  navOptions.classList.toggle("active");
}







  return (
    <nav className="navbar">
        <h1 className="logo"><Link to={"/"}>BookLogger</Link></h1>
        <a  href="#" className="toggleButton" onClick={handleActiveClick}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className="navOptions">
          <ul>
              <li><Link to={"/"}>Home</Link></li>
              <li><Link to={"/browse"}>Browse</Link></li>
              
          </ul>

          {!auth ? <div className="btns"><Link className="logBtn" to={"/signin"}>Log In</Link><Link className="signUpBtn" to={"/signup"}>Sign Up</Link></div> : 
          <div  className="dropdown">
            
            <img  src={`https://book-logger-app.onrender.com/images/${avatarImg}`} alt="" />
            <div className="content">
              <Link to={`/profile/${userId}`}>Profile</Link>
              <Link onClick={handleLogout}>Log Out</Link>
            </div>

              
            </div>}
        </div>
        

        
          
        
        
    </nav>
  )
  
}

export default Navbar