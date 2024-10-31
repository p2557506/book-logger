import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'

import "./profile.scss"
import Footer from '../../components/footer/Footer'

const Profile = () => {

    axios.defaults.withCredentials = true;
    

    const {auth,setAuth,userId,setUserId,username,setUsername,avatarImg,setAvatarImg} = useAuth();

    const [profile, setProfile] = useState({
        username: "",
        
        
    })

    const [file,setFile] = useState();

    const [name,setName] = useState("");

    const handleNameChange = (e) =>{
        setName(e.target.value)
    }

    const handleFile = (e) =>{
        console.log(e.target.files[0])
        setFile(e.target.files[0])
        
    }

    //When upload button is clicked get new profile details

    const handleUploadImage = () =>{
        
        const formdata = new FormData();
        formdata.append("image", file)
        axios.post("https://book-logger-app.onrender.com/upload/" + userId, formdata)
        .then(res => {
            if(res.data.Status == "win"){
                console.log("success") 
                
                window.location.reload()

            } else {
                console.log(res)
            }
        })
        .catch(err => console.log(err))
    }
    //Set username, set avatar image and send

    useEffect(() => {
        const fetchUserProfile = async  (e) =>{
          
            try {
                const res = await axios.get("https://book-logger-app.onrender.com/profile")
                if(res.data.status == "logged in"){
                  setAuth(true)
                  setUsername(res.data.username)
                  console.log(res.data.avatarImg)
                  setAvatarImg(res.data.avatarImg)
                  
                } else{
                  setAuth(false)
                }
                console.log(res)
                
            } catch (err) {
                console.log(err)
            }
        }
        fetchUserProfile()
    }, [])

    const handleChange = (e) =>{
        setProfile((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    


    

    const handleUpdateUser = async () => {
        
        try {
            const res = await axios.put("https://book-logger-app.onrender.com/profile/" + userId,profile)
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }



    /* let loadFile = function(event) {
        let image = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
        setAvatarImg(image.src);
        console.log(image.src)
        setProfile((prev) => ({...prev, [event.target.name]: event.target.value}));

    }; */
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
                <button onClick={handleUpdateUser}>Update Profile</button>

            </div>
                <label for="fileUpload">Avatar</label>
            <div className="avatarBox">

                <img alt="" src={`https://book-logger-app.onrender.com/images/${avatarImg}`}/>
                <input 
                id="fileUpload"
                type="file"
                accept="image/png, image/jpeg" 
                
                onChange={handleFile}
                name="avatarImg"/>
            <button onClick={handleUploadImage}>Update Avatar</button>
            </div>

        </div>
            
        </div>

        <div className="footer">
            <Footer/>
        </div>



    </div>
  )
}

export default Profile