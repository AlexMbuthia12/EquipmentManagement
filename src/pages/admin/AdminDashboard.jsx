import React, { useEffect, useState } from 'react';
import { FaBell, FaPlus, FaClipboardList, FaUsers, FaBoxes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import LogoutButton from '../../buttons/LogoutButton'; // adjust path

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [notifications, setNotifications] = useState(2);
  
  useEffect(() => {
    // Fetch items when component mounts
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/items');
        setItems(response.data); // assuming your backend returns an array of items
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);
  const handleToggleAvailability = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };
  const handleLogout = async () => {
  try {
    // Call backend to clear the cookie
    await axios.get('http://localhost:7000/auth/logout', { withCredentials: true });

    // Clear local user state
    localStorage.removeItem('user');

    // Redirect to landing or login page
    navigate('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
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
            className="flex items-center mb-4 text-gray-700 hover:text-blue-600">
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
            onClick={() => navigate('../user/UserDashBoard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <FaPlus className="mr-2" />
            User
          </button> 
          
          <button
            onClick={() => navigate('/admin/additem')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <FaPlus className="mr-2" />
            Add Item
          </button> 
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <img
              src={`http://localhost:7000/uploads/${item.image}`}
              
              alt={item.name}
              className="w-full h-40 object-cover mb-2"
            />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.type}</p>
            <p className={`mt-2 ${item.available ? 'text-green-500' : 'text-red-500'}`}>
              {item.available ? 'Available' : 'Not Available'}
            </p>
            <button
              onClick={() => handleToggleAvailability(item.id)}
              className="mt-2 px-4 py-1 bg-yellow-500 text-white rounded"
            >
              Toggle Availability
            </button>
          </div>
        ))}
      </div>
      <LogoutButton />
    </div>
</div>
  );
};

export default AdminDashboard;
