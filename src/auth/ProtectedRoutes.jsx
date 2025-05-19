import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // or from context/auth provider

  if (!user) return <Navigate to="/" replace />;

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
