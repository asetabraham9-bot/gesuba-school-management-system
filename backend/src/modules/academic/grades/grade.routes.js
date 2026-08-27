import express from "express";

import {
  createGradeController,
  getAllGradesController,
  getGradeByIdController,
  updateGradeController,
  deleteGradeController,
} from "./grade.controller.js";

import authenticate from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("SYSTEM_ADMIN", "SCHOOL_ADMIN"),
  createGradeController
);

router.get(
  "/",
  authenticate,
  authorize("SYSTEM_ADMIN", "SCHOOL_ADMIN"),
  getAllGradesController
);

router.get(
  "/:id",
  authenticate,
  authorize("SYSTEM_ADMIN", "SCHOOL_ADMIN"),
  getGradeByIdController
);

router.patch(
  "/:id",
  authenticate,
  authorize("SYSTEM_ADMIN", "SCHOOL_ADMIN"),
  updateGradeController
);

router.delete(
  "/:id",
  authenticate,
  authorize("SYSTEM_ADMIN", "SCHOOL_ADMIN"),
  deleteGradeController
);

export default router;