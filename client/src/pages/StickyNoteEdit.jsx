import React, { useState } from 'react';
import '../App.css'
import { useNavigate  } from 'react-router-dom';
import { Check } from 'react-bootstrap-icons';
import Header from "../components/Header";

function StickyNoteEdit({note_id}) {
  const [stickyNote, setStickyNote] = useState({
    title: '',
    text: '',
  })


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

  // Convert RGB color to hexadecimal
  function rgbToHex(rgb) {
    const rgbArray = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + ((1 << 24) + (parseInt(rgbArray[1]) << 16) + (parseInt(rgbArray[2]) << 8) + parseInt(rgbArray[3])).toString(16).slice(1);
  }

  // set note color
  function setNoteColor(e) {
    const bgColor = e.target.style.backgroundColor
    setStickyNote(previousValue => ({
      ...previousValue, color: rgbToHex(bgColor)
    }))
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

              <div>
                <button className='save-button'>Save</button>
                <div className='colorSelections'>
                    <div className="color" style={{backgroundColor: "#c16161"}} onClick={setNoteColor}>{stickyNote.color === '#c16161' && <Check style={{fontSize:"2.2rem", fill:"#f8c4c4"}} />}</div>
                    <div className="color" style={{backgroundColor: "#c9824f"}} onClick={setNoteColor}>{stickyNote.color === '#c9824f' && <Check style={{fontSize:"2.2rem", fill:"#f8d8c0"}} />}</div>
                    <div className="color" style={{backgroundColor: "#346145"}} onClick={setNoteColor}>{stickyNote.color === '#346145' && <Check style={{fontSize:"2.2rem", fill:"#8FBF9F"}} />}</div>
                    <div className="color" style={{backgroundColor: "#42798b"}} onClick={setNoteColor}>{stickyNote.color === '#42798b' && <Check style={{fontSize:"2.2rem", fill:"#A5DAEB"}} />}</div>
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