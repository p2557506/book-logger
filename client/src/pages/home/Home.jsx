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
          <h1 className="logo">Read any good books lately?</h1>
          <h2>Organize your book library</h2>
          <p className="websiteDesc">
          BookLogger is a site that allows you to track the books you're reading,
          the books that you wish to read and the books that you have finished.
          </p>
          <div className="buttons"> 
            <Link to={"/browse"} className="signUpBtn">Sign Up</Link>
            <Link to={"/learn"}  className="logInBtn">Log In</Link>
          </div>
        </div>
        <div className="websiteDescSection">
          <div className="desc">
            <div className="icon">
              <StarRateIcon style={{fontSize : 50}}/>

            </div>
            <h1>Rate your Books</h1>
            <p>Rate and review your favorite (and not so favorite) books as you add them to your collection.</p>
          </div>
          <div className="desc">
            <div className="icon">

              <BookmarkIcon style={{fontSize : 50}}/>
            </div>
            <h1>What will you read next?</h1>
            <p>Plan your next reading adventure. Use the Wish List shelf to track the books you hope to own one day. </p>
          </div>
          <div className="desc">
            <div className="icon">
              <AllInboxIcon style={{fontSize : 50}}/>

            </div>
            <h1>Track your Backlog</h1>
            <p>Keep track of your book backlog. Use the Reading, Archive, Backlog and Wish List shelves created for you, to easily manage your collection.</p>
          </div>
        </div>
        {/**Popular category gives random 10 books */}
        
        <Footer/>
    </div>
  )
}

export default Home