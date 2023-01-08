import React, { useEffect, useState, useRef } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios'

function NoteUpload() {

  const [background, setBackground] = useState()
  const [color, setColor] = useState()
  const [toggle, setToggle] = useState(false)
  const [notesOn, setNotesON] = useState(false)
  const [pyqOn, setPyqON] = useState(true)
  const [para, setPara] = useState("flex")
  const [notesCard, setNotesCard] = useState("none")
  const [pyqCard, setPyqCard] = useState("none")
  const [subject, setSubject] = useState([])
  const [subjectSuggestion, setSubjectSuggestion] = useState('')
  const [suggestion, setSuggestion] = useState([])
  const [file, setFile] = useState([])
  const [credit, setCredit] = useState('')
  const [chapter,setChapter] = useState('')
  const [notesData, setNotesData] = useState()
  const [noteProgress, setNoteProgress] = useState(0)
  const [notesMsg, setNotesMsg] = useState('')
  const [formData,setFormData]=('not-allowed')

  useEffect(() => {
    const loadSubject = async () => {
      const subjectNoteFetch = await fetch('https://exampedia-rest-api.onrender.com/api/allNote')
      const subjectNoteData = await subjectNoteFetch.json()
      let myNoteSubjectData = subjectNoteData.map((obj) => {
        return obj.subject
      })
      const filteredSuggestion = myNoteSubjectData.filter((val, index) => myNoteSubjectData.indexOf(val) == index);

      // console.log(filteredSuggestion)
      // console.log(myNoteSubjectData);
      setSubject(filteredSuggestion)

      if(file && credit && suggestion ){
        // setFormData('')
      }


    }
    loadSubject();

  }, [])

  const onSuggestionHandler = (subjectSearched) => {
    setSubjectSuggestion(subjectSearched)
    setSuggestion([]);

  }



  const onChangeHandler = (subjectSearched) => {


    let subjectMatches = []
    if (subjectSearched.length > 0) {
      subjectMatches = subject.filter(ele => {
        let regex = new RegExp(subjectSearched, "gi");

        return ele.match(regex);
      })
    }
    // console.log(subjectMatches);

    setSuggestion(subjectMatches)

    // console.log(subjectSearched);
    setSubjectSuggestion(subjectSearched)
  }

  const ref = useRef();

  const reset = () => {
    ref.current.value = "";
  };


  const pyqButtonON = () => {
    console.log("pyq accesed");
    setPyqON(true)
    setBackground("")
    setPara("none")
    setColor("")
    setNotesON(false)
    setNotesCard("none")
    setPyqCard("flex")
  }
  const notesButtonON = () => {
    console.log("notes accesed");
    setPyqON(false)
    setNotesON(true)
    setPara("none")
    setPyqCard("none")
    setNotesCard("flex")

  }

  const notesFile = (e) => {
    setNoteProgress(0)
    setNotesMsg('');
    let filePath = e.target.files[0];
    setFile(filePath)



  }
  const creditName = (e) => {
    setNoteProgress(0)
    setNotesMsg('');
    let creditname = e.target.value;
    setCredit(creditname)

  }
  const chapterName = (e) => {
    setNoteProgress(0)
    setNotesMsg('');
    let chaptername = e.target.value;
    setChapter(chaptername)
    // console.log(chapter);

  }
  //  const notesUpload = async (e) =>{
  //   setNoteProgress(0)
  //   e.preventDefault()
  //   console.log(subjectSuggestion)
  //   console.log(file);
  //   console.log(credit);
  //   const formdata =  new FormData();
  //   formdata.append('file',file);
  //   formdata.append('credit',credit);
  //   formdata.append('subject',subjectSuggestion);
  //   try {
  //     await axios.post('http://localhost:4000/api/note/upload/', formdata,noteUploadOptions);
  //     setNotesMsg('File Upload successfully');
  //     setFile([]);
  //     setCredit('');
  //     setSubjectSuggestion('')


  // } catch (error) {
  //   setNotesMsg(error);
  //     throw error;
  // }
  //  }

  const notesUpload = async (e) => {
    setNoteProgress(0)
    e.preventDefault()
    // console.log(subjectSuggestion)
    // console.log(file);
    // console.log(credit);
    // console.log(chapter);
    // {subjectSuggestion && file && credit}
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('credit', credit);
    formdata.append('chapter', chapter);
    formdata.append('subject', subjectSuggestion);
    try {
      const response = await axios.post('https://exampedia-rest-api-production.up.railway.app/api/note/upload/', formdata, noteUploadOptions);
      setNotesMsg('File Upload successfully');
      reset()
      // setFile([]);
      setCredit('');
      setChapter('');
      console.log(credit);
      setSubjectSuggestion('');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        setNotesMsg(`Error: ${error.response.data}`);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        setNotesMsg('Error: No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        setNotesMsg(`Error: ${error.message}`);
      }
      console.log(error.config);
    }
  }

  const noteUploadOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setNoteProgress(percentage);
    }
  }



  return (
    <>
      
      <Navbar />

      <div className="upload">

        <div className="upload-menu">

          

          <NavLink exact to="/upload/notes">
            <button onClick={notesButtonON}  className='upload-menu-notes'>Notes</button>

          </NavLink>

          <NavLink exact to="/upload/pyq">
            <button onClick={pyqButtonON} style={{
              background: "rgb(173, 160, 160)",
              color: "black"
            }} className='upload-menu-pyq'>Pyq</button>

          </NavLink>

        </div>




      

      <div className="upload">
        
        

        <div  className="upload-notes">
          <form onSubmit={(e) => notesUpload(e)} className='notes-upload-form' >







            <label className='select-notes-container' for="Select Notes">
              <img src="https://i.postimg.cc/fLbNF8mc/ezgif-com-gif-maker-3.gif" alt="" srcset="" />
              <p>doc allowed but recommended Pdf file</p>
              <div className="select-notes-button">


                <input ref={ref} className='select-files' type="file" name="notes" id="Select Notes" required accept=".doc,.docx,.pdf,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => notesFile(e)} />


              </div>
            </label>

            <input className='note-text-input' value={credit} placeholder='Enter Your Name for credit' required type="text" name="credit" id="" onChange={(e) => creditName(e)} />
            <input className='note-text-input' value={chapter} placeholder='Enter Chapter Name ' required type="text" name="credit" id="" onChange={(e) => chapterName(e)} />

            <input className='note-text-input' onChange={e => onChangeHandler(e.target.value)} value={subjectSuggestion} placeholder='Enter subject name' required type="text" name="subject" id="" onBlur={() => {
              setTimeout(() => {
                setSuggestion([])
              }, 200)
            }} />

            {suggestion && suggestion.map((suggestion, i) => {

              return (
                <div key={i} onClick={() => onSuggestionHandler(suggestion)} className="suggestion">
                  {suggestion}
                </div>
              );
            })}

            <div className="note-submit">
              <button type='submit'  name="Upload" id="" >Upload</button>



            </div>

            <CircularProgressbar className='note-circular-progress'
              value={noteProgress}
              text={`${noteProgress}%`}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: 'butt',
                textSize: '20px',
                pathTransitionDuration: 0.5,
                pathColor: `rgba(29, 15, 74, 1, ${noteProgress / 100})`,
                textColor: 'rgba(29, 15, 74, 1)',
                trailColor: 'rgba(182, 51, 118, 1)',
                backgroundColor: 'rgba(29, 15, 74, 1)',
              })}
            />
            <h1 className="note-submit-message" >{notesMsg}</h1>


          </form>
        </div>
        
      </div>






      </div>
      <Footer/>

    </>
  )
}

export default NoteUpload
