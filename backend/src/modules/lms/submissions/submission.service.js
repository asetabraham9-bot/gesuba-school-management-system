import Submission from "./submission.model.js";
import Student from "../../students/student.model.js";
import Assignment from "../assignments/assignment.model.js";
import Lesson from "../lessons/lesson.model.js";
import AcademicAssignment from "../../academic-assignments/academicAssignment.model.js";

//Get Student Profile

const getStudentProfile = async (userId) => {
  const student = await Student.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error(
      "Student profile not found"
    );

    error.statusCode = 404;
    throw error;
  }

  return student;
};

//Verify Student Can Access Assignment
const verifyStudentAssignmentAccess = async (
  assignmentId,
  userId
) => {
  const student =
    await getStudentProfile(userId);

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
   * Check Grade.
   */

  if (
    student.grade.toString() !==
    academicAssignment.grade.toString()
  ) {
    const error = new Error(
      "You are not authorized to submit this assignment"
    );

    error.statusCode = 403;
    throw error;
  }

  /*
   * Check Section.
   */

  if (
    student.section.toString() !==
    academicAssignment.section.toString()
  ) {
    const error = new Error(
      "You are not authorized to submit this assignment"
    );

    error.statusCode = 403;
    throw error;
  }

  return {
    student,
    assignment,
    lesson,
    academicAssignment,
  };
};

//Create Submission

export const createSubmission = async (
  data,
  currentUser
) => {
  const {
    assignment,
    answer,
  } = data;

  const {
    student,
    assignment: existingAssignment,
  } =
    await verifyStudentAssignmentAccess(
      assignment,
      currentUser._id
    );

  /*
   * Only published assignments can
   * receive student submissions.
   */

  if (
    existingAssignment.status !==
    "PUBLISHED"
  ) {
    const error = new Error(
      "This assignment is not available for submission"
    );

    error.statusCode = 400;
    throw error;
  }

  /*
   * Prevent duplicate submissions for now.
   */

  const existingSubmission =
    await Submission.findOne({
      assignment,
      student: student._id,
    });

  if (existingSubmission) {
    const error = new Error(
      "You have already submitted this assignment"
    );

    error.statusCode = 409;
    throw error;
  }

  /*
   * Check due date.
   */

  if (
    existingAssignment.dueDate &&
    new Date() >
      new Date(
        existingAssignment.dueDate
      )
  ) {
    const error = new Error(
      "The submission deadline has passed"
    );

    error.statusCode = 400;
    throw error;
  }

  const submission =
    await Submission.create({
      assignment,
      student: student._id,
      answer,
      submittedAt: new Date(),
      status: "SUBMITTED",
    });

  return getSubmissionWithDetails(
    submission._id
  );
};

//Get Submission With Details
const getSubmissionWithDetails = async (
  submissionId
) => {
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
      populate: {
        path: "lesson",
        populate: {
          path: "academicAssignment",
          populate: [
            {
              path: "subject",
              select: "name code",
            },
            {
              path: "teacher",
              populate: {
                path: "user",
                select:
                  "fullName username",
              },
            },
            {
              path: "grade",
              select: "name",
            },
            {
              path: "section",
              select: "name",
            },
          ],
        },
      },
    });
};

//Get My Submissions
export const getMySubmissions = async (
  currentUser
) => {
  const student =
    await getStudentProfile(
      currentUser._id
    );

  return Submission.find({
    student: student._id,
  })
    .populate({
      path: "assignment",
      populate: {
        path: "lesson",
        populate: {
          path: "academicAssignment",
          populate: [
            {
              path: "subject",
              select: "name code",
            },
            {
              path: "teacher",
              populate: {
                path: "user",
                select:
                  "fullName username",
              },
            },
          ],
        },
      },
    })
    .sort({
      submittedAt: -1,
    });
};
//Get My Submission By ID
export const getMySubmissionById = async (
  submissionId,
  currentUser
) => {
  const student =
    await getStudentProfile(
      currentUser._id
    );

  const submission =
    await Submission.findOne({
      _id: submissionId,
      student: student._id,
    });

  if (!submission) {
    const error = new Error(
      "Submission not found"
    );

    error.statusCode = 404;
    throw error;
  }

  return getSubmissionWithDetails(
    submissionId
  );
};