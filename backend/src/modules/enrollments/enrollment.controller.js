import {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
} from "./enrollment.service.js";

export const createEnrollmentController = async (
  req,
  res,
  next
) => {
  try {
    const enrollment =
      await createEnrollment(req.body);

    res.status(201).json({
      success: true,
      message:
        "Student enrolled successfully",
      data: enrollment,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEnrollmentsController = async (
  req,
  res,
  next
) => {
  try {
    const enrollments =
      await getAllEnrollments();

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    next(error);
  }
};

export const getEnrollmentByIdController = async (
  req,
  res,
  next
) => {
  try {
    const enrollment =
      await getEnrollmentById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEnrollmentController = async (
  req,
  res,
  next
) => {
  try {
    const enrollment =
      await updateEnrollment(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Enrollment updated successfully",
      data: enrollment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEnrollmentController = async (
  req,
  res,
  next
) => {
  try {
    const enrollment =
      await deleteEnrollment(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message:
        "Enrollment deleted successfully",
      data: enrollment,
    });
  } catch (error) {
    next(error);
  }
};