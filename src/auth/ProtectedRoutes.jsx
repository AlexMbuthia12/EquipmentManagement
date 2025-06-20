// import { Navigate } from "react-router-dom";
// const ProtectedRoute = ({ role, children }) => {
  // const user = JSON.parse(localStorage.getItem("user")); // or from context/auth provider

  // if (!user) return <Navigate to="/" replace />;

  // if (role && user.role !== role) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

//   return children;
// };
// export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // or wherever your auth is

const ProtectedRoute = ({ role, roles, children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  const allowedRoles = roles || (role ? [role] : []);

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};


export default ProtectedRoute;
