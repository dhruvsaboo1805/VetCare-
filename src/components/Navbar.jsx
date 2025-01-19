import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import axios from "axios";

const notf_api = import.meta.env.VITE_API_URL_GET_NOTIFICATION;

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch notifications from the API
  const fetchNotifications = async () => {
    const auth_token = localStorage.getItem("authToken");
    if (!auth_token) {
      console.error("Authorization token not found!");
      return;
    }

    try {
      const response = await axios.get(notf_api, {
        headers: { Authorization: auth_token },
      });

      if (response.status === 200 && response.data.notifications) {
        const data = response.data.notifications;
        setNotifications(data);
        const unread = data.filter((notif) => !notif.read).length;
        setUnreadCount(unread);
      } else {
        console.error("Invalid response data.");
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      read: true,
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Get color based on severity
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 1:
        return "bg-green-100 text-green-600";
      case 2:
        return "bg-yellow-100 text-yellow-600";
      case 3:
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <nav className="ml-44 flex justify-between items-center p-5 bg-white shadow-md md:ml-64 sm:ml-44">
      <div className="text-lg font-semibold">Your App</div>
      <div className="relative">
        {/* Notification Icon */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        >
          <FaBell className="text-2xl text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notification Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md overflow-hidden z-10">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-500 hover:underline mt-2"
              >
                Mark All as Read
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notif, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 border-b ${getSeverityColor(
                      notif.severity
                    )}`}
                  >
                    <div>
                      <p className="text-sm font-medium">{notif.summary}</p>
                      <p className="text-xs text-gray-500">
                        Severity: {notif.severity}
                      </p>
                    </div>
                    {!notif.read && (
                      <span className="text-xs text-red-500 font-bold">Unread</span>
                    )}
                  </div>
                ))
              ) : (
                <p className="p-4 text-sm text-gray-500 text-center">No notifications available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
