import React, { useEffect, useState } from 'react'

import axios from "axios"
import { Link } from 'react-router-dom';

//Reading States Reading,Finished,Booklog,Wishlist
import BookmarkIcon from '@mui/icons-material/Bookmark';//Reading
import BeenhereIcon from '@mui/icons-material/Beenhere';//Finished
import InventoryIcon from '@mui/icons-material/Inventory';//Backlog
import StarIcon from '@mui/icons-material/Star';
import useAuth from '../../hooks/useAuth';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import FilteringSideBar from '../../components/filteringSideBar/FilteringSideBar';

const AllBooks = () => {

    const {titleTerm,setTitleterm,genreTerm,setGenreTerm} = useAuth();
    
    const [books,setBooks] = useState([]);
  
    const [bookie,setBookie] = useState();

    const [nameTerm,setNameTerm] = useState("");

    

    const handleNameSearch = (e) =>{
        setNameTerm(e.target.value);

    }

    const handleGenreSearch = (e) =>{
        setGenreTerm(e.target.value);
        console.log(e.target.value)

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
    //Filter for genre aswell
    return (
        
        <div className='booksDisplay'>
            <div className="pageDescription">
            </div>
            <div className="pageContainer">

            <div className="booksContainer">
                {books.filter((book) =>{
                    
                    if(nameTerm == "" && genreTerm == ""){
                        return book;
                    }
                    
                    
                    else if(book.genre.toLowerCase().includes(genreTerm.toLowerCase()) && book.title.toLowerCase().includes(nameTerm.toLowerCase())){
                        return book
                    } 
                    
                }).map(book => (
                    <div className="bookItem" key={book.id}>
                        <Link to={`/books/${book.id}`}><img src={book.cover} alt="" /></Link>
                           
                    </div>
                ))}
            </div>
            <FilteringSideBar handleNameSearch = {handleNameSearch} handleGenreSearch = {handleGenreSearch}/>
            </div>
      </div>
    
  )
}

export default AllBooks