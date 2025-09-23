import React, { useEffect, useState } from 'react';
import './WishList.css';
import { toast, ToastContainer } from 'react-toastify';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(saved);
  }, []);

  const handleRemove = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    toast.success('Removed from wishlist');
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No tours in wishlist.</p>
      ) : (
        <ul className="wishlist-grid">
          {wishlist.map((tour) => (
            <li key={tour.id} className="wishlist-card">
              <h3>{tour.name}</h3>
              <p>{tour.description?.slice(0, 80)}...</p>
              <button onClick={() => handleRemove(tour.id)}>❌ Remove</button>
            </li>
          ))}
        </ul>
      )}
      <ToastContainer />
    </div>
  );
};

export default Wishlist;
