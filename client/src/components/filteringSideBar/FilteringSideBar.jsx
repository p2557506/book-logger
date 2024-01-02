import React from 'react'
import "./filteringSideBar.scss"

import { useState } from 'react';
const FilteringSideBar = (props) => {

    const handleChange = props.handleChange
    

  return (
    <div className="filteringToolContainer">
        <input type="text" placeholder='Search by name ...' onChange={handleChange}/>
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
  )
}

export default FilteringSideBar