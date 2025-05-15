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
  Clock,
  CheckCircle,
  XCircle,
  Loader,
  ArrowLeft,
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import Navbar from "../../Both/Navbar/Navbar";

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState("active");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  // Modern color theme inspired by Dribbble (matching the dashboard)
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

  // Bookings data
  const bookingsData = [
    {
      id: "BK-2023-001",
      equipment: "PSB HALL",
      status: "upcoming",
      bookingDate: "May 14, 2025",
      returnDate: "May 16, 2025",
      purpose: "Department Annual Conference",
      approvedBy: "Sarah Johnson"
    },
    {
      id: "BK-2023-002",
      equipment: "OFFICIAL SEATS",
      status: "active",
      bookingDate: "May 12, 2025",
      returnDate: "May 15, 2025",
      purpose: "Team Building Workshop",
      approvedBy: "Michael Brown"
    },
    {
      id: "BK-2023-003",
      equipment: "PROJECTOR",
      status: "completed",
      bookingDate: "May 5, 2025",
      returnDate: "May 8, 2025",
      purpose: "Client Presentation",
      approvedBy: "David Williams"
    },
    {
      id: "BK-2023-004",
      equipment: "SCREEN",
      status: "cancelled",
      bookingDate: "April 28, 2025",
      returnDate: "May 1, 2025",
      purpose: "Training Session",
      approvedBy: "Jennifer Davis"
    }
  ];

  const getStatusDetails = (status) => {
    switch(status) {
      case "upcoming":
        return {
          label: "Upcoming",
          color: colors.purple,
          bgColor: "bg-purple-50",
          textColor: "text-purple-500",
          icon: <Calendar size={18} />
        };
      case "active":
        return {
          label: "Active",
          color: colors.primary,
          bgColor: "bg-blue-50",
          textColor: "text-blue-500",
          icon: <Loader size={18} />
        };
      case "completed":
        return {
          label: "Completed",
          color: colors.success,
          bgColor: "bg-green-50",
          textColor: "text-green-500",
          icon: <CheckCircle size={18} />
        };
      case "cancelled":
        return {
          label: "Cancelled",
          color: colors.danger,
          bgColor: "bg-red-50",
          textColor: "text-red-500",
          icon: <XCircle size={18} />
        };
      default:
        return {
          label: status,
          color: colors.textMuted,
          bgColor: "bg-gray-50",
          textColor: "text-gray-500",
          icon: <Clock size={18} />
        };
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Filter bookings based on active tab
  const filteredBookings = activeTab === "all" 
    ? bookingsData 
    : bookingsData.filter(booking => booking.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <Navbar/>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
          <p className="text-gray-500">Manage your current equipment reservations</p>
        </div>

        {/* Status Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {["all", "upcoming", "active", "completed", "cancelled"].map((tab) => (
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
            { label: "Total Bookings", value: "12", icon: <Calendar size={20} />, color: "bg-blue-50 text-blue-500" },
            { label: "Active Now", value: "1", icon: <Loader size={20} />, color: "bg-green-50 text-green-500" },
            { label: "Upcoming", value: "2", icon: <ArrowRight size={20} />, color: "bg-purple-50 text-purple-500" },
            { label: "Past Bookings", value: "9", icon: <ArrowLeft size={20} />, color: "bg-gray-50 text-gray-500" }
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
        
        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Equipment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Return Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking, index) => {
                    const statusDetails = getStatusDetails(booking.status);
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.equipment}</div>
                          <div className="text-xs text-gray-500">{booking.purpose}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusDetails.bgColor} ${statusDetails.textColor}`}>
                            {statusDetails.icon && <span className="mr-1">{statusDetails.icon}</span>}
                            {statusDetails.label}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.bookingDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.returnDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">View</button>
                            {booking.status === "upcoming" && (
                              <>
                                <button className="text-yellow-600 hover:text-yellow-900">Edit</button>
                                <button className="text-red-600 hover:text-red-900">Cancel</button>
                              </>
                            )}
                            {booking.status === "active" && (
                              <button className="text-green-600 hover:text-green-900">Check-in</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-500">
                      <div className="flex flex-col items-center">
                        <Calendar size={40} className="text-gray-300 mb-2" />
                        <p>No bookings found for this status.</p>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                          Make a New Booking
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Booking Details Modal (Hidden by default) */}
        {/* This would be activated when a user clicks "View" */}
        {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Booking Details</h3>
              <button className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              {/* Modal content would go here */}
            {/* </div> 
          </div>
        </div> */}
        
        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredBookings.length}</span> of <span className="font-medium">{filteredBookings.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}