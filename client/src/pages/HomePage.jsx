import React from 'react'
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyNote from "../components/StickyNote";

function HomePage(props) {

  let [notes, setNotes] = useState([])

  const handleAddNote = (note) => {
    setNotes([...notes, note])
  }

  return (
    <>
      <Header />
      <main>
        <StickyNote text="Lorem ipsum" title="LOREM TITLE" />
        { notes.map(n => <StickyNote {...n}/>) }
      </main>
      <Footer />
    </>
  )
}

export default HomePage