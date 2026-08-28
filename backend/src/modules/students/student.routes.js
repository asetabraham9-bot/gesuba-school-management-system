import express from "express";

import {
  createStudentController,
  getAllStudentsController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController,
} from "./student.controller.js";

import authenticate from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const router = express.Router();

const schoolAdminOnly = [
  authenticate,
  authorize("SYSTEM_ADMIN", "SCHOOL_ADMIN"),
];

router.post(
  "/",
  ...schoolAdminOnly,
  createStudentController
);

router.get(
  "/",
  ...schoolAdminOnly,
  getAllStudentsController
);

router.get(
  "/:id",
  ...schoolAdminOnly,
  getStudentByIdController
);

router.patch(
  "/:id",
  ...schoolAdminOnly,
  updateStudentController
);

router.delete(
  "/:id",
  ...schoolAdminOnly,
  deleteStudentController
);

export default router;