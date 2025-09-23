import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PaymentForm.css';

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [price, setPrice] = useState(null);
  const [name, setName] = useState('');
  const [tour, setTour] = useState('');
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' });

  useEffect(() => {
    console.log("Location state:", location.state); // ✅ now valid
    const stateData = location.state;
    const localData = JSON.parse(localStorage.getItem('payment'));

    if (stateData?.price) {
      setPrice(stateData.price);
      setName(stateData.name);
      setTour(stateData.tour);
    } else if (localData?.price) {
      setPrice(localData.price);
      setName(localData.name);
      setTour(localData.tour);
    } else {
      toast.error('No booking data found. Redirecting to home...');
      setTimeout(() => navigate('/'), 2000);
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (card.number && card.expiry && card.cvv) {
      toast.success('Payment Successful!');
      localStorage.removeItem('payment');
      setTimeout(() => navigate('/confirmation'), 2000);
    } else {
      toast.error('Please fill all payment fields');
    }
  };

  return (
    <div className="payment-form">
      <ToastContainer />
      <h2>Payment Details</h2>

      {price ? (
        <>
          <p><strong>Customer:</strong> {name}</p>
          <p><strong>Tour:</strong> {tour}</p>
          <p><strong>Total to Pay:</strong> ₹{price}</p>

          <form onSubmit={handlePayment}>
            <input
              type="text"
              name="number"
              placeholder="Card Number"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              onChange={handleChange}
              required
            />
            <button type="submit">Pay Now</button>
          </form>
        </>
      ) : (
        <p style={{ color: 'red' }}>Loading payment details...</p>
      )}
    </div>
  );
};

export default PaymentForm;
