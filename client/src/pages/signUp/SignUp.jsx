import React , { useRef,useState,useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';

import "./signUp.scss"

import { faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



const SignUp = () => {
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
        setValidName(result)
        //Checks if pwd matches secon pwd input and holds boolean
        const match = pwd === matchPwd;
        setValidMatch(match)
    }, [pwd,matchPwd])//If either pwd or match pwd change use effect runs again

    useEffect(() =>{
        setErrMsg("");
    },[userName,pwd,matchPwd])
  return (
    <div>
        <Navbar/>
        <div className="main">

        
        <div className="formContainer">
            <p ref={errRef} className={errMsg ? "errMsg" : "offScreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign Up</h1>
            <form >
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
                 <p id="uidnote" className={userFocus && userName && !validName ? "instructions" : "offScreen"}></p>
                 <FontAwesomeIcon icon={faInfoCircle}/>
            </form>
        </div>
        </div>
    </div>
  )
}

export default SignUp