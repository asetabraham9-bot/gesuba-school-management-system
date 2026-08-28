import express from "express";

import {
  createEnrollmentController,
  getAllEnrollmentsController,
  getEnrollmentByIdController,
  updateEnrollmentController,
  deleteEnrollmentController,
} from "./enrollment.controller.js";

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
  createEnrollmentController
);

router.get(
  "/",
  ...adminOnly,
  getAllEnrollmentsController
);

router.get(
  "/:id",
  ...adminOnly,
  getEnrollmentByIdController
);

router.patch(
  "/:id",
  ...adminOnly,
  updateEnrollmentController
);

router.delete(
  "/:id",
  ...adminOnly,
  deleteEnrollmentController
);

export default router;