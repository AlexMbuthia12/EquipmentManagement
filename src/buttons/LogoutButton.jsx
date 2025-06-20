import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:7000/auth/logout', {
        withCredentials: true, // ensures cookie is included
      });

      // Remove user data from localStorage (optional but safe)
      localStorage.removeItem('user');

      // Redirect to login or landing page
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 mt-6"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
