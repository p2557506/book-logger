import React, { useEffect } from 'react'
import "./filteringSideBar.scss"
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import axios from '../../api/axios';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
const FilteringSideBar = (props) => {

  const {titleTerm,setTitleterm,genreTerm,setGenreTerm} = useAuth();

  //Props being passed to filer bar
    const handleNameSearch = props.handleNameSearch;
    const handleGenreSearch = props.handleGenreSearch;
    const handleClearInput = props.handleClearInput;
    const inputValue = props.inputValue
    //Button clicks for genres

    const genreButtons = [
        { label: "Fantasy", action: () => setGenreTerm("fantasy") },
        { label: "Adventure", action: () => setGenreTerm("adventure") },
        { label: "Biography", action: () => setGenreTerm("biography") },
        { label: "Sci-Fi", action: () => setGenreTerm("sci-fi") },
        { label: "Comic", action: () => setGenreTerm("comic") },
        { label: "Religion", action: () => setGenreTerm("religion") },
    ];

    

    const [genreSciCount,setGenreSciCount] = useState()
    const [genreFanCount,setGenreFanCount] = useState()
    const [genreRelCount,setGenreRelCount] = useState()
    const [genreBioCount,setGenreBioCount] = useState()
    const [genreComicCount,setGenreComicCount] = useState()

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

          const resComic = await axios.get("http://localhost:8800/genre/" + "comic")
          setGenreComicCount(resComic.data[0].count)


        } catch (err) {
          
        }
      }
      getGenreType();
    },[])


  return (
    <div className="filteringToolContainer">
        <div className="inputBox">
          <input
            type="text"
            placeholder="Search by name ..."
            onChange={handleNameSearch}
            value={inputValue}
          />
            {inputValue ? (
          <CloseIcon
            style={{ cursor: 'pointer' }}
            onClick={handleClearInput}
          />
        ) : (
          <SearchIcon />
        )}
        </div>
        
        <div className="genreFilterBox">
            <h3>Genres</h3>
            <div className="inputBox">
              <input type="text"  placeholder="Search by genre ..." onChange={handleGenreSearch}/>
              <SearchIcon/>
            </div>
            <ul>
            {genreButtons.map((genre, index) => (
                        <li key={index} onClick={genre.action}>{genre.label}</li>
                    ))}
            </ul>
        </div>
    </div>
  )
}

export default FilteringSideBar