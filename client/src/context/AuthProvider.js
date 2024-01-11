import { createContext,useEffect,useState } from "react";
import axios from "../api/axios";
const AuthContext = createContext({});

export const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState(false);

    useEffect(() => {
        const fetchProfile = async  () =>{
            try {
                const res = await axios.get("http://localhost:8800/profile")
                console.log(res)
                
            } catch (err) {
                console.log(err)
            }
        }
        fetchProfile()
    }, [])

    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext