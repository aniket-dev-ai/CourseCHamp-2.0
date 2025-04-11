import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUniversity, FaImage, FaGlobe, FaPhone, FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createInstitute } from "../Redux/Slice/InstituteSlice";

const InstituteForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    website: "",
    BannerImage: "",
    Bio: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await   dispatch(createInstitute(formData));
      toast.success("Institute created successfully! 🎉");
      console.log(formData);
    } catch (err) {
      toast.error("Something went wrong 💥");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0e5ec] px-4">
      <motion.div
        className="w-full max-w-md bg-[#e0e5ec] p-8 rounded-3xl shadow-inner shadow-white flex flex-col items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 h-24 rounded-full bg-[#e0e5ec] shadow-[inset_8px_8px_16px_#bec4d1,inset_-8px_-8px_16px_#ffffff] flex items-center justify-center mb-4">
          <FaUniversity size={36} className="text-blue-500" />
        </div>

        <h1 className="text-xl font-bold text-gray-700 mb-1">Web Development</h1>
        <p className="text-sm text-gray-500 mb-6">Made easy!</p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <NeumorphicInput
            icon={<FaUser />}
            name="name"
            placeholder="Institute Name"
            onChange={handleChange}
          />
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
          <NeumorphicInput
            icon={<FaPhone />}
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
          />
          <NeumorphicInput
            icon={<FaGlobe />}
            name="website"
            placeholder="Website"
            onChange={handleChange}
          />
          <NeumorphicInput
            icon={<FaImage />}
            name="BannerImage"
            placeholder="Banner Image URL"
            onChange={handleChange}
          />

          <NeumorphicTextarea
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />
          <NeumorphicTextarea
            name="Bio"
            placeholder="Bio"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-full mt-4 shadow-lg hover:scale-105 transition-transform"
          >
            Register Institute
          </button>

          <div className="text-center mt-3 text-sm text-gray-500">
            Forgot password? <span className="text-blue-600 font-semibold cursor-pointer">or Sign Up</span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// 🌟 Neumorphic Input Component
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

// 🌟 Neumorphic TextArea
const NeumorphicTextarea = ({ name, placeholder, onChange }) => (
  <textarea
    name={name}
    placeholder={placeholder}
    rows="3"
    onChange={onChange}
    className="w-full mt-2 px-4 py-3 rounded-xl shadow-[inset_8px_8px_16px_#bec4d1,inset_-8px_-8px_16px_#ffffff] bg-[#e0e5ec] outline-none resize-none text-gray-700 placeholder:text-gray-400"
  />
);

export default InstituteForm;
