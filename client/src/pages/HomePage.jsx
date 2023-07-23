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
        {/* <StickyNote text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut diam quam nulla porttitor massa id neque aliquam. Ac feugiat sed lectus vestibulum mattis ullamcorper. Amet est placerat in egestas erat imperdiet. At consectetur lorem donec massa sapien faucibus et." title="LOREM TITLE" lastModified="Last update: 27th April, 2023" /> */}
        { notes.map((n, i) => <StickyNote key={n._id} noteColor={addColorToNotes()} {...n}/>) }
      </main>
      <Footer />
    </>
  )
}

export default HomePage