import React, { useState } from "react";
import "./landing.css";
import { EyeClosed, Eye } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.trim() === "") {
      toast.error("Password is required.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Check your credentials.");
      if (error.response) {
        console.error("Server response error:", error.response);
      } else if (error.request) {
        console.log("No response from server");
      } else {
        console.log("Error insetting up the request");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="login-main w-screen h-screen overflow-hidden flex flex-col justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center  max-w-xl w-3/4 pb-8 pt-8 pr-4 pl-4 rounded-lg"
        action=""
      >
        <div className=" max-w-md w-4/5 relative mb-6 rounded-lg">
          <input
            type="email"
            className="w-full p-4 bg-transparent border-2 border-[#154c79] text-[#154c79] outline-none border-color-seven rounded-lg font-bold"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            onBlur={(e) =>
              e.target.classList.toggle("filled", e.target.value !== "")
            }
          />
          <div className="labeline">Enter your name</div>
        </div>

        <div className=" max-w-md w-4/5 relative mb-6 rounded-lg">
          <input
            className="w-full p-4 bg-transparent border-2 border-[#154c79] text-[#154c79] outline-none border-color-seven rounded-lg font-bold"
            type={showPassword ? "text" : "password"}
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) =>
              e.target.classList.toggle("filled", e.target.value !== "")
            }
          />
          <div className="labeline">Enter your Password</div>
          {password.length > 0 && (
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="w-4 h-4 absolute top-[35%] translate-y-0.5 right-[5%] cursor-pointer"
            >
              {showPassword ? (
                <EyeClosed className="text-[#154c79]" />
              ) : (
                <Eye className="text-[#154c79]" />
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 max-w-md w-4/5 pb-2">
          <input
            className="cursor-pointer w-5 h-5 border-none outline-none"
            type="checkbox"
          />
          <label className="text-[#154c79] font-bold" htmlFor="">
            Remember me
          </label>
        </div>

        <button
          onClick={handleLogin}
          className={`border-2 border-[#154c79] w-4/5 max-w-md p-2  text-white bg-[#154c79] rounded-lg font-bold hover:bg-transparent hover:text-[#154c79] transition-all duration-500
            ${isloading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          type="submit"
        >
          {isloading ? "Sending..." : "Login"}
        </button>
      </form>
    </main>
  );
};

export default LandingPage;
