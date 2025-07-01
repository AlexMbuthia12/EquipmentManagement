import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const BookingPage = () => {
  const { id } = useParams(); // item ID from URL
  console.log('BookingPage item id:', id);

  const [item, setItem] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch item details
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/items/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load item details');
      }
    };

    fetchItem();
  }, [id]);

  // Submit booking
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Message is required');
      return;
    }

    try {
      setLoading(true);

      // Assuming you have user info in localStorage or AuthContext
      const userId = JSON.parse(localStorage.getItem('user'))?.id;

      const res = await axios.post('http://localhost:7000/api/bookings', {
        itemId: id,
        userId,
        message
      });

      toast.success('Booking request sent');
      navigate('/user/UserDashBoard'); // or wherever you want to redirect
    } catch (err) {
      console.error(err);
      toast.error('Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!item) {
    return <div className="text-center py-10">Loading item...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Book: {item.name}</h2>
      <img
        src={`http://localhost:7000/uploads/${item.image}`}
        alt={item.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="text-gray-600 mb-2"><strong>Type:</strong> {item.type}</p>
      <p className="text-sm text-green-600 mb-4">
        {item.available ? 'Available for booking' : 'Currently unavailable'}
      </p>

      <form onSubmit={handleBooking}>
        <textarea
          placeholder="Add a message or reason for booking..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
          rows="4"
        ></textarea>

        <button
          type="submit"
          disabled={loading || !item.available}
          className={`w-full py-2 text-white rounded ${
            item.available ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
