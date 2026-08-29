import express from "express";

import {
  getAssignmentSubmissionsController,
  getSubmissionForTeacherController,
  gradeSubmissionController,
} from "./teacherSubmission.controller.js";

import authenticate from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

//Teacher Submission Management
//Get all submissions for an assignment
router.get(
  "/assignment/:assignmentId",
  authenticate,
  authorize("TEACHER"),
  getAssignmentSubmissionsController
);

//Get one student submission
router.get(
  "/:id",
  authenticate,
  authorize("TEACHER"),
  getSubmissionForTeacherController
);
// Grade Submission
router.patch(
  "/:id/grade",
  authenticate,
  authorize("TEACHER"),
  gradeSubmissionController
);

export default router;