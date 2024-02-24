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
import Footer from '../../components/footer/Footer';

const Book = () => {
    axios.defaults.withCredentials = true;
    const {userId,setUserId} = useAuth();
    
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];
    
   
    
    //All institutions stored inside useState
    const [book,setBook] = useState([]);
    
    const [bookie,setBookie] = useState();
    
    const [temp,setTemp] = useState("ee");
    
    
    
    
    
    
    
    const [backlogs,setBacklog] = useState([]);
    const [wishlist,setWishlist] = useState([]);
    const [archive,setArchive] = useState([]);

    useEffect(()=>{
        const fetchAllBacklog = async  () =>{
            try {
                const resBacklog = await axios.get("http://localhost:8800/backlogOrders/" + userId)
                const resWishlist = await axios.get("http://localhost:8800/wishlistOrders/" + userId)
                const resArchive = await axios.get("http://localhost:8800/completedOrders/" + userId)
                setBacklog(resBacklog.data)
                setWishlist(resWishlist.data)
                setArchive(resArchive.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllBacklog()
    },[backlogs,wishlist,archive])

    

    //Check if book is in backlog
    let isInBacklog = backlogs.some( backlog => backlog['book_id'] == bookId);
    let isInWishlist = wishlist.some( wishlist => wishlist['book_id'] == bookId);
    let isInArchive = archive.some( archive => archive['book_id'] == bookId)
    
    
    //Boolean to track if book is in backlog //Maybe store in provider to keep constant while logged in
    
      
   
    

    const handleBacklogOrder = async () =>{
        
        try {
            //STEP 1 Push user_id to wb storage
            //If book is in backlog, delete book from backlog
            
                //IF in book is in backlog delete
                
            
                //add book in backlog
                const res = await axios.post("http://localhost:8800/backlogOrderPush/", bookie);
                console.log(res);

            
        } catch (err) {
            //alert that book is in backlog
            
            console.log(err)
        }
        
    }

    const handleBookBacklogDelete = async () => {
        try {
            const res = await axios.delete("http://localhost:8800/removeBookBacklog/" +bookId);
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

    const handleBookWishlistDelete = async () => {
        try {
            const res = await axios.delete("http://localhost:8800/removeBookWishlist/" +bookId);
        } catch (err) {
            console.log(err)
        }
    }

    const handleCompletedOrder = async () =>{
        
        try {
            const res = await axios.post("http://localhost:8800/completedOrderPush", bookie);
            
        } catch (err) {
            console.log(err)
        }
        
    }

    const handleBookCompletedDelete = async () => {
        try {
            const res = await axios.delete("http://localhost:8800/removeBookCompleted/" +bookId);
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
    <div >
        <Navbar/>
        {book.map(book =>(
            <div className="bookPage" key={book.id}>
                <div className="barrier">
                    
                </div>
                <div className="container">
                    
                    <div className="collectionContainer">
                        <img src={book.cover} alt="" />
                        <h3>My Book Data</h3>
                        <div className="readingState">
                            <div className="state">
                                <Tooltip title="Reading" arrow>
                                    <Button className="neutral"><BookmarkIcon/></Button>
                                </Tooltip>
                            </div>
                            <div className="state">
                                <Tooltip title="Finished" arrow>
                                    <Button className={isInArchive ? "highlight" : "neutral"} onClick={()=>(isInArchive ? handleBookCompletedDelete() : handleCompletedOrder())}><BeenhereIcon/></Button>
                                </Tooltip>
                            </div>
                            <div className="state">
                                <Tooltip title="Wishlist" arrow>
                                    <Button className={isInWishlist ? "highlight" : "neutral"} onClick={()=>(isInWishlist ? handleBookWishlistDelete() : handleWishlistOrder())} ><StarIcon/></Button>
                                </Tooltip>
                            </div>
                            <div className="state" >
                                <Tooltip title="Backlog" arrow>
                                    <Button className={isInBacklog ? "highlight" : "neutral"} onClick={()=>(isInBacklog ? handleBookBacklogDelete() : handleBacklogOrder())}><InventoryIcon/></Button>
                                </Tooltip>
                            </div>
                        </div>
                        
                    </div>
                    <div className="bookDetails">

                        <h1>{book.title}</h1>
                        <p>{book.desc}</p>
                    </div>
                    
                </div>
            </div>
            ))}
            <Footer/>
    </div>
  )
}

export default Book