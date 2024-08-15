import React, { useState } from 'react';
import axios from '../axios'; // Assuming you have axios set up for API calls
import { useNavigate } from 'react-router-dom'; // For navigation after login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token, user } = response.data;

      // Save JWT token to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/'); // Redirect to the admin dashboard
      } else if (user.role === 'teacher') {
        navigate('/teacher/dashboard'); // Placeholder if you add a teacher dashboard
      } else if (user.role === 'student') {
        navigate('/student/dashboard'); // Placeholder if you add a student dashboard
      } else {
        navigate('/login'); // Redirect back to login for any unexpected roles
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
