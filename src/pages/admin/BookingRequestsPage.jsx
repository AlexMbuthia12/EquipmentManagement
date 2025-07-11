import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNotification } from '../../auth/NotificationContext';
const BookingRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({}); // keyed by booking ID
  const { fetchNotificationCount } = useNotification();


  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('http://localhost:7000/api/bookings');
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load booking requests');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAction = async (id, status) => {
  try {
    await axios.put(`http://localhost:7000/api/bookings/${id}`, {
      status,
      comment: comment[id] || ''
    });
    toast.success(`Request ${status}`);
    // remove this booking from view
    setRequests((prev) => prev.filter((req) => req.id !== id));
    // only fetch new notification count if a "pending" request was acted on
    await fetchNotificationCount();
    } catch (err) {
    console.error(err);
    toast.error('Action failed');
    }
   };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Booking Requests</h2>
      {requests.length === 0 ? (
        <p>No requests available</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} className="bg-white shadow p-4 mb-4 rounded">
            <h3 className="text-lg font-semibold">{req.item_name}</h3>
            <p>User: {req.user_name}</p>
            <p>Message: {req.message}</p>
            <textarea
              placeholder="Add comment..."
              value={comment[req.id] || ''}
              onChange={(e) =>
                setComment((prev) => ({ ...prev, [req.id]: e.target.value }))
              }
              className="w-full border rounded px-2 py-1 mt-2"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleAction(req.id, 'approved')}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction(req.id, 'rejected')}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingRequestsPage;
