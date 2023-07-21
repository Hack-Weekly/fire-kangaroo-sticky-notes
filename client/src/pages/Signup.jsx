import React from 'react'

function Signup() {
  return (
    <div className='container'>
    <div className='row justify-content-center'>
     <div className='col-12 col-sm-8 col-md-6'>
      <form action="signup" method='POST'>
      <div className='mb-3'> 
         <label htmlFor='name'>Name</label>
         <input type='name' placeholder='Enter Name'></input>
       </div>
       <div className='mb-3'> 
         <label htmlFor='email'>Email</label>
         <input type='email' placeholder='Enter Email'></input>
       </div>
       <div className='mb-3'>
       <label htmlFor='password'>Password</label>
         <input type='email' placeholder='Enter Password'></input>
       </div>
       <p>You are to agree to our terms and policies</p>
       <button className='btn btn-default border'>Create Account</button>
      </form>
     </div>
    </div>
    </div>
  )
}

export default Signup