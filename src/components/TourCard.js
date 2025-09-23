
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TourCard.css';
import { toast } from 'react-toastify';

const TourCard = ({ tour }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.find((item) => item.id === tour.id);
    setIsWishlisted(!!exists);
  }, [tour.id]);

  const handleWishlistClick = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (!isWishlisted) {
      // Add to wishlist
      localStorage.setItem('wishlist', JSON.stringify([...wishlist, tour]));
      setIsWishlisted(true);
      toast.success('Added to wishlist!');
    } else {
      // Remove from wishlist
      const updated = wishlist.filter((item) => item.id !== tour.id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      setIsWishlisted(false);
      toast.info('Removed from wishlist.');
    }
  };

  const handleViewDetails = () => {
    navigate(`/tours/${tour.id}`);
  };

  const handleBookNow = () => {
    navigate(`/book/${tour.id}`);
  };

  return (
    <div className="tour-card">
      <img src={tour.image} alt={tour.title} className="tour-img" />
      <div className="wishlist-icon" onClick={handleWishlistClick}>
        {isWishlisted ? '💖' : '🤍'}
      </div>
      <h3>{tour.location}</h3>
      <div className="tour-overlay">
        <button className="details-btn" onClick={handleViewDetails}>View Details</button>
        <button className="book-btn" onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  );
};

export default TourCard;
