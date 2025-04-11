import React, { useState } from "react";
import { FaBook, FaInfoCircle, FaRupeeSign, FaCalendar, FaImage, FaUserTie } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux"; 
import { addCourse } from "../Redux/Slice/InstituteSlice";

const AddCourseForm = () => {
  const InstructorId = useSelector((state) => state.institute.user._id); // Assuming instructor is logged in
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Price: "",
    Validity: "",
    Image: "",
    Instructor: "67f99bbd82122e8a76f80b35",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCourse(formData));
    toast.success("Course added successfully! 🎉");
    console.log("Course Details:", formData);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-[#f1f5f9] px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-xl w-full space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-1 flex items-center justify-center gap-2">
            <FaBook /> Add New Course
          </h2>
          <p className="text-sm text-gray-500">Make your course shine baby! 💫</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField icon={<FaBook />} name="Title" placeholder="Course Title" value={formData.Title} onChange={handleChange} />
          <TextAreaField icon={<FaInfoCircle />} name="Description" placeholder="Course Description" value={formData.Description} onChange={handleChange} />
          <InputField icon={<FaRupeeSign />} name="Price" placeholder="Price (INR)" type="number" value={formData.Price} onChange={handleChange} />
          <InputField icon={<FaCalendar />} name="Validity" placeholder="Validity (in days)" type="number" value={formData.Validity} onChange={handleChange} />
          <InputField icon={<FaImage />} name="Image" placeholder="Image URL" value={formData.Image} onChange={handleChange} />
          <InputField icon={<FaUserTie />} name="Instructor" value={formData.Instructor}  readOnly onChange={handleChange} />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-90 text-white font-semibold py-2 rounded-full transition duration-300"
          >
            Add Course 💻
          </button>
        </form>
      </div>
    </motion.div>
  );
};

// 👇 InputField Component
const InputField = ({ icon, name, placeholder, onChange, type = "text", value = "", readOnly = false }) => (
  <div className="flex items-center border rounded-lg px-3 py-2 bg-[#f8fafc]">
    <span className="text-gray-600 mr-2">{icon}</span>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      className="w-full bg-transparent outline-none text-sm text-gray-700"
    />
  </div>
);

// 👇 TextAreaField Component
const TextAreaField = ({ icon, name, placeholder, onChange }) => (
  <div className="flex items-start border rounded-lg px-3 py-2 bg-[#f8fafc]">
    <span className="text-gray-600 mr-2 mt-1">{icon}</span>
    <textarea
      name={name}
      rows={3}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full bg-transparent outline-none text-sm text-gray-700 resize-none"
    />
  </div>
);

export default AddCourseForm;
