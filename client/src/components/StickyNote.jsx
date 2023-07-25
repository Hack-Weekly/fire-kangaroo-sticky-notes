import React from 'react'
import { XLg, PencilSquare } from 'react-bootstrap-icons';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function StickyNote(props) {

  const navigate = useNavigate(); // Initialize useNavigate
  let [title, setTitle] = useState(props.title)
  let [text, setText] = useState(props.text)
  let [color, setColor] = useState(props.color)
  let [lastModified, setLastModified] = useState(props.lastModified)

  const handleDoubleClick = (e) => {
    navigate(`/edit/${props.noteId}`)
  }

  const handleEditClick = (e) => {
    navigate(`/edit/${props.noteId}`)
  }

  const handleDelete = async (e) => {
    e.stopPropagation();
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
    backgroundColor: `${color}`,
    boxShadow: `10px 8px 0px 4px ${color}88`,
  }

  return (
    <div onDoubleClick={handleDoubleClick} style={noteStyle} className={`sticky-note large-content}`}>
      <XLg className='xlgIcon' onClick={handleDelete} />
      <PencilSquare className='editIcon' onClick={handleEditClick} />
      <div className="sticky-note-title-container">
        <h1 className="sticky-note-title">{title}</h1>
      </div>
      {/* <h3>{lastModified}</h3> */}
      
      <p className="sticky-note-text">{text}</p>
    </div>
  )
}

export default StickyNote