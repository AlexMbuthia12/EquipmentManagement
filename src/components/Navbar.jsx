import { useState } from "react";
import { Link } from "react-router-dom";
import {Bell,Search,User,Menu,X } from "lucide-react";
import SearchComponent from "./Search"
import NotificationComponent from "./Notification"
import { HelpCircle } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import logo from '../assets/images/logo.png';
import useCurrentUser from '../hooks/useCurrentUser';


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useCurrentUser();
  //const { user } = useAuth(); // assuming user has .role
    // ✅ Log the user here
    if (loading) return null; // or a loading spinner
  console.log("Current user:", user);
  const homePath = user?.role === "admin" ? "/admin/AdminDashboard" : "/user/UserDashBoard";
  const navLinks = [
    {
    name: "Home",
    path: homePath,
  },
    { name: "My Bookings", path: "/user/mybookings"},
    { name: "History", path: "/history" },
    { name: "Profile", path: "/profile", mobileOnly: true },
    { name: "Settings", path: "/settings", mobileOnly: true },
    { name: "Logout", path: "/logout", mobileOnly: true }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
      <Link to={homePath}>
        <img
          src={logo}
          alt="Logo"
          className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 transition-all duration-300"
        />
      </Link>
    </div>

            
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.filter(link => !link.mobileOnly).map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors 
                    ${item.active 
                      ? "text-blue-600 border-b-2 border-blue-500" 
                      : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"}`}
                >
                  {item.name}
                  {item.badge && (
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full text-white bg-blue-500">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Right side navigation */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {/* <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
              <input 
                type="text" 
                placeholder="Search equipment..." 
                className="bg-transparent border-none outline-none text-sm flex-1 w-40"
              />
              <Search size={18} className="text-gray-400" />
            </div> */}
            <SearchComponent/>

            <Link
  to="/help"
  className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
  title="Help"
>
  <HelpCircle size={20} className="text-blue-500" />
  <span>Help</span>
</Link>
            
            {/* Notification & User */}
            <div className="flex items-center space-x-4">
                 < NotificationComponent/>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <Link to="/profile" className="block">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-gray-500 hover:bg-gray-50 hover:text-gray-700 block px-4 py-2 text-base font-medium"
              >
                <div className="flex justify-between items-center">
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs rounded-full text-white bg-blue-500">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}