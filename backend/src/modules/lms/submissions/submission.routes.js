import express from "express";

import {
  createSubmissionController,
  getMySubmissionsController,
  getMySubmissionByIdController,
} from "./submission.controller.js";

import authenticate from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Student Assignment Submission
|--------------------------------------------------------------------------
*/

/*
 * Submit an assignment
 *
 * POST /api/lms/submissions
 */
router.post(
  "/",
  authenticate,
  authorize("STUDENT"),
  createSubmissionController
);

router.get(
  "/my",
  authenticate,
  authorize("STUDENT"),
  getMySubmissionsController
);

router.get(
  "/my/:id",
  authenticate,
  authorize("STUDENT"),
  getMySubmissionByIdController
);

export default router;