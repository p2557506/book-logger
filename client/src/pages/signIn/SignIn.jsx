import React , { useRef,useState,useEffect , useContext } from 'react';
import axios from '../../api/axios';
import Navbar from '../../components/navbar/Navbar';

import AuthContext from '../../context/AuthProvider';


import "./signIn.scss"

import { faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;




const Login = () => {
    //Focus on user inputs and error for accessibility announcer
    const userRef = useRef();
    const errRef = useRef();

    const {setAuth} = useContext(AuthContext)


   

    const [userName,setUserName] = useState("");
    
    const [userFocus,setUserFocus] = useState(false);

    const [pwd,setPwd] = useState("");
    
    const [pwdFocus,setPwdFocus] = useState(false);

    

    const [errMsg,setErrMsg] = useState("")
    const [successMsg,setSuccess] = useState(false)

    useEffect(() =>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        const result = USER_REGEX.test(userName);
        console.log(result);
        console.log(userName);
        
    }, [userName])

    //Refresh error message when user changes any input
    useEffect(() =>{
        setErrMsg("");
    },[userName,pwd])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        //If button enabled with JS Hack
        

        try {
            const res = await axios.post("http://localhost:8800/auth", JSON.stringify({username: userName,password:pwd}),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            });
            

            console.log(res)
            if(res.data.message){
                setErrMsg("Wrong Username or Password")
            }
            
            
        } catch (e) {
            
            console.error(e)
            
            
        }
    }

  return (
    <div>
        <Navbar/>
        <div className="main">

        
        <div className="formContainer">
            <p ref={errRef} className={errMsg ? "errmsg" : "offScreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    
                </label>
                <input
                 type="text"
                 id="username"
                 ref={userRef}
                 autoComplete="off"
                 onChange={(e) => setUserName(e.target.value)}
                 required
                 
                 
                 value={userName}
                 onFocus={() => setUserFocus(true)}
                 onBlur={() => setUserFocus(false)}
                 />
                 
                 
                 <label htmlFor="password">
                    Password:
                    
                </label>
                <input
                 type="password"
                 id="password"
                 ref={userRef}
                 onChange={(e) => setPwd(e.target.value)}
                 required
                 value={pwd}
                 aria-describedby="pwdnote"
                 onFocus={() => setPwdFocus(true)}
                 onBlur={() => setPwdFocus(false)}
                 />
                 

                 
                 <button>Sign In</button>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Login