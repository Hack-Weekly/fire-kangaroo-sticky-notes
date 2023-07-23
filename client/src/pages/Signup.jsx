import React from 'react'
import Header from "../components/Header";
import { Github, Google, Check } from 'react-bootstrap-icons';

function Signup() {
  let github_url = `${process.env.REACT_APP_BACKEND_URL}/auth/github`
  let google_url = `${process.env.REACT_APP_BACKEND_URL}/auth/google`

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <>
    <Header />
    <main className='center'>
      <div className='cover'>
        <h1 className='font-monospace'>SIGN UP</h1>

        <div className="input-group">
           <form action="">
           <input type='text' placeholder='Email'/>
          <input type='password' placeholder='Password' />
          <input type='password' placeholder='Confirm Password' />
           </form>

        </div>
        <button onClick={handleSubmit} className='login-btn'>Sign Up</button>

        <p className='text'>Or sign up using</p>
        <div className='alt-login'>
         <a href={github_url}><Github size={32} color="white" /></a>
         <a href={google_url}><Google size={32} color="#D24F40"/></a>
        </div>
      </div>
    </main>
  </>
  )
}

export default Signup