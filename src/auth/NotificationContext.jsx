import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  const fetchNotificationCount = async () => {
    try {
      const res = await axios.get('http://localhost:7000/api/bookings/count');
      setNotificationCount(res.data.count);
    } catch (err) {
      console.error("Error fetching notification count:", err);
    }
  };

  useEffect(() => {
    fetchNotificationCount();
  }, []);

  return (
    <NotificationContext.Provider value={{ notificationCount, fetchNotificationCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook
export const useNotification = () => useContext(NotificationContext);
