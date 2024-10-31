import React, { useEffect } from 'react'
import "./filteringSideBar.scss"
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import axios from '../../api/axios';
import SearchIcon from '@mui/icons-material/Search';
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

    const handleComicClick = (e) =>{

      setGenreTerm("comic")
    }

    const handleReligionClick = (e) =>{

      setGenreTerm("religion")
    }

    const [genreSciCount,setGenreSciCount] = useState()
    const [genreFanCount,setGenreFanCount] = useState()
    const [genreRelCount,setGenreRelCount] = useState()
    const [genreBioCount,setGenreBioCount] = useState()
    const [genreComicCount,setGenreComicCount] = useState()

    useEffect(()=>{
      const getGenreType = async () =>{
        try {
          const resSci = await axios.get("https://book-logger-app.onrender.com/genre/" + "sci-fi")
          setGenreSciCount(resSci.data[0].count)
          
          const resFan = await axios.get("https://book-logger-app.onrender.com/genre/" + "fantasy")
          setGenreFanCount(resFan.data[0].count)
          
          const resRel = await axios.get("https://book-logger-app.onrender.com/genre/" + "religion")
          setGenreRelCount(resRel.data[0].count)
          
          const resBio = await axios.get("https://book-logger-app.onrender.com/genre/" + "biography")
          setGenreBioCount(resBio.data[0].count)

          const resComic = await axios.get("https://book-logger-app.onrender.com/genre/" + "comic")
          setGenreComicCount(resComic.data[0].count)


        } catch (err) {
          
        }
      }
      getGenreType();
    },[])


  return (
    <div className="filteringToolContainer">
        <div className="inputBox">
        <input type="text" placeholder='Search by name ...' onChange={handleNameSearch}/>
          <SearchIcon/>
        </div>
        
        <div className="genreFilterBox">
            <h3>Genres</h3>
            <div className="inputBox">
              <input type="text"  placeholder="Search by genre ..." onChange={handleGenreSearch}/>
              <SearchIcon/>
            </div>
            <ul>
                <li onClick={handleAdventureClick}>Adventure</li>
                <li  onClick={handleFantasyClick}>Fantasy <p>{genreFanCount}</p></li>
                <li onClick={handleBiographyClick}>Biography <p>{genreBioCount}</p></li>
                <li onClick={handleReligionClick}>Religion <p>{genreRelCount}</p></li>
                <li onClick={handleSciFiClick}>Sci-Fi <p>{genreSciCount}</p></li>
                <li onClick={handleComicClick}>Comic <p>{genreComicCount}</p></li>
            </ul>
        </div>
    </div>
  )
}

export default FilteringSideBar