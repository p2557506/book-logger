import React, { useEffect, useState } from 'react'

import axios from "axios"
import useAuth from '../../hooks/useAuth';

//Reading States Reading,Finished,Booklog,Wishlist
import BookmarkIcon from '@mui/icons-material/Bookmark';//Reading
import BeenhereIcon from '@mui/icons-material/Beenhere';//Finished
import InventoryIcon from '@mui/icons-material/Inventory';//Backlog
import StarIcon from '@mui/icons-material/Star';


import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import FilteringSideBar from '../../components/filteringSideBar/FilteringSideBar';

const Wishlist = () => {
  const [wishlist,setWishlist] = useState([]);

  const [searchTerm,setSearchTerm] = useState("");
  
  const {userId,setUserId} = useAuth();

    useEffect(()=>{
        const fetchAllWishlist = async  () =>{
            try {
                const res = await axios.get("http://localhost:8800/wishlistOrders/" + userId)
                console.log(res.data)
                setWishlist(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllWishlist()
    },[])

    const handleChange = (e) =>{
        setSearchTerm(e.target.value);

    }

  return (
    
      <div className='booksDisplay'>
            
            <div className="booksContainer">
                {wishlist.filter((book) =>{

                    if(searchTerm == ""){
                        return book;
                    } else if(book.title.toLowerCase().includes(searchTerm.toLowerCase())){
                        return book
                    }

                    }).map(wishlistItem => (
                    <div className="bookItem" key={wishlistItem.id}>
                        <img src={wishlistItem.cover} alt="" />
                        <div className="title">{wishlistItem.title}</div>
                        
                        
                    </div>
                ))}
            </div>
            <FilteringSideBar handleChange={handleChange}/>
      </div>
    
  )
}

export default Wishlist