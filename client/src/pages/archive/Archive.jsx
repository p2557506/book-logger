import React, { useEffect, useState } from 'react'

import axios from "axios"
import useAuth from '../../hooks/useAuth'
//Reading States Reading,Finished,Booklog,Wishlist
import BookmarkIcon from '@mui/icons-material/Bookmark';//Reading
import BeenhereIcon from '@mui/icons-material/Beenhere';//Finished
import InventoryIcon from '@mui/icons-material/Inventory';//Backlog
import StarIcon from '@mui/icons-material/Star';


import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import FilteringSideBar from '../../components/filteringSideBar/FilteringSideBar';

import ReactPaginate from "react-paginate"

const Archive = () => {
  
    const [archive,setArchive] = useState([]);

    axios.defaults.withCredentials = true;
  const {userId,setUserId,backlogs,setBacklog} = useAuth();
  
  const [searchTerm,setSearchTerm] = useState("");
    useEffect(()=>{
        const fetchAllArchive = async  () =>{
            try {
                const res = await axios.get("https://book-logger-app.onrender.com/completedOrders/" + userId)
                console.log(res.data)
                setArchive(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllArchive()
    },[])

    const handleChange = (e) =>{
        setSearchTerm(e.target.value);

    }

    //PAGINATION
    const [pageNumber,setPageNumber] = useState(0);

    const booksPerPage = 15;
    const pagesVisited = pageNumber * booksPerPage;

    

    const pageCount = Math.ceil(archive.length / booksPerPage)
    
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }
    

  return (
    
      <div className='booksDisplay'>
        <div className="archivePageDescription">
            <h2>Completed</h2>
            <p className="guideP">Add a book to your archive when you've completed it</p>
            <p className="expP">You've reached the ending and finished the book. A job well done, whats next?</p>
        </div>
        <div className="pageBox">

        
        <div className="pageContainer">

            <div className="booksContainer">
                {archive.filter((book) =>{
                    
                    if(searchTerm == ""){
                        return book;
                    } else if(book.title.toLowerCase().includes(searchTerm.toLowerCase())){
                        return book
                    }
                    
                }).map(archiveItem => (
                    <div className="bookItem" key={archiveItem.id}>
                        <img src={archiveItem.cover} alt="" />
                        <div className="title">{archiveItem.title}</div>
                        
                        
                    </div>
                ))}
            </div>
            
            <FilteringSideBar handleChange ={handleChange}/>
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

export default Archive