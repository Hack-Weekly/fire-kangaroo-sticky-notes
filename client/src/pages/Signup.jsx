
import React, { useState } from 'react';
import Header from '../components/Header';
import { Github, Google } from 'react-bootstrap-icons';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    cfnpassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
    cfnpassword: '', // Use a separate error key for confirm password
  });

  let github_url = `${process.env.REACT_APP_BACKEND_URL}/auth/github`;
  let google_url = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;
  
    if (!formData.username) {
      errors.email = 'Username is required';
      isValid = false;
    }
  
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    }
  
    if (!formData.cfnpassword) {
      errors.cfnpassword = 'Confirm Password is required';
      isValid = false;
    } else if (formData.password !== formData.cfnpassword) {
      errors.cfnpassword = 'Passwords do not match';
      isValid = false;
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}/.test(formData.password)) {
      errors.cfnpassword = 'Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character';
      isValid = false;
    }
  
    setFormErrors(errors);
    return isValid;
  };
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, formData, {withCredentials: true})
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <Header />
      <main className='center'>
        <div className='cover'>
          <h1 className="font-monospace">SIGNUP</h1>
          <div className="input-group">
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <input
                type='text'
                name='username'
                placeholder='Username'
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              {formErrors.username && <div className="form-error">{formErrors.username}</div>}
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {formErrors.password && <div className="form-error">{formErrors.password}</div>}
              <input
                type='password'
                name='cfnpassword'
                placeholder='Confirm Password'
                value={formData.cfnpassword}
                onChange={handleInputChange}
                required
              />
              {formErrors.cfnpassword && <div className="form-error">{formErrors.cfnpassword}</div>}
              <button type="submit" className='login-btn'>Sign Up</button>
            </form>
          </div>
          <p className='text'>Or signup using</p>
          <div className='alt-login'>
            <a href={github_url}><Github size={32} color="white" /></a>
            <a href={google_url}><Google size={32} color="#D24F40" /></a>
          </div>
        </div>
      </main>
    </>
  );
}

export default Signup;

