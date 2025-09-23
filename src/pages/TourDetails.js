// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './TourDetails.css';


// const TourDetails = () => {
//   const { id } = useParams();
//   const [tour, setTour] = useState(null);
//   const [loading, setLoading] = useState(true);
//    const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:3500/tours/${id}`)
//       .then(res => {
//         setTour(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Failed to fetch tour:", err);
//         setLoading(false);
//       });
//   }, [id]);
//   const handleBookNow = () => {
//     navigate(`/book/${id}`); // ⬅️ navigate to booking page with tour id
//   };

//   if (loading) return <p>Loading tour details...</p>;
//   if (!tour) return <p>No tour found for ID {id}</p>;

//   return (
    
//     <div className="tour-detail-container">
//       <div className="tour-content">
//               {tour.places && tour.places.length > 0 && (
//                 <div className="place-slider">
//                   <h3>Places to Visit</h3>
//                   <div className="slider-wrapper">
//                     {tour.places.map((place, index) => (
//                       <div className="slide" key={index}>
//                         <img src={place.image} alt={place.name} />
//                         <p><strong>{place.name}</strong></p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//         <p>{tour.description}</p>
//         <p>Stay Duration: {tour.stayDays} Days</p>
//         <h3 style={{ color: 'orangered' }}>Price: ₹{tour.price}</h3>
//         <button className="book-now-button" onClick={handleBookNow}>
//           Book This Tour
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TourDetails;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TourDetails.css';

const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3500/tours/${id}`)
      .then(res => {
        setTour(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch tour:", err);
        setLoading(false);
      });
  }, [id]);

  const handleBookNow = () => {
    navigate(`/book/${id}`);
  };

  if (loading) return <p>Loading tour details...</p>;
  if (!tour) return <p>No tour found for ID {id}</p>;

  return (
    <div className="tour-detail-container">

      {/* ===== Main Tour Image Slider ===== */}
      {tour.images && tour.images.length > 0 && (
        <div className="main-slider">
          {tour.images.map((img, index) => (
            <div className="main-slide" key={index}>
              <img src={img} alt={`Tour ${index + 1}`} />
            </div>
          ))}
        </div>
      )}

      {/* ===== Tour Details ===== */}
      <div className="tour-content">
        <p>{tour.description}</p>
        <p>Stay Duration: {tour.stayDays} Days</p>
        <h3 className="tour-price">Price: ₹{tour.price}</h3>
        <button className="book-now-button" onClick={handleBookNow}>
          Book This Tour
        </button>

        {/* ===== Places Slider ===== */}
        {tour.places && tour.places.length > 0 && (
          <div className="place-slider">
            <h3>Places to Visit</h3>
            <div className="slider-wrapper">
              {tour.places.map((place, index) => (
                <div className="slide" key={index}>
                  <img src={place.image} alt={place.name} />
                  <p><strong>{place.name}</strong></p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default TourDetails;
