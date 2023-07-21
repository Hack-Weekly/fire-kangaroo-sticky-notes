import React from 'react'
import '../App.css'
import Header from "../components/Header";

function StickyNoteEdit() {
  return (
    <>
      <Header />
      <section className='edit-section'>
        <div className='nav-buttons'></div>
          <section>
            <form action="">
              <input type="text" name='title' placeholder='Title'/>
              <textarea name='title' placeholder='Type something...'/>
              <button className='save-button'>Save</button>
            </form>
            <button className='cancel-button'>Cancel</button>
          </section>
      </section>
    </>

  )
}

export default StickyNoteEdit