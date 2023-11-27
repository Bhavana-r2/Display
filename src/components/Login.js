import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Check if login ID or password is empty
    if (!login.trim() || !password.trim()) {
      alert('Please enter both Login ID and Password.');
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:5000/login?email=${login}`);
  
      if (response.data.success) {
        const userData = response.data.user;
  
        if (userData.password === password) {
          navigate('/add');
        } else {
          alert('Invalid password. Please try again.');
        }
      } else {
        alert(response.data.message || 'User not found. Please check your email.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='new-container'>
      <div className='new-header'> 
        <div className='new-text'>Login</div>
        <div className='new-underline'></div>
      </div>

      <div className='new-inputs'>
        <div className='new-input'>
          <label>Login ID: </label>
          <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
        </div>
        <div className='new-input'>
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>

      <div className='new-submit-container'>
        <button className='new-submit' onClick={handleLogin}>Login</button>
      </div>

      <Link to="/" className="new-link">Back to Landing Page</Link>
    </div>
  );
}

export default LoginPage;
