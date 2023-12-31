import React, { useEffect, useState } from 'react'

import axios from "axios"

//Reading States Reading,Finished,Booklog,Wishlist
import BookmarkIcon from '@mui/icons-material/Bookmark';//Reading
import BeenhereIcon from '@mui/icons-material/Beenhere';//Finished
import InventoryIcon from '@mui/icons-material/Inventory';//Backlog
import StarIcon from '@mui/icons-material/Star';


import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const Wishlist = () => {
  const [wishlist,setWishlist] = useState([]);

  

    useEffect(()=>{
        const fetchAllWishlist = async  () =>{
            try {
                const res = await axios.get("http://localhost:8800/wishlist")
                console.log(res.data)
                setWishlist(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllWishlist()
    },[])

  return (
    
      <div className='booksDisplay'>
            
            <div className="booksContainer">
                {wishlist.map(wishlistItem => (
                    <div className="bookItem" key={wishlistItem.id}>
                        <img src={wishlistItem.cover} alt="" />
                        <div className="title">{wishlistItem.title}</div>
                        <div className="readingState">
                        <div className="state" >
                                <Tooltip title="Reading" arrow>
                                    <Button><BookmarkIcon/></Button>
                                </Tooltip>
                            </div>
                            <div className="state">
                                <Tooltip title="Finished" arrow>
                                    <Button><BeenhereIcon/></Button>
                                </Tooltip>
                            </div>
                            <div className="state">
                                <Tooltip title="Wishlist" arrow>
                                    <Button><StarIcon/></Button>
                                </Tooltip>
                            </div>
                            <div className="state">
                                <Tooltip title="Backlog" arrow>
                                    <Button><InventoryIcon/></Button>
                                </Tooltip>
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>
            <div className="filteringToolContainer">
                <input type="text" placeholder='Search by name'/>
                <div className="genreFilterBox">
                    <h3>Genres</h3>
                    <input type="text"  placeholder="Search by genre"/>
                    <ul>
                        <li>Adventure</li>
                        <li>Fantasy</li>
                        <li>Biography</li>
                        <li>Sci-Fi</li>
                    </ul>
                </div>
            </div>
      </div>
    
  )
}

export default Wishlist