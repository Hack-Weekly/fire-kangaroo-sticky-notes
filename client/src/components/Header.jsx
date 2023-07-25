import React, { useState } from 'react'
import { PersonFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '300px', padding: "20px 0px 20px 0px ", backgroundColor: "var(--bg-300)" }}>
      <Link style={{ marginLeft: "40px", padding: "10px", color: "var(--text-200)", fontSize: "1.3rem", textDecoration: "none" }} to="/">Sticky Notes</Link>
      <div>
        <button style={{ position: "relative", marginRight: "75px", fontSize: "2.05rem", backgroundColor: "var(--bg-300)", borderRadius: "50%", backgroundColor: "var(--text-200)" }}><PersonFill style={{ paddingBottom: "6px" }} onClick={() => setOpen(!open)} ></PersonFill></button>
        {
          open && (
            <div>
              <div id="dropdown" ></div>
              <div style={{ position: "absolute", right: "45px", borderRadius: "15px", backgroundColor: "var(--text-200)", width: "110px" }} > {
                <ul style={{ listStyle: "none", fontSize: "2rem", fontWeight: "normal", fontFamily: "sans-serif", justifyItems: "center" }}>
                  <li>
                    <Link style={{ textDecoration: "none", color: "var(--bg-300)", fontSize: "1rem" }} to="/login">Login</Link>
                  </li>
                  <li>
                    <Link style={{ textDecoration: "none", color: "var(--bg-300)", fontSize: "1rem" }} to="/signup">Signup</Link>
                  </li>
                  <li>
                    <Link style={{ textDecoration: "none", color: "var(--bg-300)", fontSize: "1rem" }} to="/logout">Logout</Link>
                  </li>
                </ul>
              }</div>
            </div>

          )
        }

      </div>

    </div>
  )
}

export default Header


