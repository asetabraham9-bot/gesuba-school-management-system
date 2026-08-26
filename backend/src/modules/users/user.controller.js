import {
  createStudent,
  createTeacher,
  registerParent,
} from "./user.service.js";

export const createStudentController = async (req, res, next) => {
  try {
    const student = await createStudent(req.body);

    res.status(201).json({
      success: true,
      message: "Student account created successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const createTeacherController = async (req, res, next) => {
  try {
    const teacher = await createTeacher(req.body);

    res.status(201).json({
      success: true,
      message: "Teacher account created successfully",
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};

export const registerParentController = async (req, res, next) => {
  try {
    const parent = await registerParent(req.body);

    res.status(201).json({
      success: true,
      message: "Parent account registered successfully",
      data: parent,
    });
  } catch (error) {
    next(error);
  }
};