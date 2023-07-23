import React from 'react'
import { XLg } from 'react-bootstrap-icons';
import { useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import { Link } from "react-router-dom";



function StickyNote(props) {

  const navigate = useNavigate(); // Initialize useNavigate
  let [title, setTitle] = useState(props.title)
  let [text, setText] = useState(props.text)
  let [lastModified, setLastModified] = useState(props.lastModified)

  const addColorToXLIcon = (noteColor) => {
    let arrColors = ['#8FBF9F', '#A5DAEB', '#f8c4c4', '#f8d8c0']
    let xLColor = ''
    switch (noteColor) {
      case 'green':
        xLColor = arrColors[0]
        break;
      case 'cyan':
        xLColor = arrColors[1]
        break;
      case 'orange':
        xLColor = arrColors[2]
        break;
      default:
        xLColor = arrColors[3]
        break;
    }
    return xLColor
  }

  let xLColor = addColorToXLIcon(props.noteColor)

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

  return (
    <div className={`sticky-note large-content ${props.noteColor}`}>
      <div>
        <h1>{title}</h1>
        <XLg onClick={handleDelete} style={{fontSize:"2.2rem", fill:xLColor}} />
      </div>
      <h3>{lastModified}</h3>
      <p>{text}</p>
    </div>
  )
}

export default StickyNote