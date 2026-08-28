import express from "express";
import cors from "cors";
import userRoutes from "./modules/users/user.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import studentRoutes from "./modules/students/student.routes.js";
import teacherRoutes from "./modules/teachers/teacher.routes.js";
import gradeRoutes from "./modules/academic/grades/grade.routes.js";
import sectionRoutes from "./modules/academic/sections/section.routes.js";
import subjectRoutes from "./modules/academic/subjects/subject.routes.js";
import academicYearRoutes from "./modules/academic/academic-years/academicYear.routes.js";
import enrollmentRoutes from "./modules/enrollments/enrollment.routes.js";
import academicAssignmentRoutes from "./modules/academic-assignments/academicAssignment.routes.js";
import lessonRoutes from "./modules/lms/lessons/lesson.routes.js";
import materialRoutes from "./modules/lms/materials/material.routes.js";
import assignmentRoutes from "./modules/lms/assignments/assignment.routes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/academic-years", academicYearRoutes);
app.use( "/api/enrollments", enrollmentRoutes);
app.use( "/api/academic-assignments", academicAssignmentRoutes);
app.use( "/api/lms/lessons",lessonRoutes);
app.use( "/api/lms/materials", materialRoutes);
app.use("/api/lms/assignments", assignmentRoutes);

// Health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Gesuba School Management System API is running",
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;
