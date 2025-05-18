import React, { useState } from 'react';
import { FaBell, FaPlus, FaClipboardList, FaUsers, FaBoxes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, type: 'Projector', available: true, image: '/images/projector.jpg' },
    { id: 2, type: 'Speaker', available: false, image: '/images/speaker.jpg' }
  ]);
  const [notifications, setNotifications] = useState(2);

  const handleToggleAvailability = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Admin Panel</h2>
          {/* <button className="flex items-center mb-4 text-gray-700 hover:text-blue-600">
            <FaBell className="mr-2" />
            Booking Requests
            {notifications > 0 && (
              <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                {notifications}
              </span>
            )}
          </button> */}
          <button
  onClick={() => setNotifications(0)}
  className="flex items-center mb-4 text-gray-700 hover:text-blue-600"
>
  <FaBell className="mr-2" />
  Booking Requests
  {notifications > 0 && (
    <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
      {notifications}
    </span>
  )}
</button>

          <button className="flex items-center mb-4 text-gray-700 hover:text-blue-600">
            <FaClipboardList className="mr-2" />
            History Logs
          </button>
          <button className="flex items-center mb-4 text-gray-700 hover:text-blue-600">
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

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Manage Items</h1>
          <button
            onClick={() => navigate('/add-item')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <FaPlus className="mr-2" />
            Add Item
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.type}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.type}</h3>
                <p
                  className={`mt-2 text-sm font-medium ${
                    item.available ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {item.available ? 'Available' : 'Not Available'}
                </p>
                <button
                  onClick={() => handleToggleAvailability(item.id)}
                  className="mt-4 w-full bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-sm text-gray-800"
                >
                  {item.available ? 'Mark Unavailable' : 'Mark Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
