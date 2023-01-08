import React, { useState } from 'react'
import { useEffect } from 'react'
import LoadingAnimation from './LoadingAnimation'
import Navbar from './Navbar'
function PYQ() {

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
      const pyqServerData = await fetch('https://exampedia-rest-api-production.up.railway.app/api/allPyq');
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
      if (optionValue === "faculty") {
        const pyqFacultyOptionData = serverValue.map((obj) => {

          return obj.faculty;
        })

        // console.log(pyqFacultyOptionData);

        const filteredPyqFacultyOptionData = pyqFacultyOptionData.filter((val, index) => pyqFacultyOptionData.indexOf(val) == index);

        // console.log(filteredPyqFacultyOptionData);
        setSearchKeyValueSuggestion(filteredPyqFacultyOptionData);
      }




    }
    loadOption()
    search()

  }, [optionValue,sortValue,searchBarValue])



  const option = (e) => {
    setOptionValue(e.target.value);
    // console.log(e.target.value);
  }

  const sort = (e) =>{
    if(e.target.value === 'Sort'){
      setSortValue('');
    }else{

      setSortValue(e.target.value);
      // console.log(e.target.value);
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
    // console.log(`${optionValue}=${searchBarValue}&examtype=${sortValue} is searched`);
    const searchedData = await fetch(`https://exampedia-rest-api-production.up.railway.app/api/allPyq?${optionValue}=${searchBarValue}&examtype=${sortValue}`);
    const searchValue = await searchedData.json();
    // console.log(searchValue);
    setSearchResult(searchValue)
    setLoaderAnimation(true);
    

  }




  return (


    <>
      <Navbar />
      <div className="pyq">
        <div className="pyq-intro">
          <div className="select">
            <select value={optionValue} onChange={(e) => option(e)} name="" id="">
              <option className='pyq-option'>filter</option>
              <option className='pyq-option'>faculty</option>
              <option className='pyq-option'>subject</option>

            </select>

          </div>
          <div className="pyq-search">
            <input value={searchBarValue} onChange={(e) => searchBar(e.target.value)} className='pyq-search-bar' type="text" placeholder='Search Pyq' onBlur={() => {
              setTimeout(() => {
                setSuggestion([])
              }, 200)
            }} />
            <i onClick={search} class="fa-solid fa-magnifying-glass"></i>
            {suggestion && suggestion.map((suggestion, i) => {

              return (
                <div key={i} onClick={() => onSuggestionHandler(suggestion)} className="pyq-search-suggestion">
                  {suggestion}
                </div>
              );
            })}
          </div>
          <div className="sorter">
            <div className="sort-bar">
              <div className="bar">
                <div className="bar-1"></div>
                <div className="bar-2"></div>
                <div className="bar-3"></div>
              </div>
              <select value={sortValue} onChange={(e)=>sort(e)} >
                <option >MID Term</option>
                <option >END Term</option>
              </select>

            </div>





          </div>
        </div>

        <div className="pyq-card-row">
          {loaderAnimation ? searchResult && searchResult.map((searchResult, i) => {
            let docUrl = `https://drive.google.com/file/d/`;
            let docMethod = `/view`
            return (
              <>

                <div key={i} className="pyq-card">
                <div className="pyq-card-subject">

                <h1>{searchResult.subject}</h1>
                </div>
                <div className="pyq-card-content">
                  <div className="pyq-card-content-1">
                    <img src="https://i.postimg.cc/gkzhftjX/sample-Pyq.jpg" alt="" srcset="" />
                  </div>
                  <div className="pyq-card-content-2">
                  <h1>{searchResult.examtype}</h1>
                    <h2>{searchResult.faculty}</h2>
                    <h3>{searchResult.fileSize}</h3>
                    <h4>{searchResult.fileType}</h4>
                    <a target='_blank' href={docUrl+searchResult.filePath+docMethod}>
                    <button>Download</button>
                    </a>
                  </div>
                </div>
                <div className="pyq-card-credit">
                  <h1>Credit : {searchResult.credit}</h1>
                </div>
                  
                </div>
              </>
            )
          }) :<LoadingAnimation/>}
        </div>


      </div>


    </>
  )
}

export default PYQ
