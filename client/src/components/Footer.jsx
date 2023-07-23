import React from 'react'
import { FilePlusFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
// add react add-icon and add route to StickyNoteEdit page
function Footer() {
  return (
    <Link style={{position:"fixed", bottom:"30px", right:"50px", color:"grey"}} to="/edit"><FilePlusFill style={{fontSize:"3rem"}} /></Link>
  )
}

export default Footer