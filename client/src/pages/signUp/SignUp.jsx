import React , { useRef,useState,useEffect } from 'react';

import axios from '../../api/axios';
import Navbar from '../../components/navbar/Navbar';

import "./signUp.scss"

import { faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;




const SignUp = () => {
    axios.defaults.withCredentials = true
    //Focus on user inputs and error for accessibility announcer
    const userRef = useRef();
    const errRef = useRef();


   

    const [userName,setUserName] = useState("");
    const [validName,setValidName] = useState(false);
    const [userFocus,setUserFocus] = useState(false);

    const [pwd,setPwd] = useState("");
    const [validPwd,setValidPwd] = useState(false);
    const [pwdFocus,setPwdFocus] = useState(false);

    const [matchPwd,setMatchPwd] = useState("");
    const [validMatch,setValidMatch] = useState(false);
    const [matchFocus,setMatchFocus] = useState(false);

    const [errMsg,setErrMsg] = useState("")
    const [successMsg,setSuccess] = useState(false)

    useEffect(() =>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        const result = USER_REGEX.test(userName);
        console.log(result);
        console.log(userName);
        setValidName(result)
    }, [userName])

    useEffect(()=>{
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result)
        //Checks if pwd matches secon pwd input and holds boolean
        const match = pwd === matchPwd;
        setValidMatch(match)
    }, [pwd,matchPwd])//If either pwd or match pwd change use effect runs again

    useEffect(() =>{
        setErrMsg("");
    },[userName,pwd,matchPwd])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        //If button enabled with JS Hack
        const v1 = USER_REGEX.test(userName);
        const v2 = PWD_REGEX.test(pwd);
        if(!v1 || !v2){
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8800/signup", JSON.stringify({username: userName,password:pwd}),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            });

            console.log(res.data)
            if(res.data.errno === 1062){
                setErrMsg("Username is taken")
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
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validName || !userName ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                 type="text"
                 id="username"
                 ref={userRef}
                 autoComplete="off"
                 onChange={(e) => setUserName(e.target.value)}
                 required
                 aria-invalid={validName ? "false" : "true"}
                 aria-describedby="uidnote"
                 onFocus={() => setUserFocus(true)}
                 onBlur={() => setUserFocus(false)}
                 />
                 <p id="uidnote" className={userFocus && userName && !validName ? "instructions" : "offScreen"}>
                 <FontAwesomeIcon icon={faInfoCircle}/>
                    4 to 24 characters.<br/>
                    Must begin with a letter.<br/>
                    Letters, numbers, underscores, hyphens allowed.
                 </p>
                 <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                 type="password"
                 id="password"
                 ref={userRef}
                 onChange={(e) => setPwd(e.target.value)}
                 required
                 aria-invalid={validPwd ? "false" : "true"}
                 aria-describedby="pwdnote"
                 onFocus={() => setPwdFocus(true)}
                 onBlur={() => setPwdFocus(false)}
                 />
                 <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offScreen"}>
                 <FontAwesomeIcon icon={faInfoCircle}/>
                    8 to 24 characters.<br/>
                    Must inlcude uppercase and lowercase letters, a number and a special character.<br/>
                    Allowed special characters: <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span>
                    <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                 </p>

                 <label htmlFor="confirmPassword">
                    Confirm Password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                 type="password"
                 id="confirmPassword"
                 
                 onChange={(e) => setMatchPwd(e.target.value)}
                 required
                 aria-invalid={validMatch ? "false" : "true"}
                 aria-describedby="confirmnote"
                 onFocus={() => setMatchFocus(true)}
                 onBlur={() => setMatchFocus(false)}
                 />
                 <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offScreen"}>
                 <FontAwesomeIcon icon={faInfoCircle}/>
                   Must match the first password.
                 </p>
                 <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
            </form>
        </div>
        </div>
    </div>
  )
}

export default SignUp