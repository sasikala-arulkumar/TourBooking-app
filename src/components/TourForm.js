import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TourForm.css';


const TourForm = ({ tour, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    image: '',
    price: '',
    stayDays: '',
    description: ''
  });

  useEffect(() => {
    if (tour) setForm(tour);
  }, [tour]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tour?.id) {
      await axios.put(`http://localhost:3500/tours/${tour.id}`, form);
    } else {
      const newTour = { ...form, id: Date.now().toString() };
      await axios.post('http://localhost:3500/tours', newTour);
    }
    setForm({ name: '', location: '', image: '', price: '', stayDays: '', description: '' });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="tour-form">
      <input type="text" name="name" value={form.name} placeholder="Tour Name" onChange={handleChange} required />
      <input type="text" name="location" value={form.location} placeholder="Location" onChange={handleChange} required />
      <input type="text" name="image" value={form.image} placeholder="Image URL" onChange={handleChange} required />
      {form.image && (
  <img
    src={form.image}
    alt="Tour Preview"
    style={{ width: '200px', height: 'auto', marginBottom: '1rem', borderRadius: '8px' }}
  />
)}

      <input type="number" name="price" value={form.price} placeholder="Price" onChange={handleChange} required />
      <input type="number" name="days" value={form.stayDays} placeholder="Days" onChange={handleChange} required />
      <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange} required />
      <button type="submit">{tour ? 'Update Tour' : 'Add Tour'}</button>
    </form>
  );
};

export default TourForm;
