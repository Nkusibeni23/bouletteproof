"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaApple, FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Both fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: email,
            profilePicture: "https://ui-avatars.com/api/?name=User",
          })
        );
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/landing-page");
        }, 2000);
      } else {
        const data = await response.json();
        toast.error(data.message || "Login failed.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="bg-gray-700 text-white py-2 px-4 rounded-md w-full hover:bg-gray-600 transition-all"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <hr className="w-full border-gray-300" />
          <span className="text-gray-500 mx-3">OR</span>
          <hr className="w-full border-gray-300" />
        </div>

        <div className=" flex items-center justify-between gap-4">
          {/* Sign in with Google */}
          <button
            type="button"
            className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition-all"
          >
            <FaGoogle className="mr-2" /> with Google
          </button>

          {/* Sign in with Apple */}
          <button
            type="button"
            className="flex items-center justify-center bg-black text-white py-2 px-4 rounded-md w-full hover:bg-gray-800 transition-all"
          >
            <FaApple className="mr-2" /> with Apple
          </button>
        </div>
      </form>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default LoginPage;
