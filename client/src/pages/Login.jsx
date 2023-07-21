import React from 'react'

function Login() {
  return (
    <div className='container'>
    <div className='row justify-content-center'>
     <div className='col-12 col-sm-8 col-md-6'>
      <form action="login" method='POST'>
       <div className='mb-3'> 
         <label htmlFor='email'>Email</label>
         <input type='email' placeholder='Enter Email'></input>
       </div>
       <div className='mb-3'>
       <label htmlFor='password'>Password</label>
         <input type='password' placeholder='Enter Password'></input>
       </div>
       <button className='btn btn-success'>Log In</button>
      </form>
     </div>
    </div>
    </div>
  )
}

export default Login