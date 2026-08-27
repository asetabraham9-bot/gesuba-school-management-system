import {
  createSection,
  getAllSections,
  getSectionsByGrade,
  getSectionById,
  updateSection,
  deleteSection,
} from "./section.service.js";

export const createSectionController = async (req, res, next) => {
  try {
    const section = await createSection(req.body);

    res.status(201).json({
      success: true,
      message: "Section created successfully",
      data: section,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSectionsController = async (req, res, next) => {
  try {
    const sections = await getAllSections();

    res.status(200).json({
      success: true,
      count: sections.length,
      data: sections,
    });
  } catch (error) {
    next(error);
  }
};

export const getSectionsByGradeController = async (
  req,
  res,
  next
) => {
  try {
    const sections = await getSectionsByGrade(
      req.params.gradeId
    );

    res.status(200).json({
      success: true,
      count: sections.length,
      data: sections,
    });
  } catch (error) {
    next(error);
  }
};

export const getSectionByIdController = async (
  req,
  res,
  next
) => {
  try {
    const section = await getSectionById(
      req.params.id
    );

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSectionController = async (
  req,
  res,
  next
) => {
  try {
    const section = await updateSection(
      req.params.id,
      req.body
    );

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: section,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSectionController = async (
  req,
  res,
  next
) => {
  try {
    const section = await deleteSection(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: section,
    });
  } catch (error) {
    next(error);
  }
};