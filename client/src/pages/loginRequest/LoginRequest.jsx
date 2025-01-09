import React from 'react'
import "./loginRequest.scss"
import { Link } from 'react-router-dom'

import FilteringSideBar from '../../components/filteringSideBar/FilteringSideBar'
const LoginRequest = () => {

  const options = ["Archive","Backlog","Wishlist"]


  const handleChange = (e) =>{
    

}



  return (
    <div className="con">
        <div className="pageContent">
          <div className="requestContainer">
            <h1>You need to login</h1>
            <p>Loading this section requires you to login through BookLogger</p>
            <Link to={"/signin"}>Login</Link>

          </div>
          <FilteringSideBar handleChange ={handleChange}/>
        </div>
    </div>
  )
}

export default LoginRequest