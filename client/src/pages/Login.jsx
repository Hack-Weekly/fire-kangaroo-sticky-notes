import React from 'react';
import Header from '../components/Header';

function Login() {
  return (
    <>
      <Header />
      <div className='center'>
        <div className='cover'>
          <h1>Login</h1>
          <div className="input-group">
            <input type='text' placeholder='username' />
            <input type='password' placeholder='password' />
          </div>
          <div className='login-btn'>Login</div>

          <p className='text'>Or login using</p>
          <div className='alt-login'>
           <div className='github'></div>
           <div className='google'></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
