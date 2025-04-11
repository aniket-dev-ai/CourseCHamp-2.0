import express from "express";
import auth from "../MiddleWare/Auth.js";
import {
  createInstitute,
  addInstructor,
  loginInstitute,
  addCourse,
} from "../controllers/Institutecontroller.js";

const router = express.Router();

router.post("/create", createInstitute);
router.post("/login", loginInstitute);
router.post("/addInstructor", auth, addInstructor);
router.post("/addCourse",auth,addCourse)

export default router;
