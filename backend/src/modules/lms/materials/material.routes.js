import express from "express";

import {
  createMaterialController,
  getAllMaterialsController,
  getMaterialByIdController,
  updateMaterialController,
  deleteMaterialController,
} from "./material.controller.js";

import authenticate from "../../../middleware/auth.middleware.js";
import { authorize } from "../../../middleware/role.middleware.js";

const router = express.Router();

const materialManagers = [
  authenticate,
  authorize(
    "SYSTEM_ADMIN",
    "SCHOOL_ADMIN",
    "TEACHER"
  ),
];

router.post(
  "/",
  ...materialManagers,
  createMaterialController
);

router.get(
  "/",
  ...materialManagers,
  getAllMaterialsController
);

router.get(
  "/:id",
  ...materialManagers,
  getMaterialByIdController
);

router.patch(
  "/:id",
  ...materialManagers,
  updateMaterialController
);

router.delete(
  "/:id",
  ...materialManagers,
  deleteMaterialController
);

export default router;