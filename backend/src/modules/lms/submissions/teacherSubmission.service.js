import Submission from "./submission.model.js";
import Teacher from "../../teachers/teacher.model.js";
import Assignment from "../assignments/assignment.model.js";
import Lesson from "../lessons/lesson.model.js";
import AcademicAssignment from "../../academic-assignments/academicAssignment.model.js";

const getTeacherProfile = async (userId) => {
  const teacher = await Teacher.findOne({
    user: userId,
  });

  if (!teacher) {
    const error = new Error(
      "Teacher profile not found"
    );

    error.statusCode = 404;
    throw error;
  }

  return teacher;
};

/*
|--------------------------------------------------------------------------
| Verify Teacher Owns Assignment
|--------------------------------------------------------------------------
*/

const verifyTeacherAssignmentOwnership = async (
  assignmentId,
  userId
) => {
  const teacher =
    await getTeacherProfile(userId);

  const assignment =
    await Assignment.findById(
      assignmentId
    );

  if (!assignment) {
    const error = new Error(
      "Assignment not found"
    );

    error.statusCode = 404;
    throw error;
  }

  const lesson = await Lesson.findById(
    assignment.lesson
  );

  if (!lesson) {
    const error = new Error(
      "Lesson associated with assignment not found"
    );

    error.statusCode = 404;
    throw error;
  }

  const academicAssignment =
    await AcademicAssignment.findById(
      lesson.academicAssignment
    );

  if (!academicAssignment) {
    const error = new Error(
      "Academic assignment not found"
    );

    error.statusCode = 404;
    throw error;
  }

  /*
   * Teacher ownership check.
   */

  if (
    academicAssignment.teacher.toString() !==
    teacher._id.toString()
  ) {
    const error = new Error(
      "You are not authorized to manage this assignment"
    );

    error.statusCode = 403;
    throw error;
  }

  return {
    teacher,
    assignment,
    lesson,
    academicAssignment,
  };
};

/*
|--------------------------------------------------------------------------
| Get Assignment Submissions
|--------------------------------------------------------------------------
*/

export const getAssignmentSubmissions =
  async (
    assignmentId,
    userId
  ) => {
    await verifyTeacherAssignmentOwnership(
      assignmentId,
      userId
    );

    return Submission.find({
      assignment: assignmentId,
    })
      .populate({
        path: "student",
        populate: {
          path: "user",
          select:
            "fullName username email",
        },
      })
      .populate({
        path: "assignment",
        select:
          "title description totalMarks dueDate status",
      })
      .sort({
        submittedAt: 1,
      });
  };

/*
|--------------------------------------------------------------------------
| Get One Submission
|--------------------------------------------------------------------------
*/

export const getSubmissionForTeacher =
  async (
    submissionId,
    userId
  ) => {
    const submission =
      await Submission.findById(
        submissionId
      );

    if (!submission) {
      const error = new Error(
        "Submission not found"
      );

      error.statusCode = 404;
      throw error;
    }

    await verifyTeacherAssignmentOwnership(
      submission.assignment,
      userId
    );

    return Submission.findById(
      submissionId
    )
      .populate({
        path: "student",
        populate: {
          path: "user",
          select:
            "fullName username email",
        },
      })
      .populate({
        path: "assignment",
        select:
          "title description totalMarks dueDate status",
      });
  };

/*
|--------------------------------------------------------------------------
| Grade Submission
|--------------------------------------------------------------------------
*/

export const gradeSubmission = async (
  submissionId,
  data,
  userId
) => {
  const {
    marks,
    feedback,
  } = data;

  const submission =
    await Submission.findById(
      submissionId
    );

  if (!submission) {
    const error = new Error(
      "Submission not found"
    );

    error.statusCode = 404;
    throw error;
  }

  const {
    assignment,
  } =
    await verifyTeacherAssignmentOwnership(
      submission.assignment,
      userId
    );

  /*
   * Validate marks against assignment
   * total marks.
   */

  if (
    marks === undefined ||
    marks === null
  ) {
    const error = new Error(
      "Marks are required"
    );

    error.statusCode = 400;
    throw error;
  }

  if (marks < 0) {
    const error = new Error(
      "Marks cannot be negative"
    );

    error.statusCode = 400;
    throw error;
  }

  if (
    assignment.totalMarks !== undefined &&
    marks > assignment.totalMarks
  ) {
    const error = new Error(
      `Marks cannot exceed the assignment total marks of ${assignment.totalMarks}`
    );

    error.statusCode = 400;
    throw error;
  }

  submission.marks = marks;
  submission.feedback =
    feedback || "";
  submission.status = "GRADED";

  await submission.save();

  return Submission.findById(
    submission._id
  )
    .populate({
      path: "student",
      populate: {
        path: "user",
        select:
          "fullName username email",
      },
    })
    .populate({
      path: "assignment",
      select:
        "title totalMarks dueDate status",
    });
};