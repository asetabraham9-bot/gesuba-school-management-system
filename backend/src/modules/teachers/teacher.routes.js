import express from "express";

import {
  createTeacherController,
  getAllTeachersController,
  getTeacherByIdController,
  updateTeacherController,
  deleteTeacherController,
} from "./teacher.controller.js";

import authenticate from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const router = express.Router();

const adminOnly = [
  authenticate,
  authorize("SYSTEM_ADMIN", "SCHOOL_ADMIN"),
];

router.post(
  "/",
  ...adminOnly,
  createTeacherController
);

router.get(
  "/",
  ...adminOnly,
  getAllTeachersController
);

router.get(
  "/:id",
  ...adminOnly,
  getTeacherByIdController
);

router.patch(
  "/:id",
  ...adminOnly,
  updateTeacherController
);

router.delete(
  "/:id",
  ...adminOnly,
  deleteTeacherController
);

export default router;