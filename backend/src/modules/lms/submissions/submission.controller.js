import {
  createSubmission,
  getMySubmissions,
  getMySubmissionById,
} from "./submission.service.js";

/*
|--------------------------------------------------------------------------
| Create Submission
|--------------------------------------------------------------------------
*/

export const createSubmissionController = async (
  req,
  res,
  next
) => {
  try {
    const submission = await createSubmission(
      req.body,
      req.user
    );

    res.status(201).json({
      success: true,
      message: "Assignment submitted successfully",
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get My Submissions
|--------------------------------------------------------------------------
*/

export const getMySubmissionsController = async (
  req,
  res,
  next
) => {
  try {
    const submissions =
      await getMySubmissions(req.user);

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
| Get My Submission
|--------------------------------------------------------------------------
*/

export const getMySubmissionByIdController =
  async (req, res, next) => {
    try {
      const submission =
        await getMySubmissionById(
          req.params.id,
          req.user
        );

      res.status(200).json({
        success: true,
        data: submission,
      });
    } catch (error) {
      next(error);
    }
  };