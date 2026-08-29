import {
  getAssignmentSubmissions,
  getSubmissionForTeacher,
  gradeSubmission,
} from "./teacherSubmission.service.js";

/*
|--------------------------------------------------------------------------
| Get Assignment Submissions
|--------------------------------------------------------------------------
*/

export const getAssignmentSubmissionsController =
  async (req, res, next) => {
    try {
      const submissions =
        await getAssignmentSubmissions(
          req.params.assignmentId,
          req.user._id
        );

      res.status(200).json({
        success: true,
        count: submissions.length,
        data: submissions,
      });
    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Get One Submission
|--------------------------------------------------------------------------
*/

export const getSubmissionForTeacherController =
  async (req, res, next) => {
    try {
      const submission =
        await getSubmissionForTeacher(
          req.params.id,
          req.user._id
        );

      res.status(200).json({
        success: true,
        data: submission,
      });
    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Grade Submission
|--------------------------------------------------------------------------
*/

export const gradeSubmissionController =
  async (req, res, next) => {
    try {
      const submission =
        await gradeSubmission(
          req.params.id,
          req.body,
          req.user._id
        );

      res.status(200).json({
        success: true,
        message:
          "Submission graded successfully",
        data: submission,
      });
    } catch (error) {
      next(error);
    }
  };