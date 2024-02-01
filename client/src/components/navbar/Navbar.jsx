import React, { useState } from 'react'
import "./navbar.scss"
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import axios from '../../api/axios'
import { useEffect } from 'react'

const Navbar = () => {
  const {auth,setAuth,userId,setUserId,backlogs,setBacklog,bookId} = useAuth();
  
  axios.defaults.withCredentials = true
  //User details
  const [userName,setUsername] = useState();
  const [id,setId] = useState();
  

  const location = useLocation();
  const route = location.pathname.split("/")[1];

  useEffect(() => {
    const fetchProfile = async  (e) =>{
      
        try {
            const res = await axios.get("http://localhost:8800/profile")
            if(res.data.status == "logged in"){
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

  return (
    <nav>
        <h1 className="logo"><Link to={"/"}>BookLogger</Link></h1>
        <input type="text" placeholder="Search Books"/>
        <ul className="navOptions">
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/browse"}>Browse</Link></li>
            
        </ul>
        
          {!auth ? <div className="btns"><Link className="logBtn" to={"/signin"}>Log In</Link><Link className="signUpBtn" to={"/signup"}>Sign Up</Link></div> : 
          <div  className="dropdown">
            <button className="userBtn">{userName}</button>
            <div className="content">
              
              <Link onClick={handleLogout}>Log Out</Link></div>
              
            </div>}
          
        
    </nav>
  )
}

export default Navbar