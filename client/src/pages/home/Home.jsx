import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import "./home.scss"
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <div className="home">
        <Navbar/>
        <div className="introSection">
          <h1 className="logo">BackLogger</h1>
          <h2>Organize your book library</h2>
          <p className="websiteDesc">
          BookLogger is a site that allows you to track the books your reading,
          the books that you want to read and the books you have read.
          </p>
          <div className="buttons"> 
            <button className="brwsBtn">Browse Books</button>
            <button className="lrnBtn">Learn More</button>
          </div>
        </div>
        <div className="categoryContainer">
          <h1>Popular Categories</h1>
          <div className="categoriesSection">
            <div className="categoryItem">Fiction</div>
            <div className="categoryItem">Non-Fiction</div>
            <div className="categoryItem">Mystery</div>
            <div className="categoryItem">SciFi</div>

          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Home