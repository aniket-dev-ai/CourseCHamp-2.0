import CourseSchema from "../models/CoursesSchema.js";
import InstituteSchema from "../models/InstituteSchema.js";
import InstructorSchema from "../models/Instructor.js";

export const createInstitute = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      address,
      website,
      BannerImage,
      Bio,
    } = req.body;
    console.log(
      name,
      email,
      password,
      phoneNumber,
      address,
      website,
      BannerImage,
      Bio
    );

    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email already exists
    const existingInstitute = await InstituteSchema.findOne({ email });
    if (existingInstitute) {
      return res.status(400).json({ message: "Institute already exists" });
    }

    const hashedPassword = await InstituteSchema.HashPassword(password);

    // Generate a 10-letter random string for the Code field
    const generateRandomCode = () => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let result = "";
      for (let i = 0; i < 10; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    };

    const Code = generateRandomCode();
    console.log("Generated Code:", Code);

    const newInstitute = new InstituteSchema({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      website,
      Code,
      BannerImage,
      Bio,
    });

    await newInstitute.save();
    res.status(201).json({
      message: "Institute created successfully",
      institute: newInstitute,
    });
  } catch (error) {
    console.error("Error creating institute:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginInstitute = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const institute = await InstituteSchema.findOne({ email });
    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }
    console.log(institute);
    console.log(institute.password);
    const isMatch = await InstituteSchema.comparePassword(
      password,
      institute.password
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = await InstituteSchema.GenerateToken(institute._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json({
      message: "Login successful",
      token,
      institute: {
        id: institute._id,
        name: institute.name,
        email: institute.email,
        phoneNumber: institute.phoneNumber,
        address: institute.address,
        website: institute.website,
        BannerImage: institute.BannerImage,
        Bio: institute.Bio,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addInstructor = async (req, res) => {
  try {
    const { Name, Email, Photo, Institute, Bio, PhoneNumber } = req.body;

    console.log(Name, Email, Photo, Institute, Bio, PhoneNumber);
    console.log(req.user);
    if (!Name || !Email || !PhoneNumber) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const InstituteId = req.user.id; // Get the Institute ID from the authenticated user

    const institute = await InstituteSchema.findById(InstituteId);
    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    // Check if the email already exists
    const existingInstructor = await InstructorSchema.findOne({ Email });
    if (existingInstructor) {
      return res.status(400).json({ message: "Instructor already exists" });
    }

    const newInstructor = new InstructorSchema({
      Name,
      Email,
      Photo,
      Institute: institute._id,
      Bio,
      PhoneNumber,
    });

    await newInstructor.save();
    await InstituteSchema.findByIdAndUpdate(
      InstituteId,
      { $push: { Instructors: newInstructor._id } },
      { new: true }
    );
    await InstituteSchema.findByIdAndUpdate(
      InstituteId,
      { $inc: { InstructorsCount: 1 } },
      { new: true }
    );

    res.status(201).json({
      message: "Instructor added successfully",
      instructor: newInstructor,
    });
  } catch (error) {
    console.error("Error adding instructor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addCourse = async (req, res) => {
  try {
    const { Title, Description, Price, Validity, Image, Instructor } = req.body;

    console.log(Title, Description, Price, Validity, Image, Instructor);

    if ((!Title || !Description || !Price || !Validity, !Instructor)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const InstituteId = req.user.id;

    const institute = await InstituteSchema.findById(InstituteId);
    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }
    const instructor = await InstructorSchema.findById(Instructor);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    console.log(institute);

    const newCourse = new CourseSchema({
      Title,
      Description,
      Price,
      Validity,
      Image,
      Instructor: instructor._id,
      Institute: institute._id,
    });
    console.log(newCourse);
    await newCourse.save();

    await InstituteSchema.findByIdAndUpdate(
      InstituteId,
      { $push: { Courses: newCourse._id } },
      { new: true }
    );
    await InstructorSchema.findByIdAndUpdate(
      Instructor,
      { $push: { Courses: newCourse._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Course added successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
