
import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './BookTour.css';

const BookTour = () => {
  const { id } = useParams(); // Get tour ID from URL
  const [tour, setTour] = useState(null);
  const [form, setForm] = useState({ date: '', people: '' });
  const navigate = useNavigate();
  const [bookingSuccess, setBookingSuccess] = useState(false);
const [calculatedPrice, setCalculatedPrice] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch the selected tour by ID
  useEffect(() => {
    axios.get(`http://localhost:3500/tours/${id}`).then((res) => {
      setTour(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!tour || !user) {
    toast.error('Missing tour or user information.');
    return;
  }

  const numberOfPeople = parseInt(form.people);
  const totalPrice = tour.price * numberOfPeople * tour.stayDays;

  const bookingData = {
    id: Date.now(),
    userId: user.id,
    username: user.username,
    tourId: tour.id,
    tourName: tour.name,
    date: form.date,
    people: numberOfPeople,
    stayDays: tour.stayDays,
    totalPrice
  };

  try {
    await axios.post('http://localhost:3500/bookings', bookingData);
    toast.success('Booking Confirmed!');

    // ✅ Save to localStorage for fallback
    localStorage.setItem('payment', JSON.stringify({
      price: totalPrice,
      name: user.username,
      tour: tour.name
    }));

    // ✅ Navigate with state
    setTimeout(() => {
      navigate('/payment', {
        state: {
          price: totalPrice,
          name: user.username,
          tour: tour.name
        }
      });
    }, 2000);

  } catch (err) {
    console.error(err);
    toast.error('Booking failed. Try again.');
  }
};


console.log(JSON.parse(localStorage.getItem("user")));
  if (!tour) return <p style={{ textAlign: 'center' }}>Loading Tour Details...</p>;

  return (
    <div className="page-container">
      <form className="booking-form" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Book: {tour.name}</h2>

        <div className="input-group">
  <FaCalendarAlt className="input-icon" />
  <input
    type="date"
    name="date"
    value={form.date}
    onChange={handleChange}
    required
    min={(() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split("T")[0];
    })()} // 👈 disables today & past dates
  />
</div>


        <div className="input-group">
          <FaUsers className="input-icon" />
          <input
            type="number"
            name="people"
            placeholder="No. of People"
            value={form.people}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <button type="submit">Confirm Booking</button>
      </form>
      


      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default BookTour;
