import React, { useEffect, useState } from 'react'

import axios from "axios"

//Reading States Reading,Finished,Booklog,Wishlist
import BookmarkIcon from '@mui/icons-material/Bookmark';//Reading
import BeenhereIcon from '@mui/icons-material/Beenhere';//Finished
import InventoryIcon from '@mui/icons-material/Inventory';//Backlog
import StarIcon from '@mui/icons-material/Star';


import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const Backlog = () => {
  const [backlogs,setBacklog] = useState([]);

  

    useEffect(()=>{
        const fetchAllBacklog = async  () =>{
            try {
                const res = await axios.get("http://localhost:8800/backlog")
                console.log(res.data)
                setBacklog(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllBacklog()
    },[])

  return (
    
      <div className='booksDisplay'>
            
            <div className="booksContainer">
                {backlogs.map(backlog => (
                    <div className="bookItem" key={backlog.id}>
                        <img src={backlog.cover} alt="" />
                        <div className="title">{backlog.title}</div>
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

export default Backlog