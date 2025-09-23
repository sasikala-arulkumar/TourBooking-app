// Admin/AdminDashboard.js
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Admin.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            <li><Link to="/admin/tours">Manage Tours</Link></li>
            <li><Link to="/admin/bookings">Manage Bookings</Link></li>
            <li><Link to="/admin/users">Manage Users</Link></li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 w-full p-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
