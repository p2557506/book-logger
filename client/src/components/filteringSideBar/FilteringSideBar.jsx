import React, { useEffect } from 'react'
import "./filteringSideBar.scss"
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import axios from '../../api/axios';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { colors } from '@mui/material';

const FilteringSideBar = (props) => {

  const {titleTerm,setTitleterm,genreTerm,setGenreTerm} = useAuth();

  //Props being passed to filer bar
    const handleNameSearch = props.handleNameSearch;
    const handleGenreSearch = props.handleGenreSearch;
    const handleClearInput = props.handleClearInput;
    const inputValue = props.inputValue

    //Button clicks for genres

    const genreButtons = [
      { label: "Fantasy", value: "fantasy" },
      { label: "Adventure", value: "adventure" },
      { label: "Biography", value: "biography" },
      { label: "Sci-Fi", value: "sci-fi" },
      { label: "Comic", value: "comic" },
      { label: "Religion", value: "religion" },
    ];

    const [genreSciCount,setGenreSciCount] = useState()
    const [genreFanCount,setGenreFanCount] = useState()
    const [genreRelCount,setGenreRelCount] = useState()
    const [genreBioCount,setGenreBioCount] = useState()
    const [genreComicCount,setGenreComicCount] = useState()



  const [selectedGenres, setSelectedGenres] = useState([]);
  

  const toggleGenreSelection = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
      setGenreTerm(""); // Clear genre term when deselected
    } else {
      setSelectedGenres([...selectedGenres, genre]);
      setGenreTerm(genre); // Set the selected genre
    }
  };
    

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
        <div className="inputBoxName">
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
            <div className="inputBoxGenre">
              <input type="text"  placeholder="Search by genre ..." onChange={handleGenreSearch}/>
              <SearchIcon/>
            </div>
            <ul>
            {genreButtons.map((genre, index) => (
            <li key={index} onClick={() => toggleGenreSelection(genre.value)}>
              {genre.label}
              <span>{selectedGenres.includes(genre.value) && <CheckIcon style={{color : 'lightgreen'}} />}</span>
            </li>
          ))}
            </ul>
        </div>
    </div>
  )
}

export default FilteringSideBar