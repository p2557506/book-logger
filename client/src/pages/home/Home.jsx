import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import "./home.scss"
import Footer from '../../components/footer/Footer'

import StarRateIcon from '@mui/icons-material/StarRate';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useEffect } from 'react';
import axios from '../../api/axios';

import { Link } from 'react-router-dom';
const Home = () => {

  


  return (
    <div className="home">
        <Navbar/>
        <div className="introSection">
          <h1 className="logo">BookLogger</h1>
          <h2>Organize your book library</h2>
          <p className="websiteDesc">
          BookLogger is a site that allows you to track the books your reading,
          the books that you want to read and the books you have read.
          </p>
          <div className="buttons"> 
            <Link to={"/browse"} className="brwsBtn">Browse Books</Link>
            <Link to={"/learn"}  className="lrnBtn">Learn More</Link>
          </div>
        </div>
        <div className="websiteDescSection">
          <div className="desc">
            <div className="icon">
              <StarRateIcon/>

            </div>
            <h1>Rate your Books</h1>
            <p>Rate and review your favorite (and not so favorite) games as you add them to your collection.</p>
          </div>
          <div className="desc">
            <div className="icon">

              <BookmarkIcon/>
            </div>
            <h1>What will you read next?</h1>
            <p>What do your friends think of the latest games? Check out their reviews and ratings by following them on Grouvee.</p>
          </div>
          <div className="desc">
            <div className="icon">
              <AllInboxIcon/>

            </div>
            <h1>Track your Backlog</h1>
            <p>Keep track of your video game backlog. Use the default Played, Playing, Backlog and Wish List shelves created for you, or create your own virtual shelves to categorize your games however you want. You can also automatically import your Steam library to easily manage your collection.</p>
          </div>
        </div>
        {/**Popular category gives random 10 books */}
        <div className="categoryContainer">
          <h1>Popular Categories</h1>
          <div className="categoriesSection">
            <div className="categoryAdv">Adventure</div>
            <div className="categoryFan">Fantasy</div>
            <div className="categorySci">Sci-Fi</div>
            <div className="categoryCom">Comic</div>

          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Home