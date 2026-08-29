import express from "express";

import {
  getMySubjectsController,
  getMyLessonsController,
  getMyMaterialsController,
  getMyAssignmentsController,
} from "./studentLms.controller.js";

import authenticate from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

// Student LMS

// Only authenticated students can access
// their own learning content.

router.get(
  "/subjects",
  authenticate,
  authorize("STUDENT"),
  getMySubjectsController
);

router.get(
  "/lessons",
  authenticate,
  authorize("STUDENT"),
  getMyLessonsController
);

router.get(
  "/materials",
  authenticate,
  authorize("STUDENT"),
  getMyMaterialsController
);

router.get(
  "/assignments",
  authenticate,
  authorize("STUDENT"),
  getMyAssignmentsController
);

export default router;