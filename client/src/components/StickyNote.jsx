import React from 'react'
import { XLg } from 'react-bootstrap-icons';
import { useState } from 'react'
import { useNavigate  } from 'react-router-dom';


function StickyNote(props) {

  const navigate = useNavigate(); // Initialize useNavigate
  let [title, setTitle] = useState(props.title)
  let [text, setText] = useState(props.text)
  let [color, setColor] = useState(props.color || "EAD23A")
  let [lastModified, setLastModified] = useState(props.lastModified)

  const handleDelete = async (e) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: props.noteId }),
      credentials: 'include'  
    })
    .then(res => res.json())
    .then(json => console.log(json))

    navigate("/");
  }

  const noteStyle = {
    backgroundColor: `#${color}`,
    boxShadow: `10px 8px 0px 4px #${color}88`,
  }

  return (
    <div style={noteStyle} className={`sticky-note large-content}`}>
      <div>
        <h1>{title}</h1>
        <XLg onClick={handleDelete} style={{fontSize:"2.2rem", fill:"var(--error)"}} />
      </div>
      <h3>{lastModified}</h3>
      <p>{text}</p>
    </div>
  )
}

export default StickyNote