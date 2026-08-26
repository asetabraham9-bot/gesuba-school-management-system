import express from "express";

import {
  createStudentController,
  createTeacherController,
} from "./user.controller.js";

import authenticate from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";

const router = express.Router();

router.post(
  "/students",
  authenticate,
  authorize("SCHOOL_ADMIN"),
  createStudentController
);

router.post(
  "/teachers",
  authenticate,
  authorize("SCHOOL_ADMIN"),
  createTeacherController
);

export default router;