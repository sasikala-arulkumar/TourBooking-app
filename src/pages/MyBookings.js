// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './MyBookings.css';

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [tours, setTours] = useState([]);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user) return;

//     const fetchData = async () => {
//       try {
//         const bookingsRes = await axios.get(`http://localhost:3500/bookings?userId=${user.id}`);
//         const toursRes = await axios.get('http://localhost:3500/tours');
//         setBookings(bookingsRes.data);
//         setTours(toursRes.data);
//       } catch (err) {
//         toast.error('Failed to load bookings.');
//       }
//     };

//     fetchData();
//   }, []);

//   const getTourName = (tourId) => {
//     const tour = tours.find((t) => t.id === tourId);
//     return tour ? tour.name : 'Unknown Tour';
//   };

//   const handleCancel = async (id) => {
//     if (window.confirm('Are you sure you want to cancel this booking?')) {
//       try {
//         await axios.delete(`http://localhost:3500/bookings/${id}`);
//         setBookings(bookings.filter((b) => b.id !== id));
//         toast.success('Booking canceled');
//       } catch (err) {
//         toast.error('Cancellation failed.');
//       }
//     }
//   };

//   return (
//     <div className="Booking-container">
//       <h2 className="my-bookings-title">My Bookings</h2>
//       {bookings.length === 0 && <p>No bookings found.</p>}
//       <ul>
//   {bookings.map((booking) => (
//     <li className="booking-item" key={booking.id}>
//        <div className="booking-info">
//     <p><strong>Tour:</strong> {getTourName(booking.tourId)}</p>
//     <p><strong>Booked by:</strong> {booking.username}</p>
//     <p><strong>Date:</strong> {booking.date}</p>
//     <p><strong>People:</strong> {booking.people}</p>
//     <button className="cancel-btn" onClick={() => handleCancel(booking.id)}>Cancel</button>
//   </div>
//     </li>
//   ))}
// </ul>

//       <ToastContainer />
//     </div>
//   );
// };

// export default MyBookings;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user')); // Fetch user from localStorage

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.id) {
        toast.error("Please log in to view bookings.");
        setLoading(false);
        return;
      }

      try {
        const bookingsRes = await axios.get('http://localhost:3500/bookings');
        const toursRes = await axios.get('http://localhost:3500/tours');

        // Filter bookings by logged-in user ID (string-safe)
        const userBookings = bookingsRes.data.filter(
          (b) => String(b.userId) === String(user.id)
        );

        setBookings(userBookings);
        setTours(toursRes.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        toast.error("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getTourName = (tourId) => {
    const tour = tours.find((t) => String(t.id) === String(tourId));
    return tour ? tour.name : 'Unknown Tour';
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.delete(`http://localhost:3500/bookings/${id}`);
        setBookings((prev) => prev.filter((b) => b.id !== id));
        toast.success('Booking cancelled.');
      } catch (err) {
        console.error("Error cancelling booking:", err);
        toast.error('Cancellation failed.');
      }
    }
  };

  return (
    <div className="Booking-container">
      <h2 className="my-bookings-title">My Bookings</h2>

      {loading ? (
        <p>Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li className="booking-item" key={booking.id}>
              <div className="booking-info">
                <p><strong>Tour:</strong> {getTourName(booking.tourId)}</p>
                <p><strong>Booked by:</strong> {booking.username}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>People:</strong> {booking.people}</p>
                <p><strong>Stay Days:</strong> {booking.stayDays}</p>
                <button className="cancel-btn" onClick={() => handleCancel(booking.id)}>
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default MyBookings;
