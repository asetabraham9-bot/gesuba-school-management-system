import express from "express";

import {
  createLessonController,
  getAllLessonsController,
  getLessonByIdController,
  updateLessonController,
  deleteLessonController,
} from "./lesson.controller.js";

import authenticate from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

const lessonManagers = [
  authenticate,
  authorize(
    "SYSTEM_ADMIN",
    "SCHOOL_ADMIN",
    "TEACHER"
  ),
];

router.post(
  "/",
  ...lessonManagers,
  createLessonController
);

router.get(
  "/",
  ...lessonManagers,
  getAllLessonsController
);

router.get(
  "/:id",
  ...lessonManagers,
  getLessonByIdController
);

router.patch(
  "/:id",
  ...lessonManagers,
  updateLessonController
);

router.delete(
  "/:id",
  ...lessonManagers,
  deleteLessonController
);

export default router;