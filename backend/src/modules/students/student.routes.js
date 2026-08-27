import express from "express";

import {
  createStudentController,
  getAllStudentsController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController,
} from "./student.controller.js";

import authenticate from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, createStudentController);

router.get("/", authenticate, getAllStudentsController);

router.get("/:id", authenticate, getStudentByIdController);

router.patch("/:id", authenticate, updateStudentController);

router.delete("/:id", authenticate, deleteStudentController);

export default router;
