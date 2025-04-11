import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const instituteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    website: {
      type: String,
    },
    Code: {
      type: String,
      required: true,
    },
    BannerImage: {
      type: String,
    },
    Bio: {
      type: String,
    },
    Instructor: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
    },
    Courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    Students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    StudentsCount: {
      type: Number,
      default: 0,
    },
    CoursesCount: {
      type: Number,
      default: 0,
    },
    Instructors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Instructor",
      },
    ],
    InstructorsCount: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

instituteSchema.statics.HashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

instituteSchema.statics.comparePassword = async function (
  password,
  hashedPassword
) {
  console.log(password, hashedPassword);
  if (!password || !hashedPassword) {
    throw new Error("Password and hashed password are required");
  }
  return await bcrypt.compare(password, hashedPassword);
};

// then call:

instituteSchema.statics.GenerateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

instituteSchema.statics.VerifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Error verifying token:", error);
    throw error;
  }
};

export default mongoose.model("Institute", instituteSchema);
