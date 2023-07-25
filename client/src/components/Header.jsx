import React, { useState, useEffect } from 'react'
import { PersonFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false)
  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  // const checkAuthentication = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/google`)
  //     const data = await response.json()
  //     setIsLoggedIn(data.isAuthenticated)
  //   } catch (error) {
  //     console.log('Error checking authentication:', error)
  //   }
  // }

  // useEffect(() => {
  //   checkAuthentication()
  // }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '300px', padding: "20px 0px 20px 0px ", backgroundColor: "var(--bg-300)" }}>
      <Link style={{ marginLeft: "40px", padding: "10px", color: "var(--text-200)", fontSize: "1.3rem", textDecoration: "none" }} to="/">Sticky Notes</Link>
      <div>
        <button onClick={() => setOpen(!open)} style={{ display: "flex", justifyContent:"center", alignItems:"center", border: 'none', marginRight: "75px", fontSize: "2rem", width: "50px", height: "50px", borderRadius: "100%", backgroundColor: "var(--text-200)" }}><PersonFill></PersonFill></button>
        {
          open && (
            <div>
              <div id="dropdown" ></div>
              <div style={{ position: "absolute", right: "45px", borderRadius: "15px", backgroundColor: "var(--text-200)", width: "110px" }} > {
                <ul style={{ listStyle: "none", fontSize: "3rem", fontWeight: "normal", fontFamily: "sans-serif", justifyItems: "center" }}>
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


