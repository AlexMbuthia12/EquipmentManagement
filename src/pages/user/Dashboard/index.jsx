import { useState } from "react";
import {
  Home,
  Calendar,
  History,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Heart,
  Eye,
  BookOpen,
  Grid,
  Menu,
  X
} from "lucide-react";
import PSB from '../../../Assets/Images/PSB.png'
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modern color theme inspired by Dribbble
  const colors = {
    primary: "#0d6efd",
    secondary: "#7749f8",
    background: "#f8f9fa",
    cardBg: "#ffffff",
    textDark: "#212529",
    textMuted: "#6c757d",
    accent: "#ff5c85",
    success: "#10b981",
    warning: "#fbbf24",
    danger: "#ef4444",
    purple: "#8b5cf6",
    border: "#e9ecef"
  };

  // Equipment items
  const equipmentItems = [
    { 
      name: "PSB HALL", 
      status: "available", 
      statusColor: colors.success, 
      description: "Large event space with stage and seating for 200 people",
      likes: 556,
      views: "218k" 
    },
    { 
      name: "PROJECTOR", 
      status: "unavailable", 
      statusColor: colors.danger, 
      description: "High-definition digital projector with HDMI connection",
      likes: 606,
      views: "239k" 
    },
    { 
      name: "SCREEN", 
      status: "maintenance", 
      statusColor: colors.warning, 
      description: "Portable projection screen with adjustable height",
      likes: 980,
      views: "634k" 
    },
    // { 
    //   name: "CAMERA", 
    //   status: "borrowed", 
    //   statusColor: colors.purple, 
    //   description: "Professional DSLR camera with video capabilities",
    //   likes: 449,
    //   views: "141k" 
    // },
    { 
      name: "OFFICIAL SEATS", 
      status: "available", 
      statusColor: colors.success, 
      description: "Ergonomic office chairs for events and meetings",
      likes: 325,
      views: "98k" 
    },
  ];

  const getStatusText = (status) => {
    switch(status) {
      case "available": return "Available";
      case "unavailable": return "Not Available";
      case "maintenance": return "Under Maintenance";
      case "borrowed": return "Currently Borrowed";
      default: return status;
    }
  };

  const getButtonColor = (status) => {
    switch(status) {
      case "available": return colors.primary;
      case "unavailable": return colors.textMuted;
      case "maintenance": return colors.warning;
      case "borrowed": return colors.purple;
      default: return colors.textMuted;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">ASSETFLOW</h1>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {[
                  { name: "Dashboard", active: true },
                  { name: "My Bookings", badge: 3 },
                  { name: "History" }
                  
                ].map((item, index) => (
                  <a
                    key={index}
                    href="#"
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
                  </a>
                ))}
              </div>
            </div>
            
            {/* Right side navigation */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
                <input 
                  type="text" 
                  placeholder="Search equipment..." 
                  className="bg-transparent border-none outline-none text-sm flex-1 w-40"
                />
                <Search size={18} className="text-gray-400" />
              </div>
              
              {/* Notification & User */}
              <div className="flex items-center space-x-4">
                <button className="relative p-2 rounded-full hover:bg-gray-50">
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                {/* Profile Dropdown */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
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
              {[
                "Dashboard",
                "My Bookings",
                "History",
                "Profile",
                "Settings",
                "Logout"
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-500 hover:bg-gray-50 hover:text-gray-700 block px-3 py-2 text-base font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Equipment Dashboard</h1>
          <p className="text-gray-500">Browse and book equipment across various categories</p>
        </div>

        {/* Status Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {["all", "available", "borrowed", "maintenance"].map((tab) => (
              <button
                key={tab}
                className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Equipment", value: "86", icon: <BookOpen size={20} />, color: "bg-blue-50 text-blue-500" },
            { label: "Available Now", value: "42", icon: <Calendar size={20} />, color: "bg-green-50 text-green-500" },
            { label: "Currently Borrowed", value: "24", icon: <User size={20} />, color: "bg-purple-50 text-purple-500" },
            { label: "Under Maintenance", value: "12", icon: <Settings size={20} />, color: "bg-yellow-50 text-yellow-500" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm">{stat.label}</h3>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipmentItems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
              {/* Equipment Image */}
              <div className="h-48 bg-gray-100 relative">
                <img 
                  src={PSB} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-xs font-medium shadow-sm flex items-center">
                  <div className={`h-2 w-2 rounded-full mr-1`} style={{ backgroundColor: item.statusColor }}></div>
                  {getStatusText(item.status)}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                
                {/* <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Heart size={14} className="mr-1" />
                    {item.likes}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Eye size={14} className="mr-1" />
                    {item.views}
                  </div>
                </div> */}
                
                <button 
                  className="w-full py-2 px-4 rounded-lg text-white text-sm font-medium transition-colors"
                  style={{ 
                    backgroundColor: item.status === "available" ? colors.primary : getButtonColor(item.status),
                    cursor: item.status === "available" ? "pointer" : "not-allowed"
                  }}
                >
                  {item.status === "available" ? "Borrow Now" : getStatusText(item.status)}
                </button>
              </div>
            </div>
          ))}
          
          {/* View more card */}
          {/* <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center justify-center p-6">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <Grid size={24} className="text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">View More</h3>
            <p className="text-sm text-gray-500 mb-4 text-center">Browse all available equipment for booking</p>
            <button className="py-2 px-4 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors">
              See All Equipment
            </button>
          </div> */}
        </div>
      </main>
    </div>
  );
}
