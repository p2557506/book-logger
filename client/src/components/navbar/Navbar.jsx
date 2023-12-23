import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <div className="logo">BookLogger</div>
        <ul className="navOptions">
            <li>Home</li>
            <li>Browse</li>
            <li>Backlog</li>
            <li>Wishlist</li>
        </ul>
    </nav>
  )
}

export default Navbar