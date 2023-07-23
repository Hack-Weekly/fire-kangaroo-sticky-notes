import React, { useState } from 'react'
import { Person } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '300px' }}>
      <div style={{ marginLeft: "40px" }}>Sticky Notes</div>
      <div>
        <Person onClick={() => setOpen(!open)} style={{ position: "relative", marginRight: "50px", fontSize: "1.5rem" }}></Person>
        {
          open && (
            <div style={{ position: "absolute", right: "37px" }} > {
              <ul style={{ listStyle: "none" }}>
                <li>
                  <Link style={{ textDecoration: "none", color: "black", fontSize: "0.8rem" }} to="/login">Login</Link>
                </li>
                <li>
                  <Link style={{ textDecoration: "none", color: "black", fontSize: "0.8rem" }} to="/signup">Signup</Link>
                </li>
                <li>
                  <Link style={{ textDecoration: "none", color: "black", fontSize: "0.8rem" }} to="/logout">Logout</Link>
                </li>
              </ul>
            }</div>
          )
        }

      </div>

    </div>
  )
}

export default Header


