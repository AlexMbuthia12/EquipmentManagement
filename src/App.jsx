import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/user/Dashboard/index";
import MyBookings from "./pages/user/Orders/MyBookings";
// import HistoryPage from "./components/HistoryPage";
// import ProfilePage from "./components/ProfilePage";
// import SettingsPage from "./components/SettingsPage";
// import BorrowPage from "./components/BorrowPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="account/mybookings" element={<MyBookings />} />
        {/* <Route path="/history" element={<HistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/borrow/:id" element={<BorrowPage />} /> */}
      </Routes>
    </Router>
  );
}