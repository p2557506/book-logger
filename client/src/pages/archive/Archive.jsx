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

const Archive = () => {
  
    const [archive,setArchive] = useState([]);

    axios.defaults.withCredentials = true;
  const {userId,setUserId,backlogs,setBacklog} = useAuth();
  
  const [searchTerm,setSearchTerm] = useState("");
    useEffect(()=>{
        const fetchAllArchive = async  () =>{
            try {
                const res = await axios.get("http://localhost:8800/completedOrders/" + userId)
                console.log(res.data)
                setArchive(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllArchive()
    },[])

    const handleChange = (e) =>{
        setSearchTerm(e.target.value);

    }
    

  return (
    
      <div className='booksDisplay'>
            
            <div className="booksContainer">
                {archive.filter((book) =>{

                    if(searchTerm == ""){
                        return book;
                    } else if(book.title.toLowerCase().includes(searchTerm.toLowerCase())){
                        return book
                    }

                    }).map(archiveItem => (
                    <div className="bookItem" key={archiveItem.id}>
                        <img src={archiveItem.cover} alt="" />
                        <div className="title">{archiveItem.title}</div>
                        
                        
                    </div>
                ))}
            </div>
            
            <FilteringSideBar handleChange ={handleChange}/>
      </div>
    
  )
}

export default Archive