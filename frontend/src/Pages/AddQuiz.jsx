import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaBook, FaClock, FaClipboard, FaPlusCircle } from "react-icons/fa";
import { addQuiz } from "../Redux/Slice/InstituteSlice";
import { useDispatch } from "react-redux";

const QuizMakerForm = () => {
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Duration: "",
    Lecture: "67f99e6382122e8a76f80b42",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(addQuiz(formData));
      toast.success("Quiz created successfully! 🚀");
      console.log("Quiz Data ✅", formData);
    } catch (error) {
      toast.error("Error creating quiz 😣");
    }
  };

  const handleAddQuestion = () => {
    toast.info("Redirecting to Add Question Page 📝");
    // Here you can navigate or open a modal etc.
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6 flex items-center justify-center gap-2">
          <FaClipboard /> Create New Quiz
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <InputField
            icon={<FaBook />}
            name="Title"
            placeholder="Quiz Title"
            value={formData.Title}
            onChange={handleChange}
          />
          <InputField
            icon={<FaClock />}
            name="Duration"
            placeholder="Duration (mins)"
            value={formData.Duration}
            onChange={handleChange}
          />
          <InputField
            icon={<FaClipboard />}
            name="Lecture"
            placeholder="Lecture ID"
            value={formData.Lecture}
            onChange={handleChange}
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="Description"
              rows={3}
              onChange={handleChange}
              placeholder="Write a short description about this quiz..."
              className="w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all font-semibold"
          >
            Create Quiz
          </button>
        </form>

        <button
          onClick={handleAddQuestion}
          className="mt-4 w-full flex items-center justify-center gap-2 text-blue-600 font-semibold hover:underline"
        >
          <FaPlusCircle /> Add Question
        </button>
      </div>
    </motion.div>
  );
};

const InputField = ({ icon, name, placeholder, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {placeholder}
    </label>
    <div className="flex items-center border px-3 py-2 rounded-md bg-white shadow-sm">
      <span className="text-gray-500 mr-2">{icon}</span>
      <input
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full outline-none bg-transparent text-gray-700"
      />
    </div>
  </div>
);

export default QuizMakerForm;
