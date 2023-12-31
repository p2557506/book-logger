import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

//Reading States Reading,Finished,Booklog,Wishlist
import BookmarkIcon from '@mui/icons-material/Bookmark';//Reading
import BeenhereIcon from '@mui/icons-material/Beenhere';//Finished
import InventoryIcon from '@mui/icons-material/Inventory';//Backlog
import StarIcon from '@mui/icons-material/Star';


import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import "./book.scss"

const Book = () => {

    const location = useLocation();
    
    const id = location.pathname.split("/")[2];
    console.log(id);

    //All institutions stored inside useState
    const [book,setBook] = useState([]);

    const [bookie,setBookie] = useState()

    

    const handleBacklogPush = async () =>{
        
        try {
            const res = await axios.post("http://localhost:8800/backlog", bookie);
            
        } catch (err) {
            console.log(err)
        }
        
    }

    const handleWishlistPush = async () =>{
        
        try {
            const res = await axios.post("http://localhost:8800/wishlist", bookie);
            
        } catch (err) {
            console.log(err)
        }
        
    }
    
    
    useEffect(() => {
        const fetchSpecificBook = async ()=> {
            try {
                const res = await axios.get("http://localhost:8800/books/"+ id);
                
                console.log(res.data[0]);
                setBook(res.data);
                setBookie(res.data[0])
                
            } catch (err) {
                console.log(err);
            }
        }
        
        fetchSpecificBook()
        
    },[])

  return (
    <div>
        <Navbar/>
        {book.map(book =>(
            <div className="body">
                <header>
                    <h1>{book.title}</h1>
                    <p>{book.desc}</p>
                </header>
                <div className="collectionContainer">
                    <img src={book.cover} alt="" />
                    <div className="readingState">
                        <div className="state">
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
                                <Button onClick={()=>(handleWishlistPush())}><StarIcon/></Button>
                            </Tooltip>
                        </div>
                        <div className="state" >
                            <Tooltip title="Backlog" arrow>
                                <Button onClick={()=>(handleBacklogPush())}><InventoryIcon/></Button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
            ))}
    </div>
  )
}

export default Book