// router.jsx
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts and Guards
import Layout from "./Layout.jsx";
import ProtectedRoute from "./auth/ProtectedRoutes.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx"; // <-- Add this line

// Pages and Components
import NotfoundPage from "../NotFound.jsx";
import UnauthorizedPage from "../Unauthorized.jsx";
import PageLoader from "./PageLoader.jsx";

import Profile from "./components/profile.jsx";


// Lazy imports
const AuthPage = lazy(() => import("./pages/landingPage/LandingPage.jsx"));
const Dashboard = lazy(() => import("./pages/user/index.jsx"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const AddItem = lazy(() => import("./pages/admin/AddItem.jsx"));
const BookingRequestsPage = lazy(() => import("./pages/admin/BookingRequestsPage.jsx"));
const UserDashBoard = lazy(() => import("./pages/user/UserDashBoard.jsx"));
const BookingPage = lazy(() => import("./pages/user/BookingPage.jsx"));
const MyBookings = lazy(() => import("./pages/user/MyBookings.jsx"));



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotfoundPage />,
    children: [
      // Public routes
      {
        path: "/",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AuthPage />
          </Suspense>
        ),
      },
      {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
      },

      // User routes
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute role="user">
            <Suspense fallback={<PageLoader />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/account/mybookings",
        element: (
          <ProtectedRoute role="user">
            <Suspense fallback={<PageLoader />}>
              <MyBookingss />
            </Suspense>
          </ProtectedRoute>
        ),
      },

      {
        path: "/user/UserDashBoard",
        element: (
          <ProtectedRoute roles={['admin', 'user']}>
            <Suspense fallback={<PageLoader />}>
              <UserDashBoard />
            </Suspense>
          </ProtectedRoute>
        ),
      },

      {
        path: "/user/mybookings",
        element: (
          <ProtectedRoute roles={['admin', 'user']}>
            <Suspense fallback={<PageLoader />}>
              <MyBookings />
            </Suspense>
          </ProtectedRoute>
        ),
      },

      {
        path: "/profile",
        element: (
          <ProtectedRoute roles={['admin', 'user']}>
            <Suspense fallback={<PageLoader />}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        ),
      },

      {
        path: "/book/:id",
        element: (
          <ProtectedRoute roles={['admin', 'user']}>
            <Suspense fallback={<PageLoader />}>
              <BookingPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },

      // 🔹 Admin Layout + Nested Protected Admin Routes
      {
        path: "/admin",
        element: (
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "AdminDashboard",
            element: (
              <Suspense fallback={<PageLoader />}>
                <AdminDashboard />
              </Suspense>
            ),
          },
          {
            path: "additem",
            element: (
              <Suspense fallback={<PageLoader />}>
                <AddItem />
              </Suspense>
            ),
          },
          {
            path: "BookingRequestsPage",
            element: (
              <Suspense fallback={<PageLoader />}>
                <BookingRequestsPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
