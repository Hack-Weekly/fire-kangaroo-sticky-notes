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
        { notes.map((n, i) => <StickyNote key={n._id} noteId={n._id} color={n.color} {...n}/>) }
      </main>
      <Footer />
    </>
  )
}

export default HomePage;

