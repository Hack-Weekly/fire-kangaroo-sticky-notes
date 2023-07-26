import React from 'react'
import { PlusSquareFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Footer() {
  return (
    <footer>
      <Link style={{ 
          position: "fixed", bottom: "30px", right: "50px",
          color: "var(--text-200)"
      }} to="/add">
        <PlusSquareFill style={{ fontSize: "4rem" }} />
      </Link>
    </footer>
  )
}

export default Footer