import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  User,
  Settings,
  Heart,
  Eye,
  MapPin,
  Users,
  Monitor,
  Music
} from "lucide-react";

// Import the Navbar component
import Navbar from "../../Both/Navbar/Navbar";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");

  // Modern color theme
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

  // Equipment categories
  const equipmentCategories = [
    { 
      name: "HALLS", 
      status: "available", 
      statusColor: colors.success,
      bgColor: "from-green-400 to-teal-500",
      description: "Various event spaces including PSB Hall, Conference Hall, Meeting Boardroom and other rooms",
      items: 4,
      availableItems: 3,
      icon: <MapPin size={24} />,
      imgUrl: "/api/placeholder/400/320"
    },
    { 
      name: "SEATS", 
      status: "available", 
      statusColor: colors.success,
      bgColor: "from-blue-400 to-indigo-500",
      description: "Official seats, plastic seats, hired seats and others for events",
      items: 12,
      availableItems: 8,
      icon: <Users size={24} />,
      imgUrl: "/api/placeholder/400/320"  
    },
    { 
      name: "PROJECTORS & SCREENS", 
      status: "maintenance", 
      statusColor: colors.warning,
      bgColor: "from-yellow-400 to-amber-500",
      description: "High-definition projectors with various screens and display options",
      items: 6,
      availableItems: 3,
      icon: <Monitor size={24} />,
      imgUrl: "/api/placeholder/400/320"  
    },
    { 
      name: "SOUND SYSTEMS", 
      status: "available", 
      statusColor: colors.success,
      bgColor: "from-purple-400 to-indigo-500",
      description: "Audio equipment including microphones, speakers, and mixing boards",
      items: 8,
      availableItems: 5,
      icon: <Music size={24} />,
      imgUrl: "/api/placeholder/400/320"  
    }
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

  // Filter equipment based on active tab
  const filteredCategories = activeTab === "all" 
    ? equipmentCategories 
    : equipmentCategories.filter(item => item.status === activeTab);

  // Calculate totals for summary stats
  const totalItems = equipmentCategories.reduce((sum, category) => sum + category.items, 0);
  const totalAvailable = equipmentCategories.reduce((sum, category) => sum + category.availableItems, 0);
  const totalBorrowed = totalItems - totalAvailable - 3; // Assuming 3 under maintenance
  const totalMaintenance = 3; // Example number

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Include the Navbar component */}
      <Navbar />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Equipment Collections</h1>
          <p className="text-gray-500">Browse equipment categories and find what you need</p>
        </div>

        {/* Status Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide">
            {["all", "available", "borrowed", "maintenance", "unavailable"].map((tab) => (
              <button
                key={tab}
                className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab !== "all" && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                    {equipmentCategories.filter(item => item.status === tab).length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Equipment", value: totalItems, icon: <BookOpen size={20} />, color: "bg-blue-50 text-blue-500", gradient: "from-blue-400 to-indigo-500" },
            { label: "Available Now", value: totalAvailable, icon: <Calendar size={20} />, color: "bg-green-50 text-green-500", gradient: "from-green-400 to-teal-500" },
            { label: "Currently Borrowed", value: totalBorrowed, icon: <User size={20} />, color: "bg-purple-50 text-purple-500", gradient: "from-purple-400 to-indigo-500" },
            { label: "Under Maintenance", value: totalMaintenance, icon: <Settings size={20} />, color: "bg-yellow-50 text-yellow-500", gradient: "from-yellow-400 to-amber-500" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}>
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm">{stat.label}</h3>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Equipment Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                {/* Category Image with Gradient Overlay */}
                <div className="h-56 relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.bgColor} opacity-80`}></div>
                  <img 
                    src={category.imgUrl} 
                    alt={category.name} 
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                  <div className="absolute top-4 left-4 text-white">
                    <div className="bg-white bg-opacity-30 rounded-full p-3 backdrop-blur-sm">
                      {category.icon}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-xs font-medium shadow-sm flex items-center">
                    <div className="h-2 w-2 rounded-full mr-1" style={{ backgroundColor: category.statusColor }}></div>
                    {getStatusText(category.status)}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                    <div className="flex space-x-3 mt-2">
                      <span className="text-white text-sm bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {category.items} Items
                      </span>
                      <span className="text-white text-sm bg-green-500/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {category.availableItems} Available
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-6">{category.description}</p>
                  
                  <Link 
                    to={`/equipment-category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block w-full py-3 px-4 rounded-lg text-white text-sm font-medium transition-colors text-center bg-blue-600 hover:bg-blue-700"
                  >
                    View All {category.name}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <BookOpen size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">No categories found</h3>
              <p className="text-gray-500 mt-2">There are no categories matching your current filter.</p>
              <button 
                onClick={() => setActiveTab("all")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                View all collections
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}