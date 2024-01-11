import React from 'react'
import "./loginRequest.scss"
import { Link } from 'react-router-dom'
const LoginRequest = () => {
  return (
    <div className="con">
        <div className="requestContainer">
            <h1>You need to login</h1>
            <p>Loading this section requires you to login</p>
            <Link to={"/signin"}>Login</Link>
        </div>
    </div>
  )
}

export default LoginRequest