import { createContext,useCallback,useEffect,useState } from "react";
import axios from "../api/axios";
const AuthContext = createContext({});

export const AuthProvider = ({children}) =>{
    axios.defaults.withCredentials = true
    
    const URL = "https://openlibrary.org/search.json?title=";

    const [auth,setAuth] = useState(false);
   
    const [userId , setUserId] = useState();
    const [username,setUsername] = useState();
    //Make backlog accessible across application
    const [backlogs,setBacklog] = useState([]);

    const [bookId,setBookId] = useState();

    const [books,setBooks] = useState([])
    const [isInBacklog,setIsInBacklog] = useState(false);

    const [avatarImg,setAvatarImg] = useState();

    const [searchTerm,setSearchTerm] = useState("");

    const [titleTerm,setTitleTerm] = useState("the lord of the rings");
    const [genreTerm,setGenreTerm] = useState("");

    const [loading,setLoading] = useState(true)

    const fetchBooks = useCallback(async() => {
        setLoading(true);
        try {
            const res = await fetch(`${URL}${searchTerm}`);
            const data = await res.json();
            const {docs} = data;
            console.log(docs)

            if(docs){
                const newBooks = docs.slice(0,20).map((bookSingle) =>{
                    const {key, author_name,cover_i,title} = bookSingle;

                    return{
                        id:key,
                        author:author_name,
                        cover_id: cover_i,
                        title:title
                    }
                })
                setBooks(newBooks);

                if(newBooks.length > 1){
                     
                }

            }
            
            
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    },[searchTerm])

    useEffect(() =>{
        fetchBooks();
    },[searchTerm,fetchBooks])
    

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
        <AuthContext.Provider value={{auth,setAuth,userId,setUserId,backlogs,setBacklog,bookId,setBookId,isInBacklog,setIsInBacklog,username,setUsername,avatarImg,setAvatarImg,searchTerm,setSearchTerm,titleTerm,setTitleTerm,genreTerm,setGenreTerm,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext