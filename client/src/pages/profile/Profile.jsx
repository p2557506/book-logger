import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'

const Profile = () => {

    

    const {auth,setAuth,userId,setUserId,username,setUsername} = useAuth();

    const [profile, setProfile] = useState({
        username: "",
        avatarImg:""
        
    })

    const handleChange = (e) =>{
        setProfile((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleUpdate = async () => {
        try {
            const res = await axios.put("http://localhost:8800/profile/" + userId,profile)
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }
    //Replace placeholder with current user proile name
  return (
    <div>
        <div className="navbar">
            <Navbar/>
        </div>
        <h1>Edit Your Profile</h1>
        <div className="userBox">
            <label>Username</label>
            <input 
            type="text" 
            placeholder={username} 
            onChange={handleChange}
            name="username"/>

        </div>
        <div className="avatarBox">

            <label>Avatar</label>
            <input 
            type="file" 
            placeholder="username" 
            onChange={handleChange}
            name="avatarImg"/>
        </div>

        <button onClick={handleUpdate}>Update Profile</button>



    </div>
  )
}

export default Profile