// src/layouts/AdminLayout.jsx
//import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
//import Navbar from '../components/Navbar';
// import { FaBell, FaClipboardList, FaUsers, FaBoxes } from 'react-icons/fa';
import { FaBell, FaPlus, FaClipboardList, FaUsers, FaBoxes } from 'react-icons/fa';
//import axios from 'axios';
import { useNotification } from '../auth/NotificationContext';




export default function AdminLayout() {
  const navigate = useNavigate();
  //const [notifications, setNotifications] = useState(2);
  const { notificationCount } = useNotification();
  
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:7000/api/bookings/count');
  //       setNotifications(res.data.count);
  //     } catch (err) {
  //       console.error('Failed to fetch notification count');
  //     }
  //   };

  //   fetchNotifications();
  // }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navbar 
      <Navbar />*/}

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white p-6 shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Admin Panel</h2>

              <button
                onClick={() => {//setNotifications(0);  Reset count
                navigate('/admin/BookingRequestsPage'); // Go to booking requests page
                 }}
                           className="flex items-center mb-4 text-gray-700 hover:text-blue-600">
                         <FaBell className="mr-2" />
                          Booking Requests {notificationCount > 0 && (
  <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
    {notificationCount}
  </span>
)}

                         {/* {notifications > 0 && (
                           <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                            {notifications}
                           </span>
                         )} */}
                       </button>

            <button className="flex items-center mb-4 text-gray-700 hover:text-blue-600">
              <FaClipboardList className="mr-2" />
              History Logs
            </button>
            <button
      onClick={() => navigate("/admin/AdminDashboard")} // ⬅️ navigate to Admin Dashboard
      className="flex items-center mb-4 text-gray-700 hover:text-blue-600"
    >
      <FaBoxes className="mr-2" />
      Item Management
    </button>
            <button className="flex items-center text-gray-700 hover:text-blue-600">
              <FaUsers className="mr-2" />
              User Management
            </button>
          </div>
          <footer className="text-xs text-gray-400 mt-6">© 2025 Institute Admin</footer>
        </div>

        {/* Main page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
