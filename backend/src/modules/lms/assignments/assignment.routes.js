import express from "express";

import {
  createAssignmentController,
  getAllAssignmentsController,
  getAssignmentByIdController,
  updateAssignmentController,
  deleteAssignmentController,
} from "./assignment.controller.js";

import authenticate from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

// SYSTEM_ADMIN → Full management
// SCHOOL_ADMIN → Full management
// TEACHER      → Own lessons only

const assignmentManagers = [
  authenticate,
  authorize(
    "SYSTEM_ADMIN",
    "SCHOOL_ADMIN",
    "TEACHER"
  ),
];

router.post(
  "/",
  ...assignmentManagers,
  createAssignmentController
);

router.get(
  "/",
  ...assignmentManagers,
  getAllAssignmentsController
);

router.get(
  "/:id",
  ...assignmentManagers,
  getAssignmentByIdController
);

router.patch(
  "/:id",
  ...assignmentManagers,
  updateAssignmentController
);

router.delete(
  "/:id",
  ...assignmentManagers,
  deleteAssignmentController
);

export default router;