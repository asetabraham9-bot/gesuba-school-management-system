import {
  createAcademicAssignment,
  getAllAcademicAssignments,
  getAcademicAssignmentById,
  updateAcademicAssignment,
  deleteAcademicAssignment,
} from "./academicAssignment.service.js";

export const createAcademicAssignmentController =
  async (req, res, next) => {
    try {
      const assignment =
        await createAcademicAssignment(req.body);

      res.status(201).json({
        success: true,
        message:
          "Academic assignment created successfully",
        data: assignment,
      });
    } catch (error) {
      next(error);
    }
  };

export const getAllAcademicAssignmentsController =
  async (req, res, next) => {
    try {
      const assignments =
        await getAllAcademicAssignments();

      res.status(200).json({
        success: true,
        count: assignments.length,
        data: assignments,
      });
    } catch (error) {
      next(error);
    }
  };

export const getAcademicAssignmentByIdController =
  async (req, res, next) => {
    try {
      const assignment =
        await getAcademicAssignmentById(
          req.params.id
        );

      if (!assignment) {
        return res.status(404).json({
          success: false,
          message:
            "Academic assignment not found",
        });
      }

      res.status(200).json({
        success: true,
        data: assignment,
      });
    } catch (error) {
      next(error);
    }
  };

export const updateAcademicAssignmentController =
  async (req, res, next) => {
    try {
      const assignment =
        await updateAcademicAssignment(
          req.params.id,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Academic assignment updated successfully",
        data: assignment,
      });
    } catch (error) {
      next(error);
    }
  };

export const deleteAcademicAssignmentController =
  async (req, res, next) => {
    try {
      const assignment =
        await deleteAcademicAssignment(
          req.params.id
        );

      res.status(200).json({
        success: true,
        message:
          "Academic assignment deleted successfully",
        data: assignment,
      });
    } catch (error) {
      next(error);
    }
  };