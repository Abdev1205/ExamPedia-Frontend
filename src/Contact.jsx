import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios'
function Contact() {
  const [noteProgress, setNoteProgress] = useState(0)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [feedback,setFeedback] = useState('')
  const [notesMsg, setNotesMsg] = useState('')

  const userName = (e) =>{
    setNoteProgress(0)
    setNotesMsg('');
    setName(e.target.value);
    // console.log(name);
  }

  const userEmail = (e) =>{
    setNoteProgress(0)
    setNotesMsg('');
    setEmail(e.target.value);
    // console.log(email);
  }
  const userFeedback = (e) =>{
    setNoteProgress(0)
    setNotesMsg('');
    setFeedback(e.target.value);
    // console.log(feedback);
  }


  const contactUpload = async (e) =>{
    e.preventDefault();
    const formdata = new FormData;
    formdata.append('userName',name);
    formdata.append('userEmail',email);
    formdata.append('userFeedback',feedback);

    
    try {
      const response = await axios.post('https://tired-jewelry-cod.cyclic.app/api/feedback/upload', formdata, noteUploadOptions);
      setNotesMsg('Thanks For Feedback');
      
      setName('');
      setEmail('');
      setFeedback('')
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
    <Navbar/>
        <div className="contact">
          <form onSubmit={(e) => contactUpload(e)} className="contact-content-1">
          <input value={name} onChange={(e)=>userName(e)} required placeholder='Enter Your Name' type="text" name="" id="" />
          <input value={email} onChange={(e)=>userEmail(e)} required placeholder='Enter Your Email' type="email" name="" id="" />
          <textarea value={feedback} onChange={(e)=>userFeedback(e)} required name="" id=""  rows="5"></textarea>
          <button type='submit'  name="Upload" id="" >Submit</button>
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

          <div className="contact-content-2">
            <img src="https://i.postimg.cc/KvSxFbJF/ezgif-com-gif-maker-8.gif" alt="" srcset="" />
          </div>
          
        </div>
    </>
  )
}

export default Contact
