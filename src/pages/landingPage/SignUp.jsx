import React, { useState } from "react";
import { EyeClosed, Eye } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const SignUp = ({ setIsLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    department: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { userName, email, password, confirmPassword, department, role } =
      formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // validation
    let newErrors = {};

    if (!userName.trim()) newErrors.userName = "Full name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!department.trim()) newErrors.department = "Department is required.";
    if (!role) newErrors.role = "Role is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("", {
        userName,
        email,
        password,
        department,
        role,
      });

      toast.success(
        "Signup successful! Await admin approval. Redirecting to login..."
      );

      // clear the inputs
      setFormData({
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
        department: "",
        role: "",
      });

      // clear the errors
      setErrors({});

      setTimeout(() => setIsLogin(true), 5000);
    } catch (error) {
      toast.error("Signup failed");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="w-full max-w-md flex flex-col gap-5 text-[#006b3c]"
    >
      <div>
        <h2 className="text-2xl font-bold">Create an Account</h2>
        <p className="text-sm mt-1">
          Fill the form below to request an account.
        </p>
      </div>

      {/* Name & Email */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-1 w-full lg:w-1/2">
          <label htmlFor="userName" className="text-sm font-semibold">
            Full Name
          </label>
          <input
            autoComplete="off"
            id="userName"
            name="userName"
            type="text"
            value={formData.userName}
            onChange={handleInputChange}
            placeholder="e.g. John Doe"
            className={`p-3 border  rounded-md outline-none focus:ring-2 focus:ring-[#006b3c] ${
              errors.userName ? "border-red-500" : "border-[#006b3c]"
            }`}
          />
          <p className="text-xs text-red-500 min-h-[1rem]">{errors.userName}</p>
        </div>

        <div className="flex flex-col gap-1 w-full lg:w-1/2">
          <label htmlFor="email" className="text-sm font-semibold">
            E-mail
          </label>
          <input
            autoComplete="off"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="e.g. user@example.com"
            className={`p-3 border  rounded-md outline-none focus:ring-2 focus:ring-[#006b3c] ${
              errors.email ? "border-red-500" : "border-[#006b3c]"
            }`}
          />
          <p className="text-xs text-red-500 min-h-[1rem]">{errors.email}</p>
        </div>
      </div>

      {/* Password & Confirm Password */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-1 w-full lg:w-1/2 relative">
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <input
            autoComplete="off"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
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

        <div className="flex flex-col gap-1 w-full lg:w-1/2 relative">
          <label htmlFor="confirmPassword" className="text-sm font-semibold">
            Confirm Password
          </label>
          <input
            autoComplete="off"
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Repeat password"
            className={`p-3 border  rounded-md outline-none focus:ring-2 focus:ring-[#006b3c] ${
              errors.confirmPassword ? "border-red-500" : "border-[#006b3c]"
            }`}
          />
          {formData.confirmPassword && (
            <span
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <EyeClosed className="text-[#006b3c]" size={18} />
              ) : (
                <Eye className="text-[#006b3c]" size={18} />
              )}
            </span>
          )}
          <p className="text-xs text-red-500 min-h-[1rem]">
            {errors.confirmPassword}
          </p>
        </div>
      </div>

      {/* Department & Role */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-1 w-full lg:w-1/2">
          <label htmlFor="department" className="text-sm font-semibold">
            Department
          </label>
          <input
            autoComplete="off"
            id="department"
            name="department"
            type="text"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="e.g. ICT"
            className={`p-3 border  rounded-md outline-none focus:ring-2 focus:ring-[#006b3c] ${
              errors.department ? "border-red-500" : "border-[#006b3c]"
            }`}
          />
          <p className="text-xs text-red-500 min-h-[1rem]">
            {errors.department}
          </p>
        </div>

        <div className="flex flex-col gap-1 w-full lg:w-1/2">
          <label htmlFor="role" className="text-sm font-semibold">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className={`p-3 border  rounded-md outline-none focus:ring-2 focus:ring-[#006b3c] ${
              errors.role ? "border-red-500" : "border-[#006b3c]"
            }`}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <p className="text-xs text-red-500 min-h-[1rem]">{errors.role}</p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`cursor-pointer mt-2 w-full bg-[#006b3c] text-white font-semibold py-2 rounded-md transition-all duration-300 hover:bg-transparent hover:text-[#006b3c] border-2 border-[#006b3c] ${
          isLoading && "opacity-50 cursor-not-allowed"
        }`}
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUp;
