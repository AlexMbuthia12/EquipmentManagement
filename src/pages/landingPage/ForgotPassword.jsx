import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ForgotPassword = ({ setToLogin }) => {
  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for that field
    if (error[name]) {
      setError((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      toast.error("Please fix the highlighted field.");
      return;
    }

    setIsLoading(true);
    try {
      // Replace this URL with your actual endpoint
      await axios.post("/api/forgot-password", { email });

      toast.success("Instructions have been sent to your email.");
      setEmail("");
      // clear the errors
      setError({});
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col justify-center items-center gap-5"
    >
      <div className="w-full max-w-md">
        <label htmlFor="email" className="text-sm font-semibold text-[#006b3c]">
          E-mail Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          placeholder="e.g. user@example.com"
          onChange={handleInputChange}
          className={`mt-1 w-full p-3 border border-[#006b3c] rounded-md outline-none focus:ring-2 focus:ring-[#006b3c] ${
            error.email ? "border-red-500" : "border-[#006b3c]"
          }`}
        />
        <p className="text-xs text-red-500 min-h-[1rem]">{error.email}</p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`cursor-pointer w-full max-w-md bg-[#006b3c] text-white font-semibold py-2 rounded-md transition-all duration-300 hover:bg-transparent hover:text-[#006b3c] border-2 border-[#006b3c] ${
          isLoading && "opacity-50 cursor-not-allowed"
        }`}
      >
        {isLoading ? "Submitting..." : "Send Reset Link"}
      </button>
    </form>
  );
};

export default ForgotPassword;
