import React from 'react';
import './Home.css'; // Make sure you create this file

const Home = () => {
  return (
    <div className="home-video-section">
      <video className="home-video" autoPlay muted loop>
        <source src="/videos/travel.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="home-video-overlay">
        <h1>Discover Beautiful Destinations</h1>
        <p>Plan your journey with us today!</p>
      </div>
    </div>
  );
};

export default Home;
