import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TourList from './components/TourList';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetails from './pages/TourDetails';
import BookTour from './pages/BookTour';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyBookings from './pages/MyBookings';
import Success from './pages/Success';
import Wishlist from './pages/WishList';
import PaymentForm from './components/PaymentForm';
import BookingConfirmation from './pages/BookingConfirmation';

import AdminDashboard from "./components/Admin/Dashboard";
import AdminLogin from "./components/Admin/Login";
// import Login from "./components/Admin/Login";
import ManageTours from "./components/Admin/ManageTours";
import ManageBookings from "./components/Admin/ManageBookings";
import ManageUsers from "./components/Admin/ManageUsers";
import ProtectedRoute from "./components/Admin/ProtectedRoute";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        {/* <Route path="/tours/:id" element={<TourDetails tours={Tours} />} /> */}
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/book/:id" element={<BookTour />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/success" element={<Success />} />
        <Route path="/TourList" element={<TourList />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/confirmation" element={<BookingConfirmation />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />


        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="tours" replace />} />
          <Route path="tours" element={<ManageTours />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;