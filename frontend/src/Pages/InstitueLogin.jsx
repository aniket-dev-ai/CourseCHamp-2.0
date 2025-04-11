import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginInstitute } from "../Redux/Slice/InstituteSlice";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await dispatch(loginInstitute(formData));
      toast.success("Login successful! 🎉");
      console.log(formData);
    } catch (error) {
      toast.error("Login failed 😓");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0e5ec] px-4">
      <motion.div
        className="w-full max-w-md bg-[#e0e5ec] p-8 rounded-3xl shadow-inner shadow-white flex flex-col items-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Profile Logo */}
        <div className="w-24 h-24 rounded-full bg-[#e0e5ec] shadow-[inset_8px_8px_16px_#bec4d1,inset_-8px_-8px_16px_#ffffff] flex items-center justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            alt="logo"
            className="w-10 h-10"
          />
        </div>

        <h1 className="text-xl font-bold text-gray-700 mb-1">Welcome Back!</h1>
        <p className="text-sm text-gray-500 mb-6">Login to continue</p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <NeumorphicInput
            icon={<FaEnvelope />}
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <NeumorphicInput
            icon={<FaLock />}
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-full mt-4 shadow-lg hover:scale-105 transition-transform"
          >
            Login
          </button>

          <div className="text-center mt-3 text-sm text-gray-500">
            Forgot password? <span className="text-blue-600 font-semibold cursor-pointer">or Sign Up</span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const NeumorphicInput = ({ icon, name, placeholder, type = "text", onChange }) => (
  <div className="flex items-center gap-3 px-4 py-2 rounded-xl shadow-[inset_8px_8px_16px_#bec4d1,inset_-8px_-8px_16px_#ffffff] bg-[#e0e5ec]">
    <span className="text-gray-500">{icon}</span>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
    />
  </div>
);

export default LoginForm;
