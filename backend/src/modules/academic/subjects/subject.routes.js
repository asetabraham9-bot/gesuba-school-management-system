import express from "express";

import {
  createSubjectController,
  getAllSubjectsController,
  getSubjectByIdController,
  updateSubjectController,
  deleteSubjectController,
} from "./subject.controller.js";

import authenticate from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

const adminOnly = [
  authenticate,
  authorize("SYSTEM_ADMIN", "SCHOOL_ADMIN"),
];

// Create Subject
router.post(
  "/",
  ...adminOnly,
  createSubjectController
);

// Get All Subjects
router.get(
  "/",
  ...adminOnly,
  getAllSubjectsController
);

// Get Subject By ID
router.get(
  "/:id",
  ...adminOnly,
  getSubjectByIdController
);

// Update Subject
router.patch(
  "/:id",
  ...adminOnly,
  updateSubjectController
);

// Delete Subject
router.delete(
  "/:id",
  ...adminOnly,
  deleteSubjectController
);

export default router;