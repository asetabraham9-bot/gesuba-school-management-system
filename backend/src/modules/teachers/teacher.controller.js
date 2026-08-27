import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "./teacher.service.js";

export const createTeacherController = async (req, res, next) => {
  try {
    const result = await createTeacher(req.body);

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTeachersController = async (req, res, next) => {
  try {
    const teachers = await getAllTeachers();

    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers,
    });
  } catch (error) {
    next(error);
  }
};

export const getTeacherByIdController = async (req, res, next) => {
  try {
    const teacher = await getTeacherById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTeacherController = async (req, res, next) => {
  try {
    const teacher = await updateTeacher(
      req.params.id,
      req.body
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTeacherController = async (req, res, next) => {
  try {
    const teacher = await deleteTeacher(req.params.id);

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};