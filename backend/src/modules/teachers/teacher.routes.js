import express from "express";

import {
  createTeacherController,
  getAllTeachersController,
  getTeacherByIdController,
  updateTeacherController,
  deleteTeacherController,
} from "./teacher.controller.js";

import authenticate from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  createTeacherController
);

router.get(
  "/",
  authenticate,
  getAllTeachersController
);

router.get(
  "/:id",
  authenticate,
  getTeacherByIdController
);

router.patch(
  "/:id",
  authenticate,
  updateTeacherController
);

router.delete(
  "/:id",
  authenticate,
  deleteTeacherController
);

export default router;