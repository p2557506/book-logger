import React , { useRef,useState,useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';

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
  return (
    <div>
        <Navbar/>
        <div>

        </div>
    </div>
  )
}

export default SignUp