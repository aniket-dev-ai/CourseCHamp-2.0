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
    Rating: {
      type: Number,
      default: 0,
    },
    Reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    RatingCount: {
      type: Number,
      default: 0,
    },
    Exam: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    }],
    ExamMarks: {
      type: Number,
    },
    ExamPassed: {
      type: Boolean,
      default: false,
    },
    CertificateIssued: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const CourseSchema = mongoose.model("Course", courseSchema);
export default CourseSchema;
