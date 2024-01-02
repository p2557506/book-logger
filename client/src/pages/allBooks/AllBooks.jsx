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
import FilteringSideBar from '../../components/filteringSideBar/FilteringSideBar';

const AllBooks = () => {

    
    const [books,setBooks] = useState([]);
  
    const [bookie,setBookie] = useState();

    const [searchTerm,setSearchTerm] = useState("");

    const handleChange = (e) =>{
        setSearchTerm(e.target.value);

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
                {books.filter((book) =>{

                    if(searchTerm == ""){
                        return book;
                    } else if(book.title.toLowerCase().includes(searchTerm.toLowerCase())){
                        return book
                    }
                    
                }).map(book => (
                    <div className="bookItem" key={book.id}>
                        <Link to={`/books/${book.id}`}><img src={book.cover} alt="" /></Link>
                           
                    </div>
                ))}
            </div>
            <FilteringSideBar handleChange = {handleChange}/>
      </div>
    
  )
}

export default AllBooks