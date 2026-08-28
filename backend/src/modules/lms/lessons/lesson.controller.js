import {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
} from "./lesson.service.js";

/*
|--------------------------------------------------------------------------
| Create Lesson
|--------------------------------------------------------------------------
*/

export const createLessonController = async (
  req,
  res,
  next
) => {
  try {
    const lesson = await createLesson(
      req.body,
      req.user
    );

    res.status(201).json({
      success: true,
      message: "Lesson created successfully",
      data: lesson,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get All Lessons
|--------------------------------------------------------------------------
*/

export const getAllLessonsController = async (
  req,
  res,
  next
) => {
  try {
    const lessons = await getAllLessons(
      req.user
    );

    res.status(200).json({
      success: true,
      count: lessons.length,
      data: lessons,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Lesson By ID
|--------------------------------------------------------------------------
*/

export const getLessonByIdController = async (
  req,
  res,
  next
) => {
  try {
    const lesson = await getLessonById(
      req.params.id,
      req.user
    );

    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Lesson
|--------------------------------------------------------------------------
*/

export const updateLessonController = async (
  req,
  res,
  next
) => {
  try {
    const lesson = await updateLesson(
      req.params.id,
      req.body,
      req.user
    );

    res.status(200).json({
      success: true,
      message: "Lesson updated successfully",
      data: lesson,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Lesson
|--------------------------------------------------------------------------
*/

export const deleteLessonController = async (
  req,
  res,
  next
) => {
  try {
    await deleteLesson(
      req.params.id,
      req.user
    );

    res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};