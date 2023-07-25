import React, { useState } from 'react';
import '../App.css'
import { useNavigate  } from 'react-router-dom';
import { Check, X } from 'react-bootstrap-icons';
import Header from "../components/Header";

function StickyNoteEdit({note_id}) {
  const [stickyNote, setStickyNote] = useState({
    title: '',
    text: '',
    color: "#ead23a",
  })

  const possibleColors = [
    // "#ead23a", // yellow
    "#c6af59", //yellow
    "#c16161", // red 
    "#c9824f", // orange
    "#346145", // green
    "#42798b", // blue
  ]


  const navigate = useNavigate(); // Initialize useNavigate


  function handleChange(e) {
    let {name, value} = e.target
    setStickyNote(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }


  function handleSubmit(e) {
    e.preventDefault()

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stickyNote),
      credentials: 'include'  
    })
    .then(res => res.json())
    .then(json => {
      if (json?.success) {
        console.log('Data saved', json)
        navigate("/")
      } else {
        // TODO: add alert / toast to say save failed
      }
    })
    .catch(error => {
      // TODO: add different error / alert / toast
      console.log(error)
    })
  }


  function handleCancel() {
    navigate('/')  
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
                required
                minLength="2"
                maxLength="16"
                placeholder='Title'
                value={stickyNote.title}
                onChange={handleChange}
              />

              <textarea 
                type="text"
                name="text" 
                maxLength="250"
                placeholder='Type something...'
                value={stickyNote.content}
                onChange={handleChange}
              />

              <div>
                <button className='save-button'>Save</button>
                <div className='colorSelections'>
                    {possibleColors.map(color => {
                      return <div key={color} className="color" style={{backgroundColor: color}} onClick={() => setStickyNote(x => ({...x, color: color}))}>{stickyNote.color === color && <Check style={{fontSize:"2.2rem", fill:"var(--text-100)"}}/>}</div>
                    })}
                </div>
                <button type='button' onClick={handleCancel} className='cancel-button'>Cancel</button>
              </div>

            </form>
          </section>
      </section>
    </>

  )
}

export default StickyNoteEdit