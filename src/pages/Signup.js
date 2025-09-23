import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      toast.error('All fields are required.');
      return;
    }

    try {
      const res = await axios.get('http://localhost:3500/users');
      const users = res.data;

      // Generate next user ID like u1, u2, u3...
      const getNextUserId = () => {
        const ids = users
          .map((u) => parseInt(u.id.replace('u', '')))
          .filter((num) => !isNaN(num));
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        return `u${maxId + 1}`;
      };

      const newUser = {
        id: getNextUserId(),
        username: form.username,
        email: form.email,
        password: form.password
      };

      await axios.post('http://localhost:3500/users', newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('Signup successful!');

      setTimeout(() => navigate('/'), 1500); // redirect after 1.5 sec
    } catch (err) {
      console.error(err);
      toast.error('Signup failed. Try again.');
    }
  };


useEffect(() => {
  localStorage.removeItem('user'); // or 'users' if you store a list
}, []);

useEffect(() => {
  setForm({
    username: '',
    email: '',
    password: '',
    gender: '',
    dob: '',
    phone: ''
  });
}, []);

  return (
    <div className='back'>
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup} autoComplete="off">

        <h2>Create Account</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete='off'
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete='off'
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete='new password'
          value={form.password}
          onChange={handleChange}
          required
        />
      <div className="gender-group">
  <label>
    <input type="radio" name="gender" value="male" /> Male
  </label>
  <label>
    <input type="radio" name="gender" value="female" /> Female
  </label>
  <label>
    <input type="radio" name="gender" value="other" /> Other
  </label>
</div>
 <input
           type="date"
           name="dob"
           value={form.dob}
           onChange={handleChange}
           placeholder="Date of Birth"
        />
<select name="country" value={form.country} onChange={handleChange}>
           <option value="">Select Country</option>
           <option value="India">India</option>
           <option value="USA">USA</option>
           <option value="UK">UK</option>
           <option value="Australia">Australia</option>
        </select>

        <button type="submit">Sign Up</button>
      </form>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
    </div>
  );
};

export default Signup;
