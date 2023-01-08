import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Home'
import About from './About'
import Upload from './Upload'
import PYQ from './PYQ'
import Notes from './Notes'
import Contact from './Contact'
import NoteUpload from './NoteUpload';
import PyqUpload from './PyqUpload';
import LoadingAnimation from './LoadingAnimation';
function App() {
  return (
    <>
    <Routes>
      <Route  path='/' element={<Home/>} />
      <Route  path='/about' element={<About/>} />
      <Route  path='/contact' element={<Contact/>} />
      <Route  path='/upload' element={<Upload/>} />
      <Route  path='/pyq' element={<PYQ/>} />
      <Route  path='/notes' element={<Notes/>} />
      <Route  path='/upload/notes' element={<NoteUpload/>} />
      <Route  path='/upload/pyq' element={<PyqUpload/>} />
      <Route  path='/loader' element={<LoadingAnimation/>} />
    </Routes>
    </>
  )
}

export default App
