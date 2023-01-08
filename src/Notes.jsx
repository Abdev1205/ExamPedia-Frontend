import React, { useState } from 'react'
import { useEffect } from 'react'
import LoadingAnimation from './LoadingAnimation'
import Navbar from './Navbar'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Notes() {
  const [serverValue, setServerValue] = useState([])
  const [optionValue, setOptionValue] = useState('')
  const [searchBarValue, setSearchBarValue] = useState('')
  const [searchKeyValueSuggestion, setSearchKeyValueSuggestion] = useState([])

  const [suggestion, setSuggestion] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [sortOptionOpen, setSortOptionOpen] = useState(true)
  const [loaderAnimation , setLoaderAnimation] =useState(false)
  const [sortValue,setSortValue ] = useState('MID Term')

  useEffect(() => {

    const loadOption = async () => {
      const pyqServerData = await fetch('https://exampedia-rest-api-production.up.railway.app/api/allNote');
      let pyqServerValue = await pyqServerData.json();
      // console.log(pyqServerValue);
      setServerValue(pyqServerValue);
      // console.log(serverValue);
      // setServerValue(pyqServerValue)

      if (optionValue == "subject") {
        const pyqSubjectOptionData = serverValue.map((obj) => {

          return obj.subject;
        })

        // console.log(pyqSubjectOptionData);

        const filteredPyqSubjectOptionData = pyqSubjectOptionData.filter((val, index) => pyqSubjectOptionData.indexOf(val) == index);

        // console.log(filteredPyqSubjectOptionData);
        setSearchKeyValueSuggestion(filteredPyqSubjectOptionData)
        setServerValue(pyqServerValue);
      }
      if (optionValue === "chapter") {
        const pyqFacultyOptionData = serverValue.map((obj) => {

          return obj.chapter;
        })

        // console.log(pyqFacultyOptionData);

        const filteredPyqFacultyOptionData = pyqFacultyOptionData.filter((val, index) => pyqFacultyOptionData.indexOf(val) == index);

        // console.log(filteredPyqFacultyOptionData);
        setSearchKeyValueSuggestion(filteredPyqFacultyOptionData);
      }




    }
    loadOption()
    search()

  }, [optionValue,searchBarValue])



  const option = (e) => {
    setOptionValue(e.target.value);
    // console.log(e.target.value);
  }

  const sort = (e) =>{
    if(e.target.value === 'Sort'){
      setSortValue('');
    }else{

      setSortValue(e.target.value);
      console.log(e.target.value);
    }
    // console.log(sortValue);
    search()
    
  }

  const searchBar = (searchKeyword) => {
    // setSearchBarValue(e.target.value);
    // console.log(e.target.value);
    
    let searchMatch = [];
    if (searchKeyword.length > 0) {
      searchMatch = searchKeyValueSuggestion.filter(ele => {
        let regex = new RegExp(searchKeyword, "gi");
        return ele.match(regex);
      })
    }
    // console.log(searchMatch);
    setSuggestion(searchMatch)
    setSearchBarValue(searchKeyword)
  }
  const onSuggestionHandler = (subjectSearched) => {
    setSearchBarValue(subjectSearched)
    setSuggestion([]);

  }



  const search = async () => {
    if(searchBarValue.length > 0){

    }
    // alert(`${searchBarValue} is searched`)
    // console.log(`https://exampedia-rest-api-production.up.railway.app/api/allNote?${optionValue}=${searchBarValue} is searched`);
    const searchedData = await fetch(`https://exampedia-rest-api-production.up.railway.app/api/allNote?${optionValue}=${searchBarValue}`);
    const searchValue = await searchedData.json();
    // console.log(searchValue);
    setSearchResult(searchValue);
    setLoaderAnimation(true);
    

  }




  return (


    <>
      <Navbar />
      <div className="note">
        <div className="note-intro">
          <div className="note-select">
            <select value={optionValue} onChange={(e) => option(e)} name="" id="">
              <option className='note-option'>filter</option>
              <option className='note-option'>chapter</option>
              <option className='note-option'>subject</option>

            </select>

          </div>
          <div className="note-search">
            <input value={searchBarValue} onChange={(e) => searchBar(e.target.value)} className='note-search-bar' type="text" placeholder='Search note' onBlur={() => {
              setTimeout(() => {
                setSuggestion([])
              }, 200)
            }} />
            <i onClick={search} class="fa-solid fa-magnifying-glass"></i>
            {suggestion && suggestion.map((suggestion, i) => {

              return (
                <div key={i} onClick={() => onSuggestionHandler(suggestion)} className="note-search-suggestion">
                  {suggestion}
                </div>
              );
            })}
          </div>
          
        </div>

        <div className="note-card-row">
          {loaderAnimation ? searchResult && searchResult.map((searchResult, i) => {
            let docUrl = `https://drive.google.com/file/d/`;
            let docMethod = `/view`
            return (
              <>

                <div key={i} className="note-card">
                <div className="note-card-subject">

                <h1>{searchResult.subject}</h1>
                </div>
                <div className="note-card-content">
                  <div className="note-card-content-1">
                    <img src="https://i.postimg.cc/fbvjMqxy/image-removebg-preview-4.png" alt="" srcset="" />
                  </div>
                  <div className="note-card-content-2">
                  
                    <h2>credit : {searchResult.credit}</h2>
                    <h3>{searchResult.fileSize}</h3>
                    <h4>{searchResult.fileType}</h4>
                    <a target='_blank' href=  {docUrl+searchResult.filePath+docMethod}>
                    <button>Download</button>
                    </a>
                  </div>
                </div>
                <div className="note-card-credit">
                  <h1>{searchResult.chapter}</h1>
                </div>
                  
                </div>
              </>
            )
          }) :<LoadingAnimation/> }
        </div>
        

      </div>


    </>
  )
}

export default Notes
