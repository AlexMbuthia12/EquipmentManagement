import React, { useState } from "react";
import { EyeClosed, Eye } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const Login = ({ onForgot }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const [isloading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for that field
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

    const { email, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("", { email, password });
      toast.success("Login successful!");

      setFormData({
        email: "",
        password: "",
      });

      // clear the errors
      setErrors({});
    } catch (error) {
      toast.error("Login failed. Check your credentials.");
      console.error(error);
    } finally {
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
          className={`p-4 border  rounded-md outline-none focus:ring-2 focus:ring-[#006b3c] ${
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
          className={`p-3 border  rounded-md outline-none focus:ring-2 focus:ring-[#006b3c] ${
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
        disabled={isloading}
        className={`cursor-pointer mt-2 w-full bg-[#006b3c] text-white font-semibold py-2 rounded-md transition-all duration-300 hover:bg-transparent hover:text-[#006b3c] border-2 border-[#006b3c] ${
          isloading && "opacity-50 cursor-not-allowed"
        }`}
      >
        {isloading ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
};

export default Login;
