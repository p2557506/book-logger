import React, { useState } from 'react'
import "./navbar.scss"
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import axios from '../../api/axios'
import { useEffect } from 'react'
const Navbar = () => {
  const {auth,setAuth} = useAuth();

  //User details
  const [userName,setUsername] = useState();

  useEffect(() => {
    const fetchProfile = async  (e) =>{
      
        try {
            const res = await axios.get("http://localhost:8800/profile")
            if(res.data.status == "logged in"){
              setAuth(true)
              setUsername(res.data.username.username)
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

  return (
    <nav>
        <h1 className="logo"><Link to={"/"}>BookLogger</Link></h1>
        <input type="text" placeholder="Search Books"/>
        <ul className="navOptions">
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/browse"}>Browse</Link></li>
            
        </ul>
        {!auth ? <Link className="logBtn" to={"/signin"}>Log In</Link> : <p>{userName}</p>}
        
    </nav>
  )
}

export default Navbar