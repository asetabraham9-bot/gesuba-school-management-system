import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "./subject.service.js";

export const createSubjectController = async (req, res, next) => {
  try {
    const subject = await createSubject(req.body);

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSubjectsController = async (req, res, next) => {
  try {
    const subjects = await getAllSubjects();

    res.status(200).json({
      success: true,
      count: subjects.length,
      data: subjects,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubjectByIdController = async (req, res, next) => {
  try {
    const subject = await getSubjectById(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubjectController = async (req, res, next) => {
  try {
    const subject = await updateSubject(
      req.params.id,
      req.body
    );

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubjectController = async (req, res, next) => {
  try {
    const subject = await deleteSubject(req.params.id);

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};