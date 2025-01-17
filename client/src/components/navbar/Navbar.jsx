import React, { useState } from 'react'
import "./navbar.scss"
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import axios from '../../api/axios'
import { useEffect } from 'react'

const Navbar = () => {
  const {auth,setAuth,userId,setUserId,username,setUsername,avatarImg,searchTerm,setSearchTerm} = useAuth();
  
  axios.defaults.withCredentials = true
  //User details
  
  const[user, setUser] = useState([])
 
  

  const location = useLocation();
  

  useEffect(() => {
    const fetchProfile = async  (e) =>{
      
        try {
            const res = await axios.get("http://localhost:8800/profile")
            if(res.data.status == "logged in"){
              setUser(res.data)
              setAuth(true)
              setUsername(res.data.username)
            
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
    const res = await axios.get("http://localhost:8800/logout")
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
              <li><Link to={"/browse"}>Books</Link></li>
              
          </ul>

          
          <div className="btns">
          {!auth && location.pathname === '/' && (
            <Link className="logBtn" to="/signin">Log In</Link>
          )}

          {!auth && location.pathname !== '/' && (
            <>
              {location.pathname !== '/signin' && (
                <Link className="logBtn" to="/signin">Log In</Link>
              )}
              {location.pathname !== '/signup' && (
                <Link className="signUpBtn" to="/signup">Sign Up</Link>
              )}
            </>
          )}

            {auth && (
            <div  className="dropdown">
            
              <img  src={`http://localhost:8800/images/${avatarImg}`} alt="" />
              <div className="content">
                <Link to={`/profile/${userId}`}>Profile</Link>
                <Link onClick={handleLogout}>Log Out</Link>
              </div>

              
            </div>
          )}
        </div>  
        </div>
    </nav>
  );
  
};

export default Navbar