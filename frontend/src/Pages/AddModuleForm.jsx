import React, { useState } from "react";
import { FaBookOpen, FaInfoCircle, FaChalkboardTeacher } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux"; 
import { addModule } from "../Redux/Slice/InstituteSlice";

const AddModule = () => {
  const CourseId = useSelector((state) => state.institute.selectedCourseId); // You can customize this line
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Course: "67f99ce282122e8a76f80b3b",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addModule(formData));
    toast.success("Lecture/Module added successfully 🧠✨");
    console.log("New Module:", formData);
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
          <h2 className="text-2xl font-bold text-indigo-700 mb-1 flex items-center justify-center gap-2">
            <FaBookOpen /> Add Lecture / Module
          </h2>
          <p className="text-sm text-gray-500">Add some brain food to your course 😋</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField icon={<FaBookOpen />} name="Title" placeholder="Lecture Title" value={formData.Title} onChange={handleChange} />
          <TextAreaField icon={<FaInfoCircle />} name="Description" placeholder="Description" value={formData.Description} onChange={handleChange} />
          <InputField
            icon={<FaChalkboardTeacher />}
            name="Course"
            placeholder="Course ID"
            value={formData.Course}
            readOnly
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 hover:opacity-90 text-white font-semibold py-2 rounded-full transition duration-300"
          >
            Add Module 🔥
          </button>
        </form>
      </div>
    </motion.div>
  );
};

const InputField = ({ icon, name, placeholder, onChange, type = "text", value = "", readOnly = false }) => (
  <div className="flex items-center border rounded-lg px-3 py-2 bg-[#f8fafc]">
    <span className="text-gray-600 mr-2">{icon}</span>
    <input
      type={type}
      name={name}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-transparent outline-none text-sm text-gray-700"
    />
  </div>
);

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

export default AddModule;
