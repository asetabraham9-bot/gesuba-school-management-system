import {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
} from "./material.service.js";

export const createMaterialController =
  async (req, res, next) => {
    try {
      const material =
        await createMaterial(
          req.body,
          req.user
        );

      res.status(201).json({
        success: true,
        message:
          "Material created successfully",
        data: material,
      });
    } catch (error) {
      next(error);
    }
  };

export const getAllMaterialsController =
  async (req, res, next) => {
    try {
      const materials =
        await getAllMaterials(
          req.user
        );

      res.status(200).json({
        success: true,
        count: materials.length,
        data: materials,
      });
    } catch (error) {
      next(error);
    }
  };

export const getMaterialByIdController =
  async (req, res, next) => {
    try {
      const material =
        await getMaterialById(
          req.params.id,
          req.user
        );

      res.status(200).json({
        success: true,
        data: material,
      });
    } catch (error) {
      next(error);
    }
  };

export const updateMaterialController =
  async (req, res, next) => {
    try {
      const material =
        await updateMaterial(
          req.params.id,
          req.body,
          req.user
        );

      res.status(200).json({
        success: true,
        message:
          "Material updated successfully",
        data: material,
      });
    } catch (error) {
      next(error);
    }
  };

export const deleteMaterialController =
  async (req, res, next) => {
    try {
      await deleteMaterial(
        req.params.id,
        req.user
      );

      res.status(200).json({
        success: true,
        message:
          "Material deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };