import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useAuth } from '../../auth/AuthContext'; // adjust to where you store user info
import toast from 'react-hot-toast';
//import { Link } from "react-router-dom";

const MyBookings = () => {
  const { user, loading } = useAuth();// user info is in context
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  //Prevent fetching before user is ready
   if (loading) return <p className="text-center mt-10">Loading user...</p>;
   if (!user) return <p className="text-center mt-10">User not logged in</p>;
 
//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get(`http://localhost:7000/api/bookings/user/${user.id}`);
//       setBookings(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load bookings");
//     }
//   };

//   useEffect(() => {
//   if (loading ||!user?.id) return; // Don't fetch until user is ready
//   fetchBookings();
// }, [loading, user]);

useEffect(() => {
  const fetchUserAndBookings = async () => {
    try {
      const userRes = await axios.get('/auth/me'); // Get current user from token
      const userData = userRes.data;
      
      const bookingsRes = await axios.get(`/api/bookings/user/${userData.id}`);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bookings");
    }
  };

  fetchUserAndBookings();
}, []);



  const handleEdit = (id, currentMessage) => {
    setEditingId(id);
    setNewMessage(currentMessage);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:7000/api/bookings/${id}/message`, {
        message: newMessage,
      });
      toast.success("Message updated");
      setEditingId(null);
      fetchBookings(); // refresh
    } catch (err) {
      console.error(err);
      toast.error("Failed to update message");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
    <div className="flex">

      {/* side bar content  */}
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

    {/* Main/my bookings content */}
    <div className="flex-1 py-10 px-6">
  <h1 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h1> 

  {bookings.length === 0 ? (
    <p className="text-gray-500">No bookings yet.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white rounded-lg shadow hover:shadow-md transition p-5 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">{booking.item_name}</h2>
          <p className="text-sm">
            Status: 
            <span className={`ml-2 font-semibold ${
              booking.status === 'pending' ? 'text-yellow-500' :
              booking.status === 'approved' ? 'text-green-600' : 'text-red-500'
            }`}>
              {booking.status}
            </span>
          </p>

          <div className="mt-3">
            <label className="block font-medium text-sm text-gray-700">Your Message:</label>
            {editingId === booking.id ? (
              <>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded mt-1"
                />
                <div className="mt-2 space-x-2">
                  <button onClick={() => handleSave(booking.id)} className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
                  <button onClick={() => setEditingId(null)} className="text-gray-500">Cancel</button>
                </div>
              </>
            ) : (
              <p className="text-gray-700 mt-1">{booking.message}</p>
            )}

            {booking.status === 'pending' && editingId !== booking.id && (
              <button
                onClick={() => handleEdit(booking.id, booking.message)}
                className="text-blue-600 text-sm mt-2 underline"
              >
                Edit Message
              </button>
            )}
          </div>

          <p className="mt-3 text-sm text-gray-700">
            <span className="font-medium">Admin Comment:</span> {booking.comment || "—"}
          </p>
        </div>
      ))}
    </div>
  )}
</div>

    </div>
    </div>
  );
};

export default MyBookings;
