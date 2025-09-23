import React from 'react';
import './BookingConfirmation.css';
import { useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmation">
      <h2>🎉 Booking Confirmed!</h2>
      <p>Your payment has been received and your tour is booked successfully.</p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default BookingConfirmation;
