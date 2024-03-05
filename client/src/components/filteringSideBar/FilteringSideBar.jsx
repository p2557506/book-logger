import React, { useEffect } from 'react'
import "./filteringSideBar.scss"
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import axios from '../../api/axios';
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

    const [genreSciCount,setGenreSciCount] = useState()
    const [genreFanCount,setGenreFanCount] = useState()
    const [genreRelCount,setGenreRelCount] = useState()
    const [genreBioCount,setGenreBioCount] = useState()

    useEffect(()=>{
      const getGenreType = async () =>{
        try {
          const resSci = await axios.get("http://localhost:8800/genre/" + "sci-fi")
          setGenreSciCount(resSci.data[0].count)
          
          const resFan = await axios.get("http://localhost:8800/genre/" + "fantasy")
          setGenreFanCount(resFan.data[0].count)
          
          const resRel = await axios.get("http://localhost:8800/genre/" + "religion")
          setGenreRelCount(resRel.data[0].count)
          
          const resBio = await axios.get("http://localhost:8800/genre/" + "biography")
          setGenreBioCount(resBio.data[0].count)


        } catch (err) {
          
        }
      }
      getGenreType();
    },[])


  return (
    <div className="filteringToolContainer">
        <input type="text" placeholder='Search by name ...' onChange={handleNameSearch}/>
        <div className="genreFilterBox">
            <h3>Genres</h3>
            <input type="text"  placeholder="Search by genre ..." onChange={handleGenreSearch}/>
            <ul>
                <li onClick={handleAdventureClick}>Adventure</li>
                <li  onClick={handleFantasyClick}>Fantasy <p>{genreFanCount}</p></li>
                <li onClick={handleBiographyClick}>Biography <p>{genreBioCount}</p></li>
                <li onClick={handleBiographyClick}>Religion <p>{genreRelCount}</p></li>
                <li onClick={handleSciFiClick}>Sci-Fi <p>{genreSciCount}</p></li>
                <li onClick={handleSciFiClick}>Comic <p>{genreSciCount}</p></li>
            </ul>
        </div>
    </div>
  )
}

export default FilteringSideBar