import React from 'react'
import { useState } from 'react'

function StickyNote(props) {
  let [title, setTitle] = useState(props.title)
  let [text, setText] = useState(props.text)
  return (
    <div className="sticky-note border border-black text-white">
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  )
}

export default StickyNote