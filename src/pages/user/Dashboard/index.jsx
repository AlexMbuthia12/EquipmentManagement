import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Calendar,
  History,
  Package,
  User,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Bell,
} from "lucide-react";
import PROJECTOR from "../../../Assets/Images/PROJECTOR.jpeg";
import PSBHALL from "../../../Assets/Images/PSB.png";
import Screen from "../../../Assets/Images/Screen.jpeg";
import Camera from "../../../Assets/Images/Camera.jpeg";


export default function UserSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Color theme based on provided colors
  const colors = {
    easternBlue: "#1e81b0", // Primary
    greenWhite: "#eeeee4", // Background
    burntSienna: "#e28743", // Accent
    tacao: "#eab676", // Light accent
    glacier: "#76b5c5", // Secondary
    eternity: "#21130d", // Dark text
    burntUmber: "#873e23", // Dark accent
    powderBlue: "#abdbe3", // Light secondary
    catalinaBlue: "#063970", // Dark primary
    chathamsBlue: "#154c79", // Medium primary
  };

  const menuItems = [
    { icon: <Home size={20} />, name: "Dashboard", badge: false },
    { icon: <Calendar size={20} />, name: "My Bookings", badge: 3 },
    { icon: <History size={20} />, name: "History", badge: false },
    { icon: <User size={20} />, name: "Profile", badge: false },
    // { icon: <Settings size={20} />, name: 'Settings', badge: false },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button - visible on smaller screens */}
      <button
        className="fixed z-50 top-4 left-4 p-2 bg-white rounded-md shadow-md md:hidden"
        onClick={toggleMobileSidebar}
      >
        <Menu size={24} color={colors.catalinaBlue} />
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar - changes with screen size */}
      <div
        className={`fixed md:relative z-50 h-full transition-all duration-300 ease-in-out
                   ${isCollapsed ? "w-20" : "w-64"} 
                   ${isMobileOpen ? "left-0" : "-left-full md:left-0"}`}
      >
        <div className="h-full flex flex-col bg-white shadow-lg">
          {/* Header section */}
          <div
            className="flex items-center justify-between p-4"
            style={{ backgroundColor: colors.catalinaBlue }}
          >
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.glacier }}
              >
                <User size={24} color="white" />
              </div>
              {!isCollapsed && (
                <div className="ml-3 text-white">
                  <p className="font-semibold">John Doe</p>
                  <p className="text-xs opacity-80">User</p>
                </div>
              )}
            </div>

            {/* Close button for mobile */}
            <button
              className="text-white md:hidden"
              onClick={toggleMobileSidebar}
            >
              <X size={24} />
            </button>

            {/* Collapse button for desktop */}
            <button
              className="hidden md:block text-white"
              onClick={toggleSidebar}
            >
              {isCollapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>

          {/* Navigation menu */}
          <nav
            className="flex-1 overflow-y-auto py-4"
            style={{ backgroundColor: colors.greenWhite }}
          >
            <ul className="space-y-2 px-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center px-3 py-3 rounded-md hover:bg-gray-100 transition-colors
                             ${index === 0 ? "bg-gray-100" : ""}`}
                    style={{ color: colors.eternity }}
                  >
                    <div
                      className="flex items-center justify-center"
                      style={{ color: colors.easternBlue }}
                    >
                      {item.icon}
                    </div>
                    {!isCollapsed && (
                      <div className="ml-3 flex-1 flex justify-between items-center">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span
                            className="px-2 py-1 text-xs rounded-full text-white"
                            style={{ backgroundColor: colors.burntSienna }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Notifications section */}
          <div className="p-4 border-t border-gray-200">
            <div
              className="flex items-center p-3 rounded-md"
              style={{ backgroundColor: colors.powderBlue }}
            >
              <Bell size={20} style={{ color: colors.catalinaBlue }} />
              {!isCollapsed && (
                <div className="ml-3">
                  <p
                    className="text-sm font-medium"
                    style={{ color: colors.catalinaBlue }}
                  >
                    2 New Notifications
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer section */}
          <div
            className="p-4 border-t border-gray-200"
            style={{ backgroundColor: colors.greenWhite }}
          >
            <a
              href="#"
              className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <LogOut size={20} style={{ color: colors.burntUmber }} />
              {!isCollapsed && (
                <span className="ml-3" style={{ color: colors.burntUmber }}>
                  Logout
                </span>
              )}
            </a>
          </div>
        </div>
      </div>

      {/* Main content area - just a placeholder */}
      <div className="flex-1 p-10 ml-0 md:ml-0 transition-all duration-300">
        <div className="p-4 rounded-lg bg-white shadow mb-6">
          <h1
            className="text-2xl font-bold"
            style={{ color: colors.catalinaBlue }}
          >
            Equipment Booking System
          </h1>
          <p className="text-gray-600">
            Welcome to your dashboard! This is the main content area that would
            display your booking information.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="bg-white p-6 rounded-lg shadow relative">
    {/* Status Icon */}
    <div className="absolute top-3 right-3">
      <div className="flex items-center">
        <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
        <span className="text-xs text-gray-600">Available</span>
      </div>
    </div>
    
    {/* Image Division */}
    <div className="mb-4 h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
      <img 
        src={PSBHALL} 
        alt="PSB HALL" 
        className="w-full h-full object-cover"
      />
    </div>
    
    <h2
      className="text-lg font-semibold mb-2"
      style={{ color: colors.easternBlue }}
    >
      PSB HALL
    </h2>
    <p className="text-sm text-gray-600 mb-4">Your recent equipment bookings would appear here.</p>
    
    {/* Borrow Button */}
    <button 
      className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      style={{ backgroundColor: colors.easternBlue }}
    >
      Borrow Now
    </button>
  </div>
  
  <div className="bg-white p-6 rounded-lg shadow relative">
    {/* Status Icon */}
    <div className="absolute top-3 right-3">
      <div className="flex items-center">
        <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
        <span className="text-xs text-gray-600">Not Available</span>
      </div>
    </div>
    
    {/* Image Division */}
    <div className="mb-4 h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
      <img 
        src={PROJECTOR} 
        alt="PROJECTOR" 
        className="w-full h-full object-cover"
      />
    </div>
    
    <h2
      className="text-lg font-semibold mb-2"
      style={{ color: colors.easternBlue }}
    >
      PROJECTOR
    </h2>
    <p className="text-sm text-gray-600 mb-4">Your recent equipment bookings would appear here.</p>
    
    {/* Borrow Button */}
    <button 
      className="w-full py-2 px-4 bg-gray-400 text-white rounded-md cursor-not-allowed"
    >
      Not Available
    </button>
  </div>
  
  <div className="bg-white p-6 rounded-lg shadow relative">
    {/* Status Icon */}
    <div className="absolute top-3 right-3">
      <div className="flex items-center">
        <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
        <span className="text-xs text-gray-600">Under Maintenance</span>
      </div>
    </div>
    
    {/* Image Division */}
    <div className="mb-4 h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
      <img 
        src={Screen}
        alt="SCREEN" 
        className="w-full h-full object-cover"
      />
    </div>
    
    <h2
      className="text-lg font-semibold mb-2"
      style={{ color: colors.easternBlue }}
    >
      WHITE  BOARD SCREEN
    </h2>
    <p className="text-sm text-gray-600 mb-4">Available equipment for booking would be listed here.</p>
    
    {/* Borrow Button */}
    <button 
      className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md cursor-not-allowed"
    >
      Under Maintenance
    </button>
  </div>
  
  <div className="bg-white p-6 rounded-lg shadow relative">
    {/* Status Icon */}
    <div className="absolute top-3 right-3">
      <div className="flex items-center">
        <div className="h-3 w-3 rounded-full bg-purple-500 mr-1"></div>
        <span className="text-xs text-gray-600">Borrowed</span>
      </div>
    </div>
    
    {/* Image Division */}
    <div className="mb-4 h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
      <img 
        src={Camera} 
        alt="CAMERA" 
        className="w-full h-full object-cover"
      />
    </div>
    
    <h2
      className="text-lg font-semibold mb-2"
      style={{ color: colors.easternBlue }}
    >
      CAMERA
    </h2>
    <p className="text-sm text-gray-600 mb-4">Your recent equipment bookings would appear here.</p>
    
    {/* Borrow Button */}
    <button 
      className="w-full py-2 px-4 bg-purple-500 text-white rounded-md cursor-not-allowed"
    >
      Currently Borrowed
    </button>
  </div>
  
  <div className="bg-white p-6 rounded-lg shadow relative">
    {/* Status Icon */}
    <div className="absolute top-3 right-3">
      <div className="flex items-center">
        <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
        <span className="text-xs text-gray-600">Available</span>
      </div>
    </div>
    
    {/* Image Division */}
    <div className="mb-4 h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
      <img 
        src="/api/placeholder/300/200" 
        alt="OFFICIAL SEATS" 
        className="w-full h-full object-cover"
      />
    </div>
    
    <h2
      className="text-lg font-semibold mb-2"
      style={{ color: colors.easternBlue }}
    >
      OFFICIAL SEATS
    </h2>
    <p className="text-sm text-gray-600 mb-4">Available equipment for booking would be listed here.</p>
    
    {/* Borrow Button */}
    <button 
      className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      style={{ backgroundColor: colors.easternBlue }}
    >
      Borrow Now
    </button>
  </div>
   
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="mb-4 h-40 bg-gray-100 rounded-md flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </div>
    
    <h2
      className="text-lg font-semibold mb-2 text-center"
      style={{ color: colors.easternBlue }}
    >
      View More
    </h2>
    <p className="text-sm text-gray-600 mb-4 text-center">Browse all available equipment for booking</p>
    
    <button 
      className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
    >
      See All Equipment
    </button>
  </div>
</div>
      </div>
    </div>
  );
}
Dash