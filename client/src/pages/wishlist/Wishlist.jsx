import React, { useEffect, useState } from 'react'

import axios from "axios"
import useAuth from '../../hooks/useAuth';

//Reading States Reading,Finished,Booklog,Wishlist
import BookmarkIcon from '@mui/icons-material/Bookmark';//Reading
import BeenhereIcon from '@mui/icons-material/Beenhere';//Finished
import InventoryIcon from '@mui/icons-material/Inventory';//Backlog
import StarIcon from '@mui/icons-material/Star';


import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import FilteringSideBar from '../../components/filteringSideBar/FilteringSideBar';

import ReactPaginate from "react-paginate"

const Wishlist = () => {
  const [wishlist,setWishlist] = useState([]);

  const [searchTerm,setSearchTerm] = useState("");
  
  const {userId,setUserId} = useAuth();

    useEffect(()=>{
        const fetchAllWishlist = async  () =>{
            try {
                const res = await axios.get("http://localhost:8800/wishlistOrders/" + userId)
                console.log(res.data)
                setWishlist(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllWishlist()
    },[])

    const handleChange = (e) =>{
        setSearchTerm(e.target.value);

    }

    //PAGINATION
    const [pageNumber,setPageNumber] = useState(0);

    const booksPerPage = 15;
    const pagesVisited = pageNumber * booksPerPage;

    

    const pageCount = Math.ceil(wishlist.length / booksPerPage)
    
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

  return (
    
      <div className='booksDisplay'>
         <div className="wishlistPageDescription">
            <h2>Wishlist</h2>
            <p className="guideP">Add a book to your wishlist to track it and eventually add it to your collection</p>
            <p className="expP">These are books you want to get some day</p>
        </div>
        <div className="pageBox">

        
        <div className="pageContainer">

            
            <div className="booksContainer">
                {wishlist.filter((book) =>{
                    
                    if(searchTerm == ""){
                        return book;
                    } else if(book.title.toLowerCase().includes(searchTerm.toLowerCase())){
                        return book
                    }
                    
                }).map(wishlistItem => (
                    <div className="bookItem" key={wishlistItem.id}>
                        <img src={wishlistItem.cover} alt="" />
                        <div className="title">{wishlistItem.title}</div>
                        
                        
                    </div>
                ))}
            </div>
            <FilteringSideBar handleChange={handleChange}/>
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

export default Wishlist