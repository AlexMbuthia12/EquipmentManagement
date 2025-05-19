import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./auth/ProtectedRoutes.jsx";
import Layout from "./Layout.jsx";

import NotfoundPage from "../NotFound.jsx";
import PageLoader from "./PageLoader.jsx";
import UnauthorizedPage from "../Unauthorized.jsx";

// admin routes

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));

// user routes
const Dashboard = lazy(() => import("./pages/user/Dashboard/index"));
const MyBookings = lazy(() => import("./pages/user/Orders/MyBookings"));

// general routes
const AuthPage = lazy(() => import("./pages/landingPage/LandingPage.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotfoundPage />,
    children: [
      // unauthorised user

      {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
      },

      {
        path: "/",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AuthPage />
          </Suspense>
        ),
      },

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
              <MyBookings />
            </Suspense>
          </ProtectedRoute>
        ),
      },

      //admin routes
      {
        path: "/admin/dashboard",
        element: (
          // <ProtectedRoute role="admin">
          <Suspense fallback={<PageLoader />}>
            <AdminDashboard />
          </Suspense>
          // </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
