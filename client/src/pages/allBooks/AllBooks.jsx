import React, { useEffect, useState } from 'react'

import axios from "axios"
import { Link } from 'react-router-dom';

//Reading States Reading,Finished,Booklog,Wishlist
import BookmarkIcon from '@mui/icons-material/Bookmark';//Reading
import BeenhereIcon from '@mui/icons-material/Beenhere';//Finished
import InventoryIcon from '@mui/icons-material/Inventory';//Backlog
import StarIcon from '@mui/icons-material/Star';


import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const AllBooks = () => {

    
    const [books,setBooks] = useState([]);
  
    const [bookie,setBookie] = useState()
    
  
    
    
    
    const handleClick = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8800/backlog", bookie);
            
        } catch (err) {
            console.log(err)
        }
        
    }
    
    useEffect(()=>{
        const fetchAllBooks = async  () =>{
            try {
                const res = await axios.get("http://localhost:8800/books")
                console.log(res.data)
                setBooks(res.data)
                setBookie(res.data[0])
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllBooks()
    },[])
    
    return (
        
        <div className='booksDisplay'>
            
            <div className="booksContainer">
                {books.map(book => (
                    <div className="bookItem" key={book.id}>
                        <Link to={`/books/${book.id}`}><img src={book.cover} alt="" /></Link>
                           
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

export default AllBooks