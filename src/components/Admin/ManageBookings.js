// Admin/ManageBookings.js
import { useState, useEffect } from "react";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);
  }, []);

  // Save bookings whenever updated
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const updateStatus = (id, status) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status } : b
    );
    setBookings(updated);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-3">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p><strong>Tour:</strong> {booking.tour}</p>
                <p><strong>User:</strong> {booking.user}</p>
                <p><strong>Status:</strong> {booking.status}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => updateStatus(booking.id, "Approved")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(booking.id, "Rejected")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
