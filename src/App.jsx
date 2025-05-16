// // App.jsx
// import { RouterProvider } from "react-router-dom";
// import router from "./router.jsx";
// import { Toaster } from "react-hot-toast";

// function App() {
//   return (
//     <>
//       <RouterProvider router={router} />
//       <Toaster position="top-right" />
//     </>
//   );
// }

// export default App;

import { createBrowserRouter, Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import NotfoundPage from "../NotFound.jsx";
import Unauthorized from "../Unauthorized.jsx";

// admin routes
import Dashboard from  "./pages/user/Dashboard/index";
// import Dashboard from "./pages/Dashboard/index";
const MyBookings = lazy(() => import("./pages/user/Orders/MyBookings"));

// user routes

// general routes
const Login = lazy(() => import("./pages/landingPage/Login"));
const SignUp = lazy(() => import("./pages/landingPage/SignUp"));

// import HistoryPage from "./components/HistoryPage";
// import ProfilePage from "./components/ProfilePage";
// import SettingsPage from "./components/SettingsPage";
// import BorrowPage from "./components/BorrowPage";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="account/mybookings" element={<MyBookings />} />
          {/* <Route path="/history" element={<HistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/borrow/:id" element={<BorrowPage />} /> */}
        </Routes>
      </Router>

      <Toaster position="top-right" />
    </>
  );
}

