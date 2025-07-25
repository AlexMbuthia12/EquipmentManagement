import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeClosed, Eye } from "lucide-react";
import toast from "react-hot-toast";
import axios from "../../axios";
import { useAuth } from "../../auth/AuthContext"; 

const Login = ({ onForgot }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAsAdmin, setLoginAsAdmin] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error on change
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
// ✅ Confirm what Vite is injecting
  console.log("Axios Base URL:", import.meta.env.VITE_API_BASE_URL);
    
  const { email, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let newErrors = {};

    // Validate inputs
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email.";

    if (!password) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('/api/login', {
  email,
  password,
  isAdmin: loginAsAdmin,
  }, {
  withCredentials: true,
});
console.log("Login response:", response);

// ✅fetch user. Use a different variable name here✅ Immediately fetch user via /auth/me
const meResponse = await axios.get('/auth/me', { withCredentials: true, });
const userData = meResponse.data;
const userRole = userData.role;
setUser(userData); //manually ensure context updates so ProtectedRoutes and others know you're logged in

console.log(userData.role);

      if (loginAsAdmin && userRole !== "admin") {
        toast.error("Access denied. This is not an admin account.");
        return;
      }
      // ✅ Save user
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Login successful!");
      toast.success(`Welcome, ${userData.userName}!`);

//       setErrors({}); // Clear old errors
//       localStorage.setItem("user", JSON.stringify({
//   ...userData,
//   role: userData.role, // "admin" or "user"
// }));

      // Redirect based on role
      if (userRole === "admin") {
        navigate("/admin/AdminDashboard");
      } else {
        navigate("/user/UserDashBoard");
      }

    }// catch (error) {
    //   toast.error("Login failed. Check your credentials.");
    //   console.error(error);
    // } 
    catch (error) {
  const message =
    error.response?.data?.message || "Login failed! Check your credentials.";
  toast.error(message); // Show the message from backend
  console.error("Login error:", error);
}
    
    finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-md flex flex-col gap-5 text-[#006b3c]"
    >
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold">Log in</h2>
        <p className="text-sm mt-1">
          Welcome to the Equipment Portal, enter your credentials to continue
        </p>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-semibold text-sm">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          placeholder="e.g. you@example.com"
          onChange={handleInputChange}
          className={`p-4 border rounded-md outline-none focus:ring-2 focus:ring-[#006b3c] ${
            errors.email ? "border-red-500" : "border-[#006b3c]"
          }`}
        />
        <p className="text-xs text-red-500 min-h-[1rem]">{errors.email}</p>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1 relative">
        <label htmlFor="password" className="font-semibold text-sm">
          Password
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          name="password"
          placeholder="Enter your password"
          onChange={handleInputChange}
          className={`p-3 border rounded-md outline-none focus:ring-2 focus:ring-[#006b3c] ${
            errors.password ? "border-red-500" : "border-[#006b3c]"
          }`}
        />
        {formData.password && (
          <span
            className="absolute right-3 top-9 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeClosed className="text-[#006b3c]" size={18} />
            ) : (
              <Eye className="text-[#006b3c]" size={18} />
            )}
          </span>
        )}
        <p className="text-xs text-red-500 min-h-[1rem]">{errors.password}</p>
      </div>

      {/* Options */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="accent-[#006b3c] cursor-pointer" />
          Remember me
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="accent-[#006b3c] cursor-pointer"
            checked={loginAsAdmin}
            onChange={() => setLoginAsAdmin(!loginAsAdmin)}
          />
          Log in as admin
        </label>

        <button
          onClick={onForgot}
          type="button"
          className="hover:underline text-[#006b3c] cursor-pointer"
        >
          Forgot password?
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className={`cursor-pointer mt-2 w-full bg-[#006b3c] text-white font-semibold py-2 rounded-md transition-all duration-300 hover:bg-transparent hover:text-[#006b3c] border-2 border-[#006b3c] ${
          isLoading && "opacity-50 cursor-not-allowed"
        }`}
      >
        {isLoading ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
};

export default Login;
