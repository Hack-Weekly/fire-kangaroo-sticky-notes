import React from 'react'
import { PlusSquareFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
// add react add-icon and add route to StickyNoteEdit page
function Footer() {
  return (
    <Link style={{ position: "fixed", bottom: "30px", right: "50px", color: "var(--text-200)", }} to="/edit"><PlusSquareFill style={{ fontSize: "3rem" }} /></Link>
  )
}

export default Footer