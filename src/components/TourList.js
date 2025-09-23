import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TourCard from './TourCard';
import './TourList.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3500/tours')
      .then((res) => setTours(res.data))
      .catch((err) => console.error('Error fetching tours:', err));
  }, []);

  const filteredTours = tours.filter(tour =>
    tour.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToWishlist = (tour) => {
    const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
    const alreadyAdded = existing.find((item) => item.id === tour.id);

    if (alreadyAdded) {
      toast.info('Already in wishlist');
      return;
    }

    const updated = [...existing, tour];
    localStorage.setItem('wishlist', JSON.stringify(updated));
    toast.success('Added to wishlist!');
  };

  return (
    <div className="tour-list-container">
      <input
        type="text"
        placeholder="Search tours by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="tour-cards">
        {filteredTours.length > 0 ? (
          filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} onAddToWishlist={handleAddToWishlist} />
          ))
        ) : (
          <p>No tours found.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default TourList;
