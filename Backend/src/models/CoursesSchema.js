import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Validity: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
    },
    Instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },
    Institute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
    },
    StudentsCount: {
      type: Number,
      default: 0,
    },
    Students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    Modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CourseSchema = mongoose.model("Course", courseSchema);
export default CourseSchema;
