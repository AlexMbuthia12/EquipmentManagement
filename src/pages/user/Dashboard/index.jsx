import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  User,
  Settings,
  Heart,
  Eye
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

  // Equipment items
  const equipmentItems = [
    { 
      name: "PSB HALL", 
      status: "available", 
      statusColor: colors.success,
      bgColor: "from-green-400 to-teal-500",
      description: "Large event space with stage and seating for 200 people",
      likes: 556,
      views: "218k",
      imgUrl: "/api/placeholder/400/320" 
    },
    { 
      name: "PROJECTOR", 
      status: "unavailable", 
      statusColor: colors.danger,
      bgColor: "from-red-400 to-pink-500",
      description: "High-definition digital projector with HDMI connection",
      likes: 606,
      views: "239k",
      imgUrl: "/api/placeholder/400/320"  
    },
    { 
      name: "SCREEN", 
      status: "maintenance", 
      statusColor: colors.warning,
      bgColor: "from-yellow-400 to-amber-500",
      description: "Portable projection screen with adjustable height",
      likes: 980,
      views: "634k",
      imgUrl: "/api/placeholder/400/320"  
    },
    { 
      name: "OFFICIAL SEATS", 
      status: "available", 
      statusColor: colors.success,
      bgColor: "from-green-400 to-teal-500",
      description: "Ergonomic office chairs for events and meetings",
      likes: 325,
      views: "98k",
      imgUrl: "/api/placeholder/400/320"  
    },
    { 
      name: "MICROPHONES", 
      status: "borrowed", 
      statusColor: colors.purple,
      bgColor: "from-purple-400 to-indigo-500",
      description: "Wireless microphones with receiver system",
      likes: 449,
      views: "141k",
      imgUrl: "/api/placeholder/400/320"  
    },
    { 
      name: "SOUND SYSTEM", 
      status: "available", 
      statusColor: colors.success,
      bgColor: "from-green-400 to-teal-500",
      description: "Complete audio system with speakers and mixer",
      likes: 512,
      views: "176k",
      imgUrl: "/api/placeholder/400/320"  
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

  // Filter equipment based on active tab
  const filteredEquipment = activeTab === "all" 
    ? equipmentItems 
    : equipmentItems.filter(item => item.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Include the Navbar component */}
      <Navbar />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Equipment Dashboard</h1>
          <p className="text-gray-500">Browse and book equipment across various categories</p>
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
                    {equipmentItems.filter(item => item.status === tab).length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Equipment", value: equipmentItems.length, icon: <BookOpen size={20} />, color: "bg-blue-50 text-blue-500", gradient: "from-blue-400 to-indigo-500" },
            { label: "Available Now", value: equipmentItems.filter(item => item.status === "available").length, icon: <Calendar size={20} />, color: "bg-green-50 text-green-500", gradient: "from-green-400 to-teal-500" },
            { label: "Currently Borrowed", value: equipmentItems.filter(item => item.status === "borrowed").length, icon: <User size={20} />, color: "bg-purple-50 text-purple-500", gradient: "from-purple-400 to-indigo-500" },
            { label: "Under Maintenance", value: equipmentItems.filter(item => item.status === "maintenance").length, icon: <Settings size={20} />, color: "bg-yellow-50 text-yellow-500", gradient: "from-yellow-400 to-amber-500" }
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
        
        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.length > 0 ? (
            filteredEquipment.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                {/* Equipment Image with Gradient Overlay */}
                <div className="h-48 relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.bgColor} opacity-80`}></div>
                  <img 
                    src={item.imgUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-xs font-medium shadow-sm flex items-center">
                    <div className="h-2 w-2 rounded-full mr-1" style={{ backgroundColor: item.statusColor }}></div>
                    {getStatusText(item.status)}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white drop-shadow-md">{item.name}</h3>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-4 h-12 line-clamp-2">{item.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Heart size={14} className="mr-1" />
                      {item.likes}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Eye size={14} className="mr-1" />
                      {item.views}
                    </div>
                  </div>
                  
                  <Link 
                    to={item.status === "available" ? `/borrow/${index}` : "#"}
                    className={`block w-full py-2 px-4 rounded-lg text-white text-sm font-medium transition-colors text-center ${
                      item.status === "available" 
                        ? "bg-blue-600 hover:bg-blue-700" 
                        : ""
                    }`}
                    style={{ 
                      backgroundColor: item.status === "available" ? undefined : getButtonColor(item.status),
                      cursor: item.status === "available" ? "pointer" : "not-allowed"
                    }}
                  >
                    {item.status === "available" ? "Borrow Now" : getStatusText(item.status)}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <BookOpen size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">No equipment found</h3>
              <p className="text-gray-500 mt-2">There are no items matching your current filter.</p>
              <button 
                onClick={() => setActiveTab("all")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                View all equipment
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}