import React from 'react'
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyNote from "../components/StickyNote";

function HomePage(props) {

  const notes = useLoaderData();

  const addColorToNotes = () => {
    let arrColors = ['green', 'cyan', 'red', 'orange']
    let randomColor = arrColors[Math.ceil(Math.random() * arrColors.length-1)]
    return randomColor
  }

  return (
    <>
      <Header />
      <main>
        { notes.map((n, i) => <StickyNote key={n._id} noteId={n._id} noteColor={addColorToNotes()} {...n}/>) }
      </main>
      <Footer />
    </>
  )
}

export default HomePage