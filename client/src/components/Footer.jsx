import React from 'react'
import { FilePlusFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
// add react add-icon and add route to StickyNoteEdit page
function Footer() {
  return (
    <Link to="/edit"><FilePlusFill style={{size: "1.5rem", display:"flex", justifyItems:"right"}} /></Link>
  )
}

export default Footer