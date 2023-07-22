import React from 'react';
import Header from '../components/Header';
import { Github, Google } from 'react-bootstrap-icons';

function Login() {
  let github_url = `${process.env.REACT_APP_BACKEND_URL}/auth/github`
  let google_url = `${process.env.REACT_APP_BACKEND_URL}/auth/google`
  return (
    <>
      <Header />
      <main className='center'>
        <div className='cover'>
          <h1>Login</h1>
          <div className="input-group">
            <input type='text' placeholder='username' />
            <input type='password' placeholder='password' />
          </div>
          <div className='login-btn'>Login</div>

          <p className='text'>Or login using</p>
          <div className='alt-login'>
           <a href={github_url}><Github size={32} color="white" /></a>
           <a href={google_url}><Google size={32} color="#D24F40"/></a>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
