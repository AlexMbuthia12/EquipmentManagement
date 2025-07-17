import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../../buttons/LogoutButton'; // adjust path

export default function HomePage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:7000/api/items');
        setItems(res.data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Top Navbar 
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">E-COMMERCE</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="border px-3 py-1 rounded-md w-1/2"
        />
        <div className="space-x-4 text-gray-700">
          <span>Account</span>
          <span>Help</span>
          <span>Cart</span>
        </div>
      </header>*/}

      {/* Sidebar and Main Content */}
      <div className="flex">
        <aside className="w-64 bg-white p-4 shadow-sm">
          <ul className="space-y-2 text-gray-700">
             <li className="flex items-center gap-4 text-lg font-semibold hover:scale-105 transition duration-200">
  <span className="w-6 h-6 inline-block">🏷️</span> Categories
</li>
<li className="flex items-center gap-4 text-lg font-semibold hover:text-blue-600 hover:scale-105 transition duration-200">
  <span className="w-6 h-6 inline-block">🏛️</span> Halls
</li>
<li className="flex items-center gap-4 text-lg font-semibold hover:text-green-600 hover:scale-105 transition duration-200">
  <span className="w-6 h-6 inline-block">🖥️</span> Appliances
</li>
<li className="flex items-center gap-4 text-lg font-semibold hover:text-red-600 hover:scale-105 transition duration-200">
  <span className="w-6 h-6 inline-block">🚗</span> Vehicles
</li>
<li className="flex items-center gap-4 text-lg font-semibold hover:text-emerald-600 hover:scale-105 transition duration-200">
  <span className="w-6 h-6 inline-block">🌳</span> Grounds
</li>
<li className="flex items-center gap-4 text-lg font-semibold hover:text-purple-600 hover:scale-105 transition duration-200">
  <span className="w-6 h-6 inline-block">🖱️</span> Peripherals
</li>
</ul>
        </aside>

        <main className="flex-1 p-6">
          <div className="bg-blue-100 p-4 rounded mb-6 text-center">
            <h2 className="text-xl font-semibold text-blue-800">
              Welcome to Muranga County Goverment Equipment Management System!
            </h2>
          </div>
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {items.map((item) => (
    <div
      key={item._id}
      className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
    >
      <img
        src={`http://localhost:7000/uploads/${item.image}`}
        alt={item.name}
        className="h-40 w-full object-cover rounded mb-3"
      />
      <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{item.type}</p>

      {item.available ? (
        <button
          onClick={() => navigate(`/book/${item.id}`)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Book Now
        </button>
      ) : (
        <button
          disabled
          className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
        >
          Unavailable
        </button>
      )}
    </div>
  ))}
</div>
           <LogoutButton />
        </main>
      </div>

      {/* Flash Sale Footer
      <footer className="bg-red-600 text-white text-center py-2 mt-6">
        Flash Sale | Time Left: 13h : 10m : 45s
      </footer> */}
    </div>
  );
}
