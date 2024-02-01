import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import axios from "axios"
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StarIcon from '@mui/icons-material/Star';

//Reading States Reading,Finished,Booklog,Wishlist
import BookmarkIcon from '@mui/icons-material/Bookmark';//Reading
import BeenhereIcon from '@mui/icons-material/Beenhere';//Finished
import InventoryIcon from '@mui/icons-material/Inventory';//Backlog


import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import useAuth from '../../hooks/useAuth';

import "./browse.scss"

import AllBooks from '../allBooks/AllBooks';
import Backlog from '../backlog/Backlog';
import Wishlist from '../wishlist/Wishlist';
import LoginRequest from '../loginRequest/LoginRequest';

const Browse = () => {

    axios.defaults.withCredentials = true
    const [page,setPage] = useState(0);
    const headerTitles = ["All Books","Your Backlog","Your Wishlist"]
    const {auth,setAuth,userId,backlogs,setBacklog} = useAuth();
    
    //Page displayer check if user is there
    const PageDisplay = () =>{
        
        if(page === 0){
            return <AllBooks/>
        } 
        if(!auth && page!==0){
            return<LoginRequest/>
        } else if(auth && page == 1){
            return <Backlog/>
        } else{
            return <Wishlist/>
        }
    }

    const [books,setBooks] = useState([]);

    useEffect(()=>{
        const fetchAllBooks = async  () =>{
            try {
                const res = await axios.get("http://localhost:8800/books")
                console.log(res.data)
                setBooks(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllBooks()
    },[])

    

    

    
  return (
    <div>
        <Navbar/>
        <header className="browseHeader">
            <h1>{headerTitles[page]}</h1>
            <div className="choiceLinks">
                <div className="choice" onClick={()=> setPage(0)}><p>Books Database</p></div>
                <div className="choice" onClick={()=> setPage(1)}><AutoStoriesIcon/><p>Your Backlog Library</p></div>
                <div className="choice" onClick={()=> setPage(2)}><StarIcon/><p>Your Wishlist</p></div>
            </div>
        </header>
        
        <div className="pageDisplay">{PageDisplay()}</div>

        <Footer/>
    </div>
  )
}

export default Browse