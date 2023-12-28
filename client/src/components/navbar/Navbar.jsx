import React from 'react'
import "./navbar.scss"
const Navbar = () => {
  return (
    <nav>
        <h1 className="logo">BookLogger</h1>
        <ul className="navOptions">
            <li>Home</li>
            <li>Browse</li>
            <li>Backlog</li>
            <li>Wishlist</li>
        </ul>
        <button>Log In</button>
    </nav>
  )
}

export default Navbar