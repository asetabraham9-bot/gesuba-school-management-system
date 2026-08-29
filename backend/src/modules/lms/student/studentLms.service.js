import Lesson from "../lessons/lesson.model.js";
import Student from "../../students/student.model.js";
import AcademicAssignment from "../../academic-assignments/academicAssignment.model.js";
import Material from "../materials/material.model.js";
import Assignment from "../assignments/assignment.model.js";

export const getMySubjects = async (userId) => {
  /*
   * Find the student's profile using
   * the authenticated user's ID.
   */

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

  /*
   * The student's Grade and Section determine
   * which academic assignments are visible.
   */

  if (!student.grade || !student.section) {
    const error = new Error(
      "Student is not assigned to a grade and section"
    );

    error.statusCode = 400;
    throw error;
  }

  /*
   * Find academic assignments for the
   * student's Grade + Section.
   */

  const academicAssignments =
    await AcademicAssignment.find({
      grade: student.grade,
      section: student.section,
    })
      .populate({
        path: "subject",
        select: "name code status",
      })
      .populate({
        path: "teacher",
        populate: {
          path: "user",
          select: "fullName username",
        },
      })
      .populate({
        path: "grade",
        select: "name",
      })
      .populate({
        path: "section",
        select: "name",
      })
      .sort({
        createdAt: -1,
      });

  /*
   * Return only active academic assignments.
   */

  const activeAssignments =
    academicAssignments.filter(
      (assignment) =>
        assignment.subject &&
        assignment.teacher
    );

  return activeAssignments;
};

export const getMyLessons = async (userId) => {
  /*
   * Find the student's profile.
   */

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

  /*
   * Student must have Grade and Section.
   */

  if (!student.grade || !student.section) {
    const error = new Error(
      "Student is not assigned to a grade and section"
    );

    error.statusCode = 400;
    throw error;
  }

  /*
   * Find academic assignments for the
   * student's Grade + Section.
   */

  const academicAssignments =
    await AcademicAssignment.find({
      grade: student.grade,
      section: student.section,
    }).select("_id");

  const academicAssignmentIds =
    academicAssignments.map(
      (assignment) => assignment._id
    );

  /*
   * Import Lesson at the top of the file.
   */

  const lessons = await Lesson.find({
    academicAssignment: {
      $in: academicAssignmentIds,
    },
  })
    .populate({
      path: "academicAssignment",
      populate: [
        {
          path: "subject",
          select: "name code status",
        },
        {
          path: "teacher",
          populate: {
            path: "user",
            select: "fullName username",
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
    })
    .sort({
      createdAt: -1,
    });

  return lessons;
};

export const getMyMaterials = async (userId) => {
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

  if (!student.grade || !student.section) {
    const error = new Error(
      "Student is not assigned to a grade and section"
    );

    error.statusCode = 400;
    throw error;
  }

  /*
   * Find Academic Assignments for the
   * student's Grade + Section.
   */

  const academicAssignments =
    await AcademicAssignment.find({
      grade: student.grade,
      section: student.section,
    }).select("_id");

  const academicAssignmentIds =
    academicAssignments.map(
      (assignment) => assignment._id
    );

  /*
   * Find lessons belonging to those
   * Academic Assignments.
   */

  const lessons = await Lesson.find({
    academicAssignment: {
      $in: academicAssignmentIds,
    },
  }).select("_id");

  const lessonIds = lessons.map(
    (lesson) => lesson._id
  );

  /*
   * Find materials belonging to
   * those lessons.
   */

  const materials = await Material.find({
    lesson: {
      $in: lessonIds,
    },
    isPublished: true,
  })
    .populate({
      path: "lesson",
      populate: {
        path: "academicAssignment",
        populate: [
          {
            path: "subject",
            select: "name code status",
          },
          {
            path: "teacher",
            populate: {
              path: "user",
              select: "fullName username",
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
    })
    .sort({
      createdAt: -1,
    });

  return materials;
};

export const getMyAssignments = async (
  userId
) => {
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

  if (!student.grade || !student.section) {
    const error = new Error(
      "Student is not assigned to a grade and section"
    );

    error.statusCode = 400;
    throw error;
  }

  /*
   * Find Academic Assignments for the
   * student's Grade + Section.
   */

  const academicAssignments =
    await AcademicAssignment.find({
      grade: student.grade,
      section: student.section,
    }).select("_id");

  const academicAssignmentIds =
    academicAssignments.map(
      (assignment) => assignment._id
    );

  /*
   * Find lessons belonging to those
   * Academic Assignments.
   */

  const lessons = await Lesson.find({
    academicAssignment: {
      $in: academicAssignmentIds,
    },
  }).select("_id");

  const lessonIds = lessons.map(
    (lesson) => lesson._id
  );

  /*
   * Find assignments belonging to
   * those lessons.
   */

  const assignments =
    await Assignment.find({
      lesson: {
        $in: lessonIds,
      },
      status: {
        $in: ["PUBLISHED"],
      },
    })
      .populate({
        path: "lesson",
        populate: {
          path: "academicAssignment",
          populate: [
            {
              path: "subject",
              select: "name code status",
            },
            {
              path: "teacher",
              populate: {
                path: "user",
                select: "fullName username",
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
      })
      .sort({
        dueDate: 1,
        createdAt: -1,
      });

  return assignments;
};