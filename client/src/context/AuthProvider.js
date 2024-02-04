import { createContext,useEffect,useState } from "react";
import axios from "../api/axios";
const AuthContext = createContext({});

export const AuthProvider = ({children}) =>{
    axios.defaults.withCredentials = true
    
    const [auth,setAuth] = useState(false);
   
    const [userId , setUserId] = useState();
    const [username,setUsername] = useState();
    //Make backlog accessible across application
    const [backlogs,setBacklog] = useState([]);

    const [bookId,setBookId] = useState();

    const [isInBacklog,setIsInBacklog] = useState(false);

    const [avatarImg,setAvatarImg] = useState();

    

   /*  useEffect(() => {
        const fetchProfile = async  () =>{
            try {
                const res = await axios.get("http://localhost:8800/profile")
                console.log(res.username)
                
            } catch (err) {
                console.log(err)
            }
        }
        fetchProfile()
    }, []) */

    return (
        <AuthContext.Provider value={{auth,setAuth,userId,setUserId,backlogs,setBacklog,bookId,setBookId,isInBacklog,setIsInBacklog,username,setUsername,avatarImg,setAvatarImg}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext