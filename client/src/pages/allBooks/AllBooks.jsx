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
import "./allBooks.scss" 
import ReactPaginate from "react-paginate";

const AllBooks = () => {

    axios.defaults.withCredentials = true
    const {titleTerm,setTitleterm,genreTerm,setGenreTerm} = useAuth();
    
    const [books,setBooks] = useState([]);
  
    const [bookie,setBookie] = useState();

    const [nameTerm,setNameTerm] = useState("");

    //PAGINATION
    const [pageNumber,setPageNumber] = useState(0);

    const booksPerPage = 15;
    const pagesVisited = pageNumber * booksPerPage;

    

    const pageCount = Math.ceil(books.length / booksPerPage)
    
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }



    const handleNameSearch = (e) =>{
        setNameTerm(e.target.value);

    }

    const handleGenreSearch = (e) =>{
        setGenreTerm(e.target.value);
        console.log(e.target.value)

    }
    //Use for proper site
    //${process.env.REACT_APP_BACKEND_URL}
    useEffect(()=>{
        const fetchAllBooks = async  () =>{
            try {
                const res = await axios.get(`https://book-logger-app.onrender.com/books`)
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
        
        <div className="booksDisplay">
            <div className="pageDescription">
            </div>
            <div className="pageBox">
                <div className="pageContainer">

                
                    <div className="booksContainer">
                        
                        {books.filter((book) =>{
                            
                            if(nameTerm == "" && genreTerm == ""){
                                return book;
                            }
                            
                            
                            else if(book.genre.toLowerCase().includes(genreTerm.toLowerCase()) && book.title.toLowerCase().includes(nameTerm.toLowerCase())){
                                return book
                            } 
                            
                        }).slice(pagesVisited,pagesVisited + booksPerPage).map(book => (
                            <div className="bookItem" key={book.id}>
                                <Link to={`/books/${book.id}`}><img src={book.cover} alt="" /></Link>
                                
                            </div>
                        ))}
                    </div>
                    <div className="filterBar">
                        <FilteringSideBar handleNameSearch = {handleNameSearch} handleGenreSearch = {handleGenreSearch}/>

                    </div>
                </div>
                
                <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBtns"}
                    previousLinkClassName={"prevBtn"}
                    nextLinkClassName={"nextBtn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />

                
                </div>
                

      </div>
    
  )
}

export default AllBooks