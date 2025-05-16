import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("access_token");
  const userRole = localStorage.getItem("user_role");

  if (!token) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
