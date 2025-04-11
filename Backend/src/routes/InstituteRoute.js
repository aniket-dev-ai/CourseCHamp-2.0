import express from "express";
import auth from "../MiddleWare/Auth.js";
import {
  createInstitute,
  addInstructor,
  loginInstitute,
  addCourse,
  addModule,
  addLecture,
  addQuestion,
  addQuiz,
  addTest,
  addExam,
} from "../controllers/Institutecontroller.js";

const router = express.Router();

router.post("/create", createInstitute);
router.post("/login", loginInstitute);
router.post("/addInstructor", auth, addInstructor);
router.post("/addCourse", auth, addCourse);
router.post("/addModule", auth, addModule);
router.post("/addLecture", auth, addLecture);
router.post("/addQuestion", auth, addQuestion);
router.post("/addQuiz", auth, addQuiz);
router.post("/addTest", auth, addTest);
router.post("/addExam", auth, addExam);

export default router;
