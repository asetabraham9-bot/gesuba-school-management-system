import {
  createGrade,
  getAllGrades,
  getGradeById,
  updateGrade,
  deleteGrade,
} from "./grade.service.js";

export const createGradeController = async (req, res, next) => {
  try {
    const grade = await createGrade(req.body);

    res.status(201).json({
      success: true,
      message: "Grade created successfully",
      data: grade,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllGradesController = async (req, res, next) => {
  try {
    const grades = await getAllGrades();

    res.status(200).json({
      success: true,
      count: grades.length,
      data: grades,
    });
  } catch (error) {
    next(error);
  }
};

export const getGradeByIdController = async (req, res, next) => {
  try {
    const grade = await getGradeById(req.params.id);

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: "Grade not found",
      });
    }

    res.status(200).json({
      success: true,
      data: grade,
    });
  } catch (error) {
    next(error);
  }
};

export const updateGradeController = async (req, res, next) => {
  try {
    const grade = await updateGrade(
      req.params.id,
      req.body
    );

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: "Grade not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Grade updated successfully",
      data: grade,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGradeController = async (req, res, next) => {
  try {
    const grade = await deleteGrade(req.params.id);

    res.status(200).json({
      success: true,
      message: "Grade deleted successfully",
      data: grade,
    });
  } catch (error) {
    next(error);
  }
};