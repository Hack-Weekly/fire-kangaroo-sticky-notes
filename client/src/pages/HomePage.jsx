// import React from 'react'
// import { useState } from "react";
// import { useLoaderData } from "react-router-dom";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import StickyNote from "../components/StickyNote";

// function HomePage() {

//   const notes = useLoaderData();

//   return (
//     <>
//       <Header />
//       <main>
//         { notes.map((n, i) => <StickyNote key={n._id} noteId={n._id} color={n.color} {...n}/>) }
//       </main>
//       <Footer />
//     </>
//   )
// }

import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyNote from "../components/StickyNote";

function HomePage() {
  const [notes, setNotes] = useState([]);

  const addStickyNote = () => {
    setNotes([...notes, { _id: notes.length + 1, color: "yellow", text: "New sticky note" }]);
  };

  const removeStickyNote = (noteId) => {
    setNotes(notes.filter((note) => note._id !== noteId));
  };

  return (
    <>
      <Header />
      <main>
        {notes.length > 0 ? (
          notes.map((note) => (
            <StickyNote
              key={note._id}
              noteId={note._id}
              color={note.color}
              text={note.text}
              onRemove={() => removeStickyNote(note._id)}
            />
          ))
        ) : (
          <div>No sticky notes yet. Click the button in the footer to add one!</div>
        )}
      </main>
      <Footer onAddNote={addStickyNote} />
    </>
  );
}

export default HomePage;

