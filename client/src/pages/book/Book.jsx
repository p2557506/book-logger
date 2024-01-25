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
import useAuth from '../../hooks/useAuth';

import "./book.scss"

const Book = () => {

    axios.defaults.withCredentials = true
    const {userId,setUserId,backlogs,setBacklog} = useAuth();
    const location = useLocation();
    
    const bookId = location.pathname.split("/")[2];
    
    console.log(bookId);

    console.log(backlogs)

    //All institutions stored inside useState
    const [book,setBook] = useState([]);

    const [bookie,setBookie] = useState();

    const [temp,setTemp] = useState("ee");

    console.log(userId)
    

    const handleBacklogOrder = async () =>{
        
        try {
            //STEP 1 Push user_id to wb storage
            const res = await axios.post("http://localhost:8800/backlogOrderPush/", bookie);
            console.log(res);
        } catch (err) {
            console.log(err)
        }
        
    }

    const handleWishlistOrder = async () =>{
        
        try {
            const res = await axios.post("http://localhost:8800/wishlistOrderPush", bookie);
            
        } catch (err) {
            console.log(err)
        }
        
    }
    
    
    useEffect(() => {
        const fetchSpecificBook = async ()=> {
            try {
                const res = await axios.get("http://localhost:8800/books/"+ bookId);
                
                console.log(res.data[0]);
                setBook(res.data)
                setBookie({ uid: userId,book_id: bookId, title: res.data[0].title, descrip:res.data[0].desc, cover: res.data[0].cover})
                
            } catch (err) {
                console.log(err);
            }
        }
        
        fetchSpecificBook()
        
    },[])

    
    //Check if book is in backlog

    
    

  return (
    <div>
        <Navbar/>
        {book.map(book =>(
            <div className="body" key={book.id}>
                <header>
                    <h1>{book.title}</h1>
                    <p>{book.desc}</p>
                    
                    <p>{temp}</p>
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
                                <Button onClick={()=>(handleWishlistOrder())} ><StarIcon/></Button>
                            </Tooltip>
                        </div>
                        <div className="state" >
                            <Tooltip title="Backlog" arrow>
                                <Button onClick={()=>(handleBacklogOrder())}><InventoryIcon/></Button>
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