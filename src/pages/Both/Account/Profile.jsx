import { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Camera,
  Settings,
  LogOut,
  Clock,
  FileText,
  Shield,
  ChevronRight
} from "lucide-react";
import Navbar from "../../Both/Navbar/Navbar";
export default function ProfilePage({ userData = defaultUserData }) {
  const [activeTab, setActiveTab] = useState("personal");
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <Navbar/>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600">
            <button className="absolute right-4 top-4 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100">
              <Camera size={18} className="text-gray-700" />
            </button>
          </div>
          
          {/* Profile Avatar */}
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                {userData.avatar ? (
                  <img 
                    src={userData.avatar} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={48} className="text-white" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow hover:bg-gray-100">
                <Edit size={16} className="text-gray-700" />
              </button>
              </div>
              <br/>
              
           
          </div>
        
          
          {/* Edit Profile Button */}
          <div className="flex justify-end p-4 pt-16">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
              <Edit size={16} className="mr-2" />
              Edit Profile
            </button>
          </div>
        </div>
        
        {/* Profile Information */}
        <div className="px-8 pb-8">
          <div className="mt-8">
            <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
            <p className="text-gray-600">{userData.title}</p>
          </div>
          
          {/* Profile Tabs */}
          <div className="mt-8 border-b border-gray-200">
            <div className="flex space-x-8">
              <button 
                onClick={() => handleTabChange("personal")}
                className={`py-4 px-1 font-medium text-sm ${
                  activeTab === "personal" 
                    ? "border-b-2 border-blue-500 text-blue-600" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Personal Information
              </button>
              <button 
                onClick={() => handleTabChange("activity")}
                className={`py-4 px-1 font-medium text-sm ${
                  activeTab === "activity" 
                    ? "border-b-2 border-blue-500 text-blue-600" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Activity
              </button>
              <button 
                onClick={() => handleTabChange("settings")}
                className={`py-4 px-1 font-medium text-sm ${
                  activeTab === "settings" 
                    ? "border-b-2 border-blue-500 text-blue-600" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Settings
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === "personal" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User size={18} className="text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p>{userData.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail size={18} className="text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p>{userData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone size={18} className="text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p>{userData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={18} className="text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p>{userData.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={18} className="text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Joined</p>
                        <p>{userData.joinDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-4">Work Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p>{userData.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <p>{userData.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>
                        <p className="text-sm text-gray-500">Employee ID</p>
                        <p>{userData.employeeId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "activity" && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {userData.activity.map((item, index) => (
                    <div key={index} className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className="rounded-full bg-blue-100 p-2 mr-4">
                        <Clock size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "settings" && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="rounded-full bg-blue-100 p-2 mr-4">
                          <Settings size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Account Preferences</p>
                          <p className="text-sm text-gray-600">Update your account settings</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="rounded-full bg-blue-100 p-2 mr-4">
                          <Shield size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Security</p>
                          <p className="text-sm text-gray-600">Manage your password and security</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="rounded-full bg-blue-100 p-2 mr-4">
                          <FileText size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Notifications</p>
                          <p className="text-sm text-gray-600">Configure your notification preferences</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="rounded-full bg-red-100 p-2 mr-4">
                          <LogOut size={16} className="text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">Logout</p>
                          <p className="text-sm text-gray-600">Sign out of your account</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Default user data for demonstration
const defaultUserData = {
  name: "Alex Johnson",
  title: "Senior Asset Manager",
  email: "alex.johnson@assetflow.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  joinDate: "January 15, 2023",
  department: "Operations",
  role: "Asset Manager",
  employeeId: "EMP-2023-0042",
  avatar: null, // URL to avatar image
  activity: [
    {
      title: "Equipment Booking",
      description: "Booked Excavator XC-200 for Project Alpha",
      time: "Today at 2:30 PM"
    },
    {
      title: "Maintenance Request",
      description: "Submitted maintenance request for Loader L-100",
      time: "Yesterday at 10:15 AM"
    },
    {
      title: "Document Upload",
      description: "Uploaded inspection report for Crane C-300",
      time: "May 12, 2025"
    },
    {
      title: "Training Completed",
      description: "Completed Equipment Safety Training Module",
      time: "May 5, 2025"
    }
  ]
};