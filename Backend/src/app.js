import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./database/db.js";

import instituteRoutes from "./routes/InstituteRoute.js";

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/institute", instituteRoutes);

export default app;
