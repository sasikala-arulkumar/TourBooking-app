import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TourCard from '../components/TourCard';
import './Tours.css';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    axios.get('http://localhost:3500/tours')
      .then((res) => setTours(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔍 Filter by location
  const filteredTours = tours.filter((tour) =>
    tour.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔀 Sort by price
  const sortedTours = [...filteredTours].sort((a, b) => {
    if (sortOrder === 'lowtohigh') {
      return a.price - b.price;
    } else if (sortOrder === 'hightolow') {
      return b.price - a.price;
    }
    return 0; // default, no sort
  });

  return (
    <div className="tour-container">
      <h2>Destinations</h2>
    <div className="tour-filters">
      <input
        type="text"
        placeholder="Search by location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="tour-search-input"
      />
  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="tour-price-dropdown"
  >
    <option value="default">Sort by Price</option>
    <option value="lowtohigh">Low to High</option>
    <option value="hightolow">High to Low</option>
  </select>
</div>

      {/* 🧭 Show tour cards */}
      <div className="tour-grid">
        {sortedTours.length === 0 ? (
          <p className="tour-loading">No tours match your search.</p>
        ) : (
          sortedTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))
        )}
      </div>
    </div>
  );
};

export default Tours;
