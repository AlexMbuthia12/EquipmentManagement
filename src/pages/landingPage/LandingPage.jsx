import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";

const LandingPage = () => {
  const [currentView, setCurrentView] = useState("login"); // "login" | "signup" | "forgot"

  const isLogin = currentView === "login";
  const isSignUp = currentView === "signup";
  const isForgot = currentView === "forgot";

  return (
    <main className="min-h-screen flex flex-col justify-center items-center pb-6 xl:flex-row xl:justify-between">
      {/* Left info panel - show only on xl screens */}
      <div className="w-1/2 hidden xl:flex flex-col justify-center items-start bg-[#006b3c] text-white p-12 min-h-screen">
        <h2 className="text-3xl font-bold mb-4">
          {isLogin
            ? "Welcome Back!"
            : isForgot
            ? "Reset Your Password"
            : "Welcome to the AssetFlow 👋"}
        </h2>
        <p className="mb-3">
          {isLogin
            ? "Log in to access your dashboard and manage bookings."
            : isForgot
            ? "Enter your email and we’ll send instructions to reset your password."
            : "Reserve and borrow departmental equipment easily. After signing up, await admin approval before login."}
        </p>
        {isSignUp && (
          <p className="italic text-sm">
            You’ll receive an email once your account is activated.
          </p>
        )}
      </div>

      {/* Right form area */}
      <div className="flex flex-col items-center w-full xl:w-1/2 max-w-xl px-6 py-10">
        <h1 className="text-2xl font-bold mb-6 xl:hidden">
          {isLogin
            ? "Login to Your Account"
            : isForgot
            ? "Forgot Password"
            : "Create an Account"}
        </h1>

        {isLogin && <Login onForgot={() => setCurrentView("forgot")} />}
        {isSignUp && <SignUp setIsLogin={() => setCurrentView("login")} />}
        {isForgot && (
          <ForgotPassword setToLogin={() => setCurrentView("login")} />
        )}

        {/* Toggle form links */}
        <p className="mt-4 text-sm text-center">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                className="text-[#006b3c] hover:underline cursor-pointer"
                onClick={() => setCurrentView("signup")}
              >
                Sign Up
              </button>
            </>
          ) : isSignUp ? (
            <>
              Already have an account?{" "}
              <button
                className="text-[#006b3c] hover:underline cursor-pointer"
                onClick={() => setCurrentView("login")}
              >
                Login
              </button>
            </>
          ) : (
            <>
              Remembered your password?{" "}
              <button
                className="text-[#006b3c] hover:underline cursor-pointer"
                onClick={() => setCurrentView("login")}
              >
                Back to Login
              </button>
            </>
          )}
        </p>
      </div>
    </main>
  );
};

export default LandingPage;
