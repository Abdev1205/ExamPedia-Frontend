import React, { useEffect, useState, useRef } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';
import NoteUpload from './NoteUpload';
import PyqUpload from './PyqUpload';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios'

function Upload() {
  const [background, setBackground] = useState()
  const [color, setColor] = useState()
  const [toggle, setToggle] = useState(false)
  const [notesOn, setNotesON] = useState(true)
  const [pyqOn, setPyqON] = useState(false)
  const [para, setPara] = useState("flex")
  const [notesCard, setNotesCard] = useState("none")
  const [pyqCard, setPyqCard] = useState("none")
  const [subject, setSubject] = useState([])
  const [subjectSuggestion, setSubjectSuggestion] = useState('')
  const [suggestion, setSuggestion] = useState([])
  const [file, setFile] = useState([])
  const [credit, setCredit] = useState('')
  const [notesData, setNotesData] = useState()
  const [noteProgress, setNoteProgress] = useState(0)
  const [notesMsg, setNotesMsg] = useState('')
  const [display, setDisplay] = useState('')

  useEffect(() => {
    const loadSubject = async () => {
      const subjectNoteFetch = await fetch('http://localhost:4000/api/allNote')
      const subjectNoteData = await subjectNoteFetch.json()
      let myNoteSubjectData = subjectNoteData.map((obj) => {
        return obj.subject
      })
      const filteredSuggestion = myNoteSubjectData.filter((val, index) => myNoteSubjectData.indexOf(val) == index);

      // console.log(filteredSuggestion)
      // console.log(myNoteSubjectData);
      setSubject(filteredSuggestion)
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
    setNotesCard("none")
    setPyqON(true)
    setBackground("")
    setPara("none")
    setColor("")
    setNotesON(false)
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

  const notesUpload = async (e) => {
    setNoteProgress(0)
    e.preventDefault()
    console.log(subjectSuggestion)
    console.log(file);
    console.log(credit);
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('credit', credit);
    formdata.append('subject', subjectSuggestion);
    try {
      const response = await axios.post('http://localhost:4000/api/note/upload/', formdata, noteUploadOptions);
      setNotesMsg('File Upload successfully');
      reset()
      // setFile([]);
      setCredit('');
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
        <div className="upload-intro">
          <h1 style={{
            display: para
          }}>Upload</h1>
          <p style={{
            display: para
          }} >Join our community of learners and share your knowledge with others. Upload your notes and previous year questions now and help fellow students succeed in their studies. Plus, you'll have the satisfaction of knowing you're making a positive impact on others' education.</p>
        </div>
        <img className='upload-image-wrapper' style={{
          display: para
        }} src="https://i.postimg.cc/4d5ZdK0W/ezgif-com-gif-maker-2.gif" alt="" srcset="" />

        <div className="upload-menu">

          <NavLink exact to="/upload/notes">
            <button onClick={notesButtonON} style={{
              background: notesOn ? background : "rgb(173, 160, 160)",
              color: notesOn ? color : "black"
            }} className='upload-menu-notes'>Notes</button>

          </NavLink>

          <NavLink exact to="/upload/pyq">
            <button onClick={pyqButtonON} style={{
              background: pyqOn ? background : "rgb(173, 160, 160)",
              color: pyqOn ? color : "black"
            }} className='upload-menu-pyq'>Pyq</button>

          </NavLink>

        </div>




      </div>






      <Footer />

    </>
  )
}

export default Upload
