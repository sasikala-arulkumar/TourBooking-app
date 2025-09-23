// Admin/ManageTours.js
import { useState, useEffect } from "react";

export default function ManageTours() {
  const [tours, setTours] = useState([]);
  const [newTour, setNewTour] = useState("");

  // Load tours from localStorage
  useEffect(() => {
    const savedTours = JSON.parse(localStorage.getItem("tours")) || [];
    setTours(savedTours);
  }, []);

  // Save to localStorage whenever tours change
  useEffect(() => {
    localStorage.setItem("tours", JSON.stringify(tours));
  }, [tours]);

  const addTour = () => {
    if (!newTour) return;
    setTours([...tours, { id: Date.now(), name: newTour }]);
    setNewTour("");
  };

  const deleteTour = (id) => {
    setTours(tours.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Tours</h2>
      <input
        value={newTour}
        onChange={(e) => setNewTour(e.target.value)}
        placeholder="New Tour Name"
        className="border p-2 mr-2"
      />
      <button onClick={addTour} className="bg-blue-500 text-white p-2">
        Add
      </button>

      <ul className="mt-4">
        {tours.map((tour) => (
          <li key={tour.id} className="flex justify-between border p-2">
            {tour.name}
            <button
              onClick={() => deleteTour(tour.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
