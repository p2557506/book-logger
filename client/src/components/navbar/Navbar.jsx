import React from 'react'
import "./navbar.scss"
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav>
        <h1 className="logo"><Link to={"/"}>BookLogger</Link></h1>
        <input type="text" placeholder="Search Books"/>
        <ul className="navOptions">
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/browse"}>Browse</Link></li>
            
        </ul>
        <button className="logBtn">Log In</button>
    </nav>
  )
}

export default Navbar