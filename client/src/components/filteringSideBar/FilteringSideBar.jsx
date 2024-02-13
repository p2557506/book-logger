import React from 'react'
import "./filteringSideBar.scss"
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
const FilteringSideBar = (props) => {

  const {titleTerm,setTitleterm,genreTerm,setGenreTerm} = useAuth();

    const handleNameSearch = props.handleNameSearch
    const handleGenreSearch = props.handleGenreSearch

    //Button clicks for genres

    const handleFantasyClick = (e) =>{

      setGenreTerm("fantasy")
    }
    const handleAdventureClick = (e) =>{

      setGenreTerm("adventure")
    }
    const handleBiographyClick = (e) =>{

      setGenreTerm("biography")
    }
    const handleSciFiClick = (e) =>{

      setGenreTerm("sci-fi")
    }
    

  return (
    <div className="filteringToolContainer">
        <input type="text" placeholder='Search by name ...' onChange={handleNameSearch}/>
        <div className="genreFilterBox">
            <h3>Genres</h3>
            <input type="text"  placeholder="Search by genre" onChange={handleGenreSearch}/>
            <ul>
                <li onClick={handleAdventureClick}>Adventure</li>
                <li  onClick={handleFantasyClick}>Fantasy</li>
                <li onClick={handleBiographyClick}>Biography</li>
                <li onClick={handleSciFiClick}>Sci-Fi</li>
            </ul>
        </div>
    </div>
  )
}

export default FilteringSideBar