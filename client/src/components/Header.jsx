import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { PersonFill } from 'react-bootstrap-icons';
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
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

  const logoutClickHandler = (e) => {
    setOpen(false)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/logout`, {}, {withCredentials: true})
      .then((res) => {
        navigate("/")
      })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", letterSpacing: 1, fontWeight: 800, padding: "20px 0px 20px 0px ", backgroundColor: "var(--bg-300)" }}>
      <Link style={{ marginLeft: "30px", color: "var(--text-200)", fontSize: "2rem", textDecoration: "none" }} to="/">Sticky Notes</Link>
      <div style={{ zIndex: 99999 }}>
        <PersonFill onClick={() => setOpen(!open)} style={{
          display: "flex", justifyContent: "center", alignItems: "center",
          border: 'none', borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem",
          marginRight: "45px", padding: "0.25rem",
          width: "8rem", fontSize: "2.5rem",
          backgroundColor: "var(--text-200)" }}>
        </PersonFill>
        {
          open && (
            <div >
              <div id="dropdown" ></div>
              <div style={{ borderBottomLeftRadius: "0.5rem", borderBottomRightRadius: "0.5rem", position: "absolute",  backgroundColor: "var(--text-200)", width: "8rem" }} > {
                <div style={{ fontFamily: "monospace", marginTop: "1rem", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "1rem", padding: "0.5rem", textAlign: "center"}}>
                  <Link className="dropdown-item" to="/login">Login</Link>
                  <Link className="dropdown-item" to="/signup">Sign up</Link>
                  <Link className="dropdown-item" onClick={logoutClickHandler}>Logout</Link>
                </div>
              }</div>
            </div>

          )
        }

      </div>

    </div>
  )
}

export default Header


