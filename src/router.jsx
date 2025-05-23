// router.jsx
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedRoute from "./auth/ProtectedRoutes.jsx";
import Layout from "./Layout.jsx";

import NotfoundPage from "../NotFound.jsx";
import PageLoader from "./PageLoader.jsx";
import UnauthorizedPage from "../Unauthorized.jsx";
import SignUp from "./pages/landingPage/SignUp.jsx";

// Lazy imports
const AuthPage = lazy(() => import("./pages/landingPage/LandingPage.jsx"));
const RegisterPage = lazy(() => import("./pages/landingPage/RegisterPage.jsx"));
const Dashboard = lazy(() => import("./pages/user/Dashboard/index.jsx"));
const MyBookings = lazy(() => import("./pages/user/Orders/MyBookings.jsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const AddItem = lazy(() => import("./pages/admin/AddItem.jsx"));

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Layout />,
    errorElement: <NotfoundPage />,
    children: [
      // General (unauthenticated)
      {
        path: "/",
        element: (
          <Suspense fallback={<PageLoader />}><AuthPage /></Suspense>
        ),
      },
      {
        path: "/SignUp",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SignUp />
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
              <MyBookings />
            </Suspense>
          </ProtectedRoute>
        ),
      },

      // Admin routes
      {
      path: "/admin/AdminDashboard",
element: (<ProtectedRoute role="admin"><Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense></ProtectedRoute>),
      },
      {
        path: "/admin/additem",
        element: (
          <ProtectedRoute role="admin">
            <Suspense fallback={<PageLoader />}>
              <AddItem />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
