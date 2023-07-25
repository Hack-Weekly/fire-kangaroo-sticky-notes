import React from 'react'
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyNote from "../components/StickyNote";

function HomePage() {

  const notes = useLoaderData();

  return (
    <>
      <Header />
      <main>
        {notes.length > 0 ? (
          notes.map((note) => (
            <StickyNote
              key={note._id}
              noteId={note._id}
              title={note.title}
              color={note.color}
              text={note.text}
            />
          ))
        ) : (
          <div style={{ color: "var(--text-100)" }}>
            No sticky notes yet. Click the button in the footer to add one!
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

export default HomePage;

