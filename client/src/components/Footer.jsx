import React from 'react'
import { PlusSquareFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Link style={{ position: "fixed", bottom: "30px", right: "50px", color: "var(--text-200)", }} to="/add"><PlusSquareFill style={{ fontSize: "3rem" }} /></Link>
  )
}

export default Footer