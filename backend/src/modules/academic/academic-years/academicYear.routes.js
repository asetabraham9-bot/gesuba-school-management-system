import express from "express";

import {
  createAcademicYearController,
  getAllAcademicYearsController,
  getAcademicYearByIdController,
  updateAcademicYearController,
  deleteAcademicYearController,
} from "./academicYear.controller.js";

import authenticate from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

const adminOnly = [
  authenticate,
  authorize("SYSTEM_ADMIN", "SCHOOL_ADMIN"),
];

router.post(
  "/",
  ...adminOnly,
  createAcademicYearController
);

router.get(
  "/",
  ...adminOnly,
  getAllAcademicYearsController
);

router.get(
  "/:id",
  ...adminOnly,
  getAcademicYearByIdController
);

router.patch(
  "/:id",
  ...adminOnly,
  updateAcademicYearController
);

router.delete(
  "/:id",
  ...adminOnly,
  deleteAcademicYearController
);

export default router;