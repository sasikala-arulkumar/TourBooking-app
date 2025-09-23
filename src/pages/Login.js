import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('http://localhost:3500/users', {
        params: { email: form.email, password: form.password }
      });
      if (res.data.length > 0) {
  // ✅ save only name (if your JSON has "name") OR fallback to email
  const loggedInUser = {
     id: res.data[0].id,
    name: res.data[0].name || res.data[0].email
  };

  // localStorage.setItem('user', JSON.stringify(loggedInUser));
  localStorage.setItem('user', JSON.stringify(loggedInUser));
  window.dispatchEvent(new Event("storage")); // 👈 force Navbar to update


  toast.success("Login successful!");
  setTimeout(() => navigate('/tours'), 1500); // wait for toast
} else {
  toast.error('Invalid credentials');
}

      // if (res.data.length > 0) {
      //   localStorage.setItem('user', JSON.stringify(res.data[0]));
      //   toast.success("Login successful!");
      //   setTimeout(() => navigate('/tours'), 1500); // wait for toast
      // } else {
      //   toast.error('Invalid credentials');
      // }
    } catch (error) {
      toast.error('Login failed. Try again.');
    }
  };
useEffect(() => {
  setForm({ email: '', password: '' });
}, []);

  return (
    <>
      <div className="login-wrapper">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Welcome Back</h2>
          <input
            name="email"
            type="email"
            autoComplete="off"
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;