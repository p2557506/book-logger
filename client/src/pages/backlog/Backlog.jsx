import React, { useEffect, useState } from 'react'

import axios from "axios"
import useAuth from '../../hooks/useAuth'
//Reading States Reading,Finished,Booklog,Wishlist
import BookmarkIcon from '@mui/icons-material/Bookmark';//Reading
import BeenhereIcon from '@mui/icons-material/Beenhere';//Finished
import InventoryIcon from '@mui/icons-material/Inventory';//Backlog
import StarIcon from '@mui/icons-material/Star';


import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import FilteringSideBar from '../../components/filteringSideBar/FilteringSideBar';

const Backlog = () => {
  
    axios.defaults.withCredentials = true;
  const {userId,setUserId,backlogs,setBacklog} = useAuth();
  
  const [searchTerm,setSearchTerm] = useState("");
    useEffect(()=>{
        const fetchAllBacklog = async  () =>{
            try {
                const res = await axios.get("http://localhost:8800/backlogOrders/" + userId)
                console.log(res.data)
                setBacklog(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllBacklog()
    },[])

    const handleChange = (e) =>{
        setSearchTerm(e.target.value);

    }
    

  return (
    
      <div className='booksDisplay'>
            
            <div className="booksContainer">
                {backlogs.filter((book) =>{

                    if(searchTerm == ""){
                        return book;
                    } else if(book.title.toLowerCase().includes(searchTerm.toLowerCase())){
                        return book
                    }

                    }).map(backlog => (
                    <div className="bookItem" key={backlog.id}>
                        <img src={backlog.cover} alt="" />
                        <div className="title">{backlog.title}</div>
                        
                        
                    </div>
                ))}
            </div>
            <FilteringSideBar handleChange ={handleChange}/>
      </div>
    
  )
}

export default Backlog