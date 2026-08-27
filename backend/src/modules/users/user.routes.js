import express from "express";

import {
  createStudentController,
  createTeacherController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  updateUserStatusController,
  deleteUserController,
} from "./user.controller.js";

import authenticate from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post(
  "/students",
  authorize("SCHOOL_ADMIN", "SYSTEM_ADMIN"),
  createStudentController
);

router.post(
  "/teachers",
  authorize("SCHOOL_ADMIN", "SYSTEM_ADMIN"),
  createTeacherController
);

router.get(
  "/",
  authorize("SCHOOL_ADMIN", "SYSTEM_ADMIN"),
  getAllUsersController
);

router.get(
  "/:userId",
  authorize("SCHOOL_ADMIN", "SYSTEM_ADMIN"),
  getUserByIdController
);

router.patch(
  "/:userId",
  authorize("SCHOOL_ADMIN", "SYSTEM_ADMIN"),
  updateUserController
);

router.patch(
  "/:userId/status",
  authorize("SCHOOL_ADMIN", "SYSTEM_ADMIN"),
  updateUserStatusController
);

router.delete(
  "/:userId",
  authorize("SCHOOL_ADMIN", "SYSTEM_ADMIN"),
  deleteUserController
);

export default router;