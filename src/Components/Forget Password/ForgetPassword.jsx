// ForgetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import './ForgetPassword.css'
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigateEmail=useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email });
      setMessage(data.message);
      setTimeout(function () {
            navigateEmail('/Login')
      },2000)
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container py-5">
      <h2 className='headerEmail mb-4'>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="formbtn">
        <label htmlFor="email" className='labelEmail mb-2'>Email address</label>
        <input
            type="email"
            id="email"
            name="email"
            value={email}
            className=' form-control'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className='"btn2 btn btn-success my-4 ' type="submit">Submit</button>
      </form>
      {message && <div class="alertemail alert alert-success" role="alert">{message} </div>}
      {error && <div class="alertemail alert alert-danger" role="alert">{error}</div>}
    </div>
  );
};

export default ForgetPassword;
