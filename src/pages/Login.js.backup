import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://remwastebackend.onrender.com/login', {
        username,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        onLogin();
        navigate('/dashboard');
      } else {
        setErrorMsg('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMsg(error.response.data.error);
      } else {
        setErrorMsg('Server error or invalid credentials');
      }
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: '#f2f2f2'
    }}>
      <form onSubmit={handleSubmit} style={{ 
        background: '#fff', 
        padding: '40px', 
        borderRadius: '8px', 
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        minWidth: '300px'
      }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>RemWaste Login</h2>
        {errorMsg && <p style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ 
            marginBottom: '10px', 
            padding: '10px', 
            width: '100%', 
            boxSizing: 'border-box',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ 
            marginBottom: '20px', 
            padding: '10px', 
            width: '100%', 
            boxSizing: 'border-box',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <button type="submit" style={{ 
          padding: '10px 20px', 
          width: '100%', 
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>Login</button>
        <p style={{ marginTop: '20px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
          Hint: username: remwaste, password: 12345
        </p>
      </form>
    </div>
  );
}

export default Login;
