import express from "express";

import {
  loginController,
  getCurrentUserController,
  changePasswordController
} from "./auth.controller.js";

import authenticate from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", loginController);

router.get(
  "/me",
  authenticate,
  getCurrentUserController
);

router.patch(
  "/change-password",
  authenticate,
  changePasswordController
);

export default router;