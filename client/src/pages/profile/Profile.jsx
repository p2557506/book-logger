import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'

import "./profile.scss"
import Footer from '../../components/footer/Footer'

const Profile = () => {

    

    const {auth,setAuth,userId,setUserId,username,setUsername,avatarImg,setAvatarImg} = useAuth();

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
        <div className="profilePage">

        <h1>Edit Your Profile</h1>
        <div className="profileEditBox">

            <div className="userBox">
                <label>Username</label>
                <input 
                type="text" 
                placeholder={username} 
                onChange={handleChange}
                name="username"/>

            </div>
                <label for="fileUpload">Avatar</label>
            <div className="avatarBox">

                <img src={avatarImg} alt="" />
                <input 
                id="fileUpload"
                type="file" 
                
                onChange={handleChange}
                name="avatarImg"/>
            </div>

        </div>
            <button onClick={handleUpdate}>Update Profile</button>
        </div>

        <div className="footer">
            <Footer/>
        </div>



    </div>
  )
}

export default Profile