import express from "express";

import {
  createSectionController,
  getAllSectionsController,
  getSectionsByGradeController,
  getSectionByIdController,
  updateSectionController,
  deleteSectionController,
} from "./section.controller.js";

import authenticate from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

const adminOnly = [
  authenticate,
  authorize("SYSTEM_ADMIN", "SCHOOL_ADMIN"),
];

// Create section
router.post(
  "/",
  ...adminOnly,
  createSectionController
);

// Get all sections
router.get(
  "/",
  ...adminOnly,
  getAllSectionsController
);

// Get sections by grade
router.get(
  "/grade/:gradeId",
  ...adminOnly,
  getSectionsByGradeController
);

// Get section by ID
router.get(
  "/:id",
  ...adminOnly,
  getSectionByIdController
);

// Update section
router.patch(
  "/:id",
  ...adminOnly,
  updateSectionController
);

// Delete section
router.delete(
  "/:id",
  ...adminOnly,
  deleteSectionController
);

export default router;