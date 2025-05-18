import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/user/Dashboard/index";
import Landing from "./pages/landingPage/LandingPage";
import MyBookings from "./pages/user/Orders/MyBookings";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/landingPage/RegisterPage";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        {/*<Route path="/login" element={<LoginPage />} />*/}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="account/mybookings" element={<MyBookings />} />
        </Routes>
      </Router>

      <Toaster position="top-right" />
    </>
  );
}
