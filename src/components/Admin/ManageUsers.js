// Admin/ManageUsers.js
import { useState, useEffect } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  // Load users from localStorage
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  // Save whenever updated
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const toggleBan = (id) => {
    const updated = users.map((u) =>
      u.id === id ? { ...u, banned: !u.banned } : u
    );
    setUsers(updated);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Status:</strong> {user.banned ? "Banned" : "Active"}</p>
              </div>
              <button
                onClick={() => toggleBan(user.id)}
                className={`px-3 py-1 rounded ${
                  user.banned ? "bg-green-500" : "bg-red-500"
                } text-white`}
              >
                {user.banned ? "Unban" : "Ban"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
