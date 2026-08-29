import {
  getMySubjects,
  getMyLessons,
  getMyMaterials,
  getMyAssignments,
} from "./studentLms.service.js";

export const getMySubjectsController =
  async (req, res, next) => {
    try {
      const subjects =
        await getMySubjects(
          req.user._id
        );

      res.status(200).json({
        success: true,
        count: subjects.length,
        data: subjects,
      });
    } catch (error) {
      next(error);
    }
  };

  export const getMyLessonsController =
  async (req, res, next) => {
    try {
      const lessons =
        await getMyLessons(
          req.user._id
        );

      res.status(200).json({
        success: true,
        count: lessons.length,
        data: lessons,
      });
    } catch (error) {
      next(error);
    }
  };

  export const getMyMaterialsController =
  async (req, res, next) => {
    try {
      const materials =
        await getMyMaterials(
          req.user._id
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

  export const getMyAssignmentsController =
  async (req, res, next) => {
    try {
      const assignments =
        await getMyAssignments(
          req.user._id
        );

      res.status(200).json({
        success: true,
        count: assignments.length,
        data: assignments,
      });
    } catch (error) {
      next(error);
    }
  };