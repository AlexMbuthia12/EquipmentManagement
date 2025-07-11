import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import toast from 'react-hot-toast';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout');
// Remove user data from localStorage (optional but safe)
      localStorage.removeItem('user');
      // ✅ Show toast notification
    toast.success("Successfully logged out");
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
