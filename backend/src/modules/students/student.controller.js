import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "./student.service.js";

/**
 * Create Student
 */
export const createStudentController = async (req, res, next) => {
  try {
    const student = await createStudent(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get All Students
 */
export const getAllStudentsController = async (req, res, next) => {
  try {
    const students = await getAllStudents();

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Student By ID
 */
export const getStudentByIdController = async (req, res, next) => {
  try {
    const student = await getStudentById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Student
 */
export const updateStudentController = async (req, res, next) => {
  try {
    const student = await updateStudent(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Student
 */
export const deleteStudentController = async (req, res, next) => {
  try {
    const student = await deleteStudent(req.params.id);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};