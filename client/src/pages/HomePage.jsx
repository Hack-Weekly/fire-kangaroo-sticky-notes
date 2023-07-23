import React from 'react'
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyNote from "../components/StickyNote";

function HomePage(props) {

  const data = [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut diam quam nulla porttitor massa id neque aliquam. Ac feugiat sed lectus vestibulum mattis ullamcorper. Amet est placerat in egestas erat imperdiet. At consectetur lorem donec massa sapien faucibus et.",
      title: "LOREM TITLE",
      lastModified: "Last update: 27th April, 2023"
    },
    {
      text: "Lorem ipsum dolor sit t diam lamcorper. Amet est placerat in egestas erat imperdiet. At consectetur lorem donec massa sapien faucibus et.",
      title: "Another Title",
      lastModified: "Last update: 1st May, 2023"
    },
    {
      text: "Yet another text...",
      title: "Yet Another Title",
      lastModified: "Last update: 15th May, 2023"
    },
    {
      text: "One more text...",
      title: "One More Title",
      lastModified: "Last update: 10th June, 2023"
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut diam quam nulla porttitor massa id neque aliquam. Ac feugiat sed lectus vestibulum mattis ullamcorper. Amet est placerat in egestas erat imperdiet. At consectetur lorem donec massa sapien faucibus et.",
      title: "LOREM TITLE",
      lastModified: "Last update: 27th April, 2023"
    },
    
  ];

  let [notes, setNotes] = useState(data)

  const addColorToNotes = () => {
    let arrColors = ['green', 'cyan', 'red', 'orange']
    let randomColor = arrColors[Math.ceil(Math.random() * arrColors.length-1)]
    return randomColor
  }

  const handleAddNote = (note) => {
    setNotes([...notes, note])
  }

  return (
    <>
      <Header />
      <main>
        {/* <StickyNote text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut diam quam nulla porttitor massa id neque aliquam. Ac feugiat sed lectus vestibulum mattis ullamcorper. Amet est placerat in egestas erat imperdiet. At consectetur lorem donec massa sapien faucibus et." title="LOREM TITLE" lastModified="Last update: 27th April, 2023" /> */}
        { notes.map((n, i) => <StickyNote key={i} noteColor={addColorToNotes()} {...n}/>) }
      </main>
      <Footer />
    </>
  )
}

export default HomePage