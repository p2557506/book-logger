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

useEffect(()=>{
  const fetchAllBacklog = async  () =>{
      try {
          const res = await axios.get("http://localhost:8800/backlogOrders/" + userId)
          console.log(res.data)
          setBacklog(res.data)
      } catch (err) {
          console.log(err)
      }
  }
  fetchAllBacklog()
},[])

let hasThisBook = backlogs.some( backlog => backlog['book_id'] == bookId);

    console.log(hasThisBook)

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
        {!auth ? <Link className="logBtn" to={"/signin"}>Log In</Link> : <div><p>{userName}{userId}</p><Link onClick={handleLogout}>Log Out</Link></div>}
        
    </nav>
  )
}

export default Navbar