import React, { useState } from 'react'
import { Person } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{display:'flex', justifyContent:'space-between', fontWeight:'200px' }}>
      <div style={{marginLeft:"20px"}}>Sticky Notes</div>
      <Person style={{position:"relative", marginRight:"20px"}}/>
      {
        open && (
          <div style={{marginRight:"20px",position:"absolute"}} onClick={() => setOpen(!open)}> {
            <ul>
              <li>
              <Link to="/login">Login</Link>
              </li>
              <li>
              <Link to="/signup">Signup</Link>
              </li>
              <li>
              <Link to="/logout">Logout</Link>
              </li>
            </ul>
          }</div>
        )
      }
      
    </div>
  )
}

export default Header