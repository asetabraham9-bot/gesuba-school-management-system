import Lesson from "./lesson.model.js";
import AcademicAssignment from "../../academic-assignments/academicAssignment.model.js";
import Teacher from "../../teachers/teacher.model.js";

/*
|--------------------------------------------------------------------------
| Helper: Find Teacher Profile
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

// Helper: Verify Teacher Owns Academic Assignment

const verifyTeacherAssignment = async (
  assignmentId,
  userId
) => {
  const teacher =
    await getTeacherProfile(userId);

  const assignment =
    await AcademicAssignment.findById(
      assignmentId
    );

  if (!assignment) {
    const error = new Error(
      "Academic assignment not found"
    );

    error.statusCode = 404;

    throw error;
  }

  if (
    assignment.teacher.toString() !==
    teacher._id.toString()
  ) {
    const error = new Error(
      "You are not authorized to manage lessons for this academic assignment"
    );

    error.statusCode = 403;

    throw error;
  }

  return assignment;
};

// Create Lesson

export const createLesson = async (
  data,
  currentUser
) => {
  const {
    academicAssignment,
    title,
    description,
    content,
    lessonNumber,
    scheduledDate,
    status,
  } = data;

  /*
   * Verify academic assignment exists
   */

  const assignment =
    await AcademicAssignment.findById(
      academicAssignment
    );

  if (!assignment) {
    const error = new Error(
      "Academic assignment not found"
    );

    error.statusCode = 404;

    throw error;
  }

  /*
   * Teachers can only create lessons
   * under their own assignments.
   */

  if (currentUser.role === "TEACHER") {
    await verifyTeacherAssignment(
      academicAssignment,
      currentUser._id
    );
  }

  /*
   * Prevent duplicate lesson numbers.
   */

  const existingLesson =
    await Lesson.findOne({
      academicAssignment,
      lessonNumber,
    });

  if (existingLesson) {
    const error = new Error(
      "A lesson with this number already exists for this academic assignment"
    );

    error.statusCode = 409;

    throw error;
  }

  const lesson = await Lesson.create({
    academicAssignment,
    title,
    description,
    content,
    lessonNumber,
    scheduledDate,
    status,
  });

  return getLessonWithDetails(
    lesson._id
  );
};

// Get Lesson With Academic Details

const getLessonWithDetails = async (
  lessonId
) => {
  return await Lesson.findById(lessonId)
    .populate({
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
    });
};

//Get All Lessons

export const getAllLessons = async (
  currentUser
) => {
  let filter = {};

  /*
   * Admins can see all lessons.
   */

  if (currentUser.role === "TEACHER") {
    const teacher =
      await getTeacherProfile(
        currentUser._id
      );

    /*
     * Find all academic assignments
     * belonging to this teacher.
     */

    const assignments =
      await AcademicAssignment.find({
        teacher: teacher._id,
      }).select("_id");

    const assignmentIds =
      assignments.map(
        (assignment) => assignment._id
      );

    filter.academicAssignment = {
      $in: assignmentIds,
    };
  }

  return await Lesson.find(filter)
    .populate({
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
    })
    .sort({
      academicAssignment: 1,
      lessonNumber: 1,
    });
};

//Get Lesson By ID
export const getLessonById = async (
  id,
  currentUser
) => {
  const lesson =
    await Lesson.findById(id);

  if (!lesson) {
    const error = new Error(
      "Lesson not found"
    );

    error.statusCode = 404;

    throw error;
  }

  /*
   * Teacher can only access their own lesson.
   */

  if (currentUser.role === "TEACHER") {
    await verifyTeacherAssignment(
      lesson.academicAssignment,
      currentUser._id
    );
  }

  return getLessonWithDetails(id);
};

//Update Lesson
export const updateLesson = async (
  id,
  data,
  currentUser
) => {
  const lesson =
    await Lesson.findById(id);

  if (!lesson) {
    const error = new Error(
      "Lesson not found"
    );

    error.statusCode = 404;

    throw error;
  }

  /*
   * Teacher must own the existing lesson.
   */

  if (currentUser.role === "TEACHER") {
    await verifyTeacherAssignment(
      lesson.academicAssignment,
      currentUser._id
    );
  }

  /*
   * Prevent changing the academic assignment
   * to another teacher's assignment.
   */

  if (
    data.academicAssignment &&
    data.academicAssignment.toString() !==
      lesson.academicAssignment.toString()
  ) {
    if (currentUser.role === "TEACHER") {
      await verifyTeacherAssignment(
        data.academicAssignment,
        currentUser._id
      );
    } else {
      const assignment =
        await AcademicAssignment.findById(
          data.academicAssignment
        );

      if (!assignment) {
        const error = new Error(
          "Academic assignment not found"
        );

        error.statusCode = 404;

        throw error;
      }
    }
  }

  const finalAssignment =
    data.academicAssignment ||
    lesson.academicAssignment;

  const finalLessonNumber =
    data.lessonNumber ||
    lesson.lessonNumber;

  /*
   * Prevent duplicate lesson numbers.
   */

  const duplicate =
    await Lesson.findOne({
      academicAssignment: finalAssignment,
      lessonNumber: finalLessonNumber,
      _id: { $ne: id },
    });

  if (duplicate) {
    const error = new Error(
      "A lesson with this number already exists for this academic assignment"
    );

    error.statusCode = 409;

    throw error;
  }

  await Lesson.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  return getLessonWithDetails(id);
};

//Delete Lesson
export const deleteLesson = async (
  id,
  currentUser
) => {
  const lesson =
    await Lesson.findById(id);

  if (!lesson) {
    const error = new Error(
      "Lesson not found"
    );

    error.statusCode = 404;

    throw error;
  }

  /*
   * Teacher can delete only their own lesson.
   */

  if (currentUser.role === "TEACHER") {
    await verifyTeacherAssignment(
      lesson.academicAssignment,
      currentUser._id
    );
  }

  await Lesson.findByIdAndDelete(id);

  return lesson;
};