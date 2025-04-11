import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaImage,
  FaInfoCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addInstructor } from "../Redux/Slice/InstituteSlice";

const AddInstructorForm = () => {
  const InstituteId = useSelector((state) => state.institute.user._id);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Photo: "",
    Institute: InstituteId,
    Bio: "",
    PhoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(addInstructor(formData));
      toast.success("Instructor added successfully 😍");
      console.log("Instructor Added ✅", formData);
    } catch (err) {
      toast.error("Oops! Something went wrong 💔");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-[#e0e5ec] px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-[#e0e5ec] p-8 rounded-2xl shadow-inner max-w-md w-full neumorphism">
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
            alt="Instructor"
            className="w-16 h-16 rounded-full shadow-lg"
          />
        </div>

        <h2 className="text-center text-xl font-bold text-gray-700 mb-6">
          Add Instructor 👨‍🏫
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={<FaUser />}
            name="Name"
            placeholder="Full Name"
            value={formData.Name}
            onChange={handleChange}
          />
          <InputField
            icon={<FaEnvelope />}
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
          />
          <InputField
            icon={<FaPhone />}
            name="PhoneNumber"
            placeholder="Phone Number"
            value={formData.PhoneNumber}
            onChange={handleChange}
          />
          <InputField
            icon={<FaUniversity />}
            name="Institute"
            placeholder="Institute"
            value={formData.Institute}
            readOnly
            onChange={handleChange}
          />
          <InputField
            icon={<FaImage />}
            name="Photo"
            placeholder="Photo URL"
            value={formData.Photo}
            onChange={handleChange}
          />
          <TextAreaField
            icon={<FaInfoCircle />}
            name="Bio"
            placeholder="Short Bio"
            value={formData.Bio}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-full shadow-lg transition-all"
          >
            Add Instructor
          </button>
        </form>
      </div>
    </motion.div>
  );
};

// 🔹 Controlled Input Field
const InputField = ({
  icon,
  name,
  placeholder,
  onChange,
  type = "text",
  value,
  readOnly = false,
}) => (
  <div className="flex items-center bg-[#e0e5ec] rounded-xl p-3 shadow-inner">
    <span className="text-gray-500 mr-2">{icon}</span>
    <input
      type={type}
      name={name}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-transparent w-full outline-none text-sm text-gray-700"
    />
  </div>
);

// 🔹 Controlled TextArea Field
const TextAreaField = ({ icon, name, placeholder, onChange, value }) => (
  <div className="flex items-start bg-[#e0e5ec] rounded-xl p-3 shadow-inner">
    <span className="text-gray-500 mr-2 mt-1">{icon}</span>
    <textarea
      name={name}
      rows={3}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-transparent w-full outline-none text-sm text-gray-700 resize-none"
    ></textarea>
  </div>
);

export default AddInstructorForm;
