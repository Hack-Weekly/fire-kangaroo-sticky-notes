import React, { useState, useEffect } from 'react';
import '../App.css'
import { useNavigate  } from 'react-router-dom';
import { Check } from 'react-bootstrap-icons';
import Header from "../components/Header";
import { useParams } from "react-router-dom";

function StickyNoteEdit() {
  const { id } = useParams();
  const [noteId, setNoteId] = useState(id || null);
  const [stickyNoteData, setStickyNoteData] = useState({
    title: '',
    text: '',
    color: "#ead23a",
  })

  useEffect(() => {
      if (noteId !== null) {
        let fetchData = async () => { 
          return await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/note/${noteId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          })
        }
        fetchData()
          .then(res => res.json())
          .then(json => {setStickyNoteData({title: json.title, text: json.text, color: json.color})})
      }
      
  }, [noteId])

  const possibleColors = [
    "#c6af59", //yellow
    "#c16161", // red 
    "#c9824f", // orange
    "#346145", // green
    "#42798b", // blue
  ]


  const navigate = useNavigate(); // Initialize useNavigate


  function handleChange(e) {
    let {name, value} = e.target
    setStickyNoteData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }


  function handleSubmit(e) {
    e.preventDefault()

    if (noteId !== null) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/edit/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stickyNoteData),
        credentials: 'include'  
      })
      .then(res => res.json())
      .then(json => {
        if (json?.success) {
          console.log('Sticky note edited', json)
          navigate("/")
        } else {
          // TODO: add alert / toast to say edit failed
        }
      })
      .catch(error => {
        // TODO: add different error / alert / toast
        console.log(error)
      })

    } else {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stickyNoteData),
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
                value={stickyNoteData.title}
                onChange={handleChange}
              />

              <textarea 
                type="text"
                name="text" 
                maxLength="250"
                placeholder='Type something...'
                value={stickyNoteData.text}
                onChange={handleChange}
              />

              <div>
                <button className='save-button'>Save</button>
                <div className='colorSelections'>
                    {possibleColors.map(color => {
                      return <div key={color} className="color" style={{backgroundColor: color}} onClick={() => setStickyNoteData(x => ({...x, color: color}))}>{stickyNoteData.color?.toLowerCase() === color && <Check style={{fontSize:"2.2rem", fill:"var(--text-100)"}}/>}</div>
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