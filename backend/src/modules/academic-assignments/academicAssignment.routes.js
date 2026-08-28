import express from "express";

import {
  createAcademicAssignmentController,
  getAllAcademicAssignmentsController,
  getAcademicAssignmentByIdController,
  updateAcademicAssignmentController,
  deleteAcademicAssignmentController,
} from "./academicAssignment.controller.js";

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
  createAcademicAssignmentController
);

router.get(
  "/",
  ...adminOnly,
  getAllAcademicAssignmentsController
);

router.get(
  "/:id",
  ...adminOnly,
  getAcademicAssignmentByIdController
);

router.patch(
  "/:id",
  ...adminOnly,
  updateAcademicAssignmentController
);

router.delete(
  "/:id",
  ...adminOnly,
  deleteAcademicAssignmentController
);

export default router;