import {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,
} from "./academicYear.service.js";

export const createAcademicYearController = async (
  req,
  res,
  next
) => {
  try {
    const academicYear =
      await createAcademicYear(req.body);

    res.status(201).json({
      success: true,
      message:
        "Academic year created successfully",
      data: academicYear,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAcademicYearsController = async (
  req,
  res,
  next
) => {
  try {
    const academicYears =
      await getAllAcademicYears();

    res.status(200).json({
      success: true,
      count: academicYears.length,
      data: academicYears,
    });
  } catch (error) {
    next(error);
  }
};

export const getAcademicYearByIdController = async (
  req,
  res,
  next
) => {
  try {
    const academicYear =
      await getAcademicYearById(
        req.params.id
      );

    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic year not found",
      });
    }

    res.status(200).json({
      success: true,
      data: academicYear,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAcademicYearController = async (
  req,
  res,
  next
) => {
  try {
    const academicYear =
      await updateAcademicYear(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Academic year updated successfully",
      data: academicYear,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAcademicYearController = async (
  req,
  res,
  next
) => {
  try {
    const academicYear =
      await deleteAcademicYear(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message:
        "Academic year deleted successfully",
      data: academicYear,
    });
  } catch (error) {
    next(error);
  }
};