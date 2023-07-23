import React, { useState } from 'react'
import { PersonFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '300px', padding: "20px 0px 20px 0px ", backgroundColor: "var(--bg-300)" }}>
      <Link style={{ marginLeft: "40px", padding: "10px", color: "var(--text-200)", fontSize: "1.3rem", textDecoration: "none" }} to="/">Sticky Notes</Link>
      <div>
        <PersonFill onClick={() => setOpen(!open)} style={{ position: "relative", marginRight: "50px", fontSize: "2.5rem", backgroundColor: "var(--bg-300)", borderRadius: "50%", backgroundColor: "var(--text-200)" }}></PersonFill>
        {
          open && (
            <div style={{ position: "absolute", right: "45px" }} > {
              <ul style={{ listStyle: "none", fontSize: "3rem", fontWeight: "bolder" }}>
                <li>
                  <Link style={{ textDecoration: "none", color: "var(--text-200)", fontSize: "0.8rem", }} to="/login">Login</Link>
                </li>
                <li>
                  <Link style={{ textDecoration: "none", color: "var(--text-200)", fontSize: "0.8rem" }} to="/signup">Signup</Link>
                </li>
                <li>
                  <Link style={{ textDecoration: "none", color: "var(--text-200)", fontSize: "0.8rem" }} to="/logout">Logout</Link>
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


