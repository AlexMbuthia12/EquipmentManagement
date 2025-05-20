import { useState, useEffect, useRef } from "react";
import { Bell, X, Check } from "lucide-react";

export default function NotificationComponent({ 
  className = "",
  maxNotifications = 5,
  onNotificationClick = () => {},
  onMarkAllRead = () => {},
}) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
    
    // Set up event listener for clicking outside to close dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sample function to fetch notifications - replace with your API call
  const fetchNotifications = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/notifications");
      
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      
      // Sample data - replace with actual API response
      const data = await response.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.notifications.filter(n => !n.read).length);
    } catch (err) {
      setError("Failed to load notifications");
      console.error(err);
      
      // For demo purposes - sample data if API fails
      setNotifications([
        { id: 1, title: "Booking Confirmed", message: "Your equipment booking #12345 has been confirmed", time: "2 hours ago", read: false, type: "success" },
        { id: 2, title: "Maintenance Alert", message: "Scheduled maintenance for your booked camera", time: "5 hours ago", read: false, type: "warning" },
        { id: 3, title: "Return Reminder", message: "Equipment due for return tomorrow", time: "Yesterday", read: true, type: "info" }
      ]);
      setUnreadCount(2);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notification) => {
    onNotificationClick(notification);
    
    // Mark as read
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const markAsRead = async (id) => {
    // Replace with your actual API call
    try {
      // await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
      
      // Update local state
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  const markAllAsRead = async () => {
    // Replace with your actual API call
    try {
      // await fetch('/api/notifications/read-all', { method: 'PATCH' });
      
      // Update local state
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
      onMarkAllRead();
    } catch (err) {
      console.error("Failed to mark all notifications as read", err);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "success":
        return <Check size={16} className="text-green-500" />;
      case "warning":
        return <Bell size={16} className="text-amber-500" />;
      case "error":
        return <X size={16} className="text-red-500" />;
      default:
        return <Bell size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button 
        className="relative p-2 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={toggleNotifications}
        aria-label="Notifications"
      >
        <Bell size={20} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <h3 className="font-medium text-gray-800">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Loading notifications...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">{error}</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {notifications.slice(0, maxNotifications).map((notification) => (
                <div 
                  key={notification.id} 
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {notifications.length > maxNotifications && (
            <div className="p-3 text-center border-t border-gray-100">
              <a href="/notifications" className="text-sm text-blue-600 hover:text-blue-800">
                View all notifications
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}