import Assignment from "./assignment.model.js";
import Lesson from "../lessons/lesson.model.js";
import AcademicAssignment from "../../academic-assignments/academicAssignment.model.js";
import Teacher from "../../teachers/teacher.model.js";

/*
|--------------------------------------------------------------------------
| Get Teacher Profile
|--------------------------------------------------------------------------
*/

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
| Verify Teacher Owns Lesson
|--------------------------------------------------------------------------
|
| Teacher
|   ↓
| Academic Assignment
|   ↓
| Lesson
|
|--------------------------------------------------------------------------
*/

const verifyTeacherLessonOwnership = async (
  lessonId,
  userId
) => {
  const teacher =
    await getTeacherProfile(userId);

  const lesson = await Lesson.findById(
    lessonId
  );

  if (!lesson) {
    const error = new Error(
      "Lesson not found"
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

  if (
    academicAssignment.teacher.toString() !==
    teacher._id.toString()
  ) {
    const error = new Error(
      "You are not authorized to manage assignments for this lesson"
    );

    error.statusCode = 403;
    throw error;
  }

  return lesson;
};

/*
|--------------------------------------------------------------------------
| Create Assignment
|--------------------------------------------------------------------------
*/

export const createAssignment = async (
  data,
  currentUser
) => {
  const {
    lesson,
    title,
    description,
    instructions,
    dueDate,
    totalMarks,
    status,
  } = data;

  /*
   * Verify lesson exists.
   */

  const existingLesson =
    await Lesson.findById(lesson);

  if (!existingLesson) {
    const error = new Error(
      "Lesson not found"
    );

    error.statusCode = 404;
    throw error;
  }

  /*
   * Teacher can only create assignments
   * under their own lesson.
   */

  if (currentUser.role === "TEACHER") {
    await verifyTeacherLessonOwnership(
      lesson,
      currentUser._id
    );
  }

  /*
   * Create assignment.
   */

  const assignment =
    await Assignment.create({
      lesson,
      title,
      description,
      instructions,
      dueDate,
      totalMarks,
      status,
    });

  return getAssignmentWithDetails(
    assignment._id
  );
};

/*
|--------------------------------------------------------------------------
| Get Assignment With Details
|--------------------------------------------------------------------------
*/

const getAssignmentWithDetails = async (
  assignmentId
) => {
  return Assignment.findById(
    assignmentId
  ).populate({
    path: "lesson",
    populate: {
      path: "academicAssignment",
      populate: [
        {
          path: "teacher",
          populate: {
            path: "user",
            select:
              "fullName username email role",
          },
        },
        {
          path: "subject",
          select: "name code status",
        },
        {
          path: "grade",
          select: "name status",
        },
        {
          path: "section",
          select: "name status",
        },
        {
          path: "academicYear",
          select:
            "name startDate endDate status",
        },
      ],
    },
  });
};

/*
|--------------------------------------------------------------------------
| Get All Assignments
|--------------------------------------------------------------------------
*/

export const getAllAssignments = async (
  currentUser
) => {
  let filter = {};

  /*
   * Teachers should only see assignments
   * belonging to their own lessons.
   */

  if (currentUser.role === "TEACHER") {
    const teacher =
      await getTeacherProfile(
        currentUser._id
      );

    /*
     * Find the teacher's academic assignments.
     */

    const academicAssignments =
      await AcademicAssignment.find({
        teacher: teacher._id,
      }).select("_id");

    const academicAssignmentIds =
      academicAssignments.map(
        (item) => item._id
      );

    /*
     * Find lessons belonging to those
     * academic assignments.
     */

    const lessons = await Lesson.find({
      academicAssignment: {
        $in: academicAssignmentIds,
      },
    }).select("_id");

    const lessonIds = lessons.map(
      (lesson) => lesson._id
    );

    filter.lesson = {
      $in: lessonIds,
    };
  }

  return Assignment.find(filter)
    .populate({
      path: "lesson",
      populate: {
        path: "academicAssignment",
        populate: [
          {
            path: "teacher",
            populate: {
              path: "user",
              select:
                "fullName username email role",
            },
          },
          {
            path: "subject",
            select: "name code status",
          },
          {
            path: "grade",
            select: "name status",
          },
          {
            path: "section",
            select: "name status",
          },
          {
            path: "academicYear",
            select:
              "name startDate endDate status",
          },
        ],
      },
    })
    .sort({
      createdAt: -1,
    });
};

/*
|--------------------------------------------------------------------------
| Get Assignment By ID
|--------------------------------------------------------------------------
*/

export const getAssignmentById = async (
  id,
  currentUser
) => {
  const assignment =
    await Assignment.findById(id);

  if (!assignment) {
    const error = new Error(
      "Assignment not found"
    );

    error.statusCode = 404;
    throw error;
  }

  /*
   * Teacher can only access assignments
   * belonging to their own lessons.
   */

  if (currentUser.role === "TEACHER") {
    await verifyTeacherLessonOwnership(
      assignment.lesson,
      currentUser._id
    );
  }

  return getAssignmentWithDetails(id);
};

/*
|--------------------------------------------------------------------------
| Update Assignment
|--------------------------------------------------------------------------
*/

export const updateAssignment = async (
  id,
  data,
  currentUser
) => {
  const assignment =
    await Assignment.findById(id);

  if (!assignment) {
    const error = new Error(
      "Assignment not found"
    );

    error.statusCode = 404;
    throw error;
  }

  /*
   * Teacher must own the existing lesson.
   */

  if (currentUser.role === "TEACHER") {
    await verifyTeacherLessonOwnership(
      assignment.lesson,
      currentUser._id
    );
  }

  /*
   * Prevent teacher from moving the
   * assignment to another teacher's lesson.
   */

  if (
    data.lesson &&
    data.lesson.toString() !==
      assignment.lesson.toString()
  ) {
    if (currentUser.role === "TEACHER") {
      await verifyTeacherLessonOwnership(
        data.lesson,
        currentUser._id
      );
    } else {
      const lesson =
        await Lesson.findById(
          data.lesson
        );

      if (!lesson) {
        const error = new Error(
          "Lesson not found"
        );

        error.statusCode = 404;
        throw error;
      }
    }
  }

  const updatedAssignment =
    await Assignment.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

  return getAssignmentWithDetails(
    updatedAssignment._id
  );
};

/*
|--------------------------------------------------------------------------
| Delete Assignment
|--------------------------------------------------------------------------
*/

export const deleteAssignment = async (
  id,
  currentUser
) => {
  const assignment =
    await Assignment.findById(id);

  if (!assignment) {
    const error = new Error(
      "Assignment not found"
    );

    error.statusCode = 404;
    throw error;
  }

  /*
   * Teacher can delete only assignments
   * belonging to their own lesson.
   */

  if (currentUser.role === "TEACHER") {
    await verifyTeacherLessonOwnership(
      assignment.lesson,
      currentUser._id
    );
  }

  await Assignment.findByIdAndDelete(id);

  return assignment;
};