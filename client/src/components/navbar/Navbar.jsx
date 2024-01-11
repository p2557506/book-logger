import React from 'react'
import "./navbar.scss"
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
const Navbar = () => {
  const {auth,setAuth} = useAuth();
  return (
    <nav>
        <h1 className="logo"><Link to={"/"}>BookLogger</Link></h1>
        <input type="text" placeholder="Search Books"/>
        <ul className="navOptions">
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/browse"}>Browse</Link></li>
            
        </ul>
        {!auth.username ? <Link className="logBtn" to={"/signin"}>Log In</Link> : <Link className="logBtn">Log Out</Link>}
        
    </nav>
  )
}

export default Navbar