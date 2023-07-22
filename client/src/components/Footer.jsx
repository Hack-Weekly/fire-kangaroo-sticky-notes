import React from 'react'
import { FilePlusFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
// add react add-icon and add route to StickyNoteEdit page
function Footer() {
  return (
    <Link style={{position:"absolute", bottom:"0px", right:"50px", color:"grey"}} to="/edit"><FilePlusFill style={{fontSize:"2.5rem"}} /></Link>
  )
}

export default Footer