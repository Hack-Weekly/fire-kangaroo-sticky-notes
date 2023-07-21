import React, { useState } from 'react';
import '../App.css'
import Header from "../components/Header";

function StickyNoteEdit({note_id}) {
  const [stickyNote, setStickyNote] = useState({
    title: '',
    text: ''
  })


  function handleChange(e) {
    console.log(e)
    let {name, value} = e.target
    setStickyNote({
      ...stickyNote,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    console.log("HANDLE SUBMIT")

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stickyNote)
    })
    .then(res => res.json())
    .then(data => {
      console.log('Data saved', data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <>
      <Header />
      <section className='edit-section'>
        <div className='nav-buttons'></div>
          <section>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name='title' 
                placeholder='Title'
                value={stickyNote.title}
                onChange={handleChange}
              />

              <textarea 
                type="text"
                name="text" 
                placeholder='Type something...'
                value={stickyNote.content}
                onChange={handleChange}
              />

              <button className='save-button'>Save</button>
            </form>
            <button className='cancel-button'>Cancel</button>
          </section>
      </section>
    </>

  )
}

export default StickyNoteEdit