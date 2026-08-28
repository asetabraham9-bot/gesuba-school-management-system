import {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from "./assignment.service.js";

export const createAssignmentController = async (
  req,
  res,
  next
) => {
  try {
    const assignment = await createAssignment(
      req.body,
      req.user
    );

    res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAssignmentsController = async (
  req,
  res,
  next
) => {
  try {
    const assignments =
      await getAllAssignments(req.user);

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments,
    });
  } catch (error) {
    next(error);
  }
};

export const getAssignmentByIdController = async (
  req,
  res,
  next
) => {
  try {
    const assignment =
      await getAssignmentById(
        req.params.id,
        req.user
      );

    res.status(200).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAssignmentController = async (
  req,
  res,
  next
) => {
  try {
    const assignment =
      await updateAssignment(
        req.params.id,
        req.body,
        req.user
      );

    res.status(200).json({
      success: true,
      message: "Assignment updated successfully",
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAssignmentController = async (
  req,
  res,
  next
) => {
  try {
    await deleteAssignment(
      req.params.id,
      req.user
    );

    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};