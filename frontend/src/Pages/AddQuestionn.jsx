import React, { useState } from "react";
import { FaQuestion, FaListOl, FaCheck, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addQuestion } from "../Redux/Slice/InstituteSlice";

const AddQuestionForm = () => {
  const [formData, setFormData] = useState({
    Question: "",
    Options: ["", "", "", ""], // 4 options
    Answer: "",
    Quiz: "67f99f8682122e8a76f80b48",
  });
const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.Options];
    updatedOptions[index] = value;
    setFormData({ ...formData, Options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.Options.some((opt) => opt.trim() === "")) {
      return toast.error("All 4 options are required 💥");
    }

    try {
        dispatch(addQuestion(formData))
      console.log("Question Data ✅", formData);
      toast.success("Question added successfully 🎯");
    } catch (err) {
      toast.error("Error adding question 💔");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6 flex items-center justify-center gap-2">
          <FaEdit /> Add New Question
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quiz ID */}
          <InputField
            icon={<FaListOl />}
            name="Quiz"
            placeholder="Quiz ID"
            value={formData.Quiz}
            onChange={handleChange}
          />

          {/* Question */}
          <TextAreaField
            icon={<FaQuestion />}
            name="Question"
            placeholder="Write the question here..."
            value={formData.Question}
            onChange={handleChange}
          />

          {/* Options */}
          {formData.Options.map((opt, index) => (
            <InputField
              key={index}
              icon={<FaListOl />}
              name={`Option${index + 1}`}
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          ))}

          {/* Answer */}
          <InputField
            icon={<FaCheck />}
            name="Answer"
            placeholder="Correct Answer (Must match one of the options)"
            value={formData.Answer}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all"
          >
            Add Question 📝
          </button>
        </form>
      </div>
    </motion.div>
  );
};

const InputField = ({ icon, name, placeholder, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{placeholder}</label>
    <div className="flex items-center border px-3 py-2 rounded-md bg-white shadow-sm">
      <span className="text-gray-500 mr-2">{icon}</span>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full outline-none bg-transparent text-gray-700"
      />
    </div>
  </div>
);

const TextAreaField = ({ icon, name, placeholder, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{placeholder}</label>
    <div className="flex items-start border px-3 py-2 rounded-md bg-white shadow-sm">
      <span className="text-gray-500 mr-2 mt-1">{icon}</span>
      <textarea
        name={name}
        rows={3}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full outline-none bg-transparent text-gray-700 resize-none"
      ></textarea>
    </div>
  </div>
);

export default AddQuestionForm;
