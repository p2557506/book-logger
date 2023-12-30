import React from 'react'
import "./navbar.scss"
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav>
        <h1 className="logo">BookLogger</h1>
        <input type="text" placeholder="Search Books"/>
        <ul className="navOptions">
            <li>Home</li>
            <li><Link to={"/browse"}>Browse</Link></li>
            <li>Backlog</li>
            <li>Wishlist</li>
        </ul>
        <button className="logBtn">Log In</button>
    </nav>
  )
}

export default Navbar