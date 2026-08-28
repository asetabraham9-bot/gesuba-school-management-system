import Material from "./material.model.js";
import Lesson from "../lessons/lesson.model.js";
import AcademicAssignment from "../../academic-assignments/academicAssignment.model.js";
import Teacher from "../../teachers/teacher.model.js";

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

  const assignment =
    await AcademicAssignment.findById(
      lesson.academicAssignment
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
      "You are not authorized to manage materials for this lesson"
    );

    error.statusCode = 403;
    throw error;
  }

  return lesson;
};

export const createMaterial = async (
  data,
  currentUser
) => {
  const {
    lesson,
    title,
    description,
    type,
    url,
    isPublished,
  } = data;

  const existingLesson =
    await Lesson.findById(lesson);

  if (!existingLesson) {
    const error = new Error(
      "Lesson not found"
    );

    error.statusCode = 404;
    throw error;
  }

  if (currentUser.role === "TEACHER") {
    await verifyTeacherLessonOwnership(
      lesson,
      currentUser._id
    );
  }

  const material =
    await Material.create({
      lesson,
      title,
      description,
      type,
      url,
      isPublished,
    });

  return material;
};

export const getAllMaterials = async (
  currentUser
) => {
  let filter = {};

  if (currentUser.role === "TEACHER") {
    const teacher =
      await getTeacherProfile(
        currentUser._id
      );

    const assignments =
      await AcademicAssignment.find({
        teacher: teacher._id,
      }).select("_id");

    const assignmentIds =
      assignments.map(
        (item) => item._id
      );

    const lessons = await Lesson.find({
      academicAssignment: {
        $in: assignmentIds,
      },
    }).select("_id");

    filter.lesson = {
      $in: lessons.map(
        (lesson) => lesson._id
      ),
    };
  }

  return Material.find(filter)
    .populate({
      path: "lesson",
      populate: {
        path: "academicAssignment",
        populate: [
          {
            path: "teacher",
          },
          {
            path: "subject",
          },
          {
            path: "grade",
          },
          {
            path: "section",
          },
        ],
      },
    })
    .sort({ createdAt: -1 });
};

export const getMaterialById = async (
  id,
  currentUser
) => {
  const material =
    await Material.findById(id);

  if (!material) {
    const error = new Error(
      "Material not found"
    );

    error.statusCode = 404;
    throw error;
  }

  if (currentUser.role === "TEACHER") {
    await verifyTeacherLessonOwnership(
      material.lesson,
      currentUser._id
    );
  }

  return Material.findById(id).populate({
    path: "lesson",
    populate: {
      path: "academicAssignment",
      populate: [
        {
          path: "teacher",
        },
        {
          path: "subject",
        },
        {
          path: "grade",
        },
        {
          path: "section",
        },
      ],
    },
  });
};

export const updateMaterial = async (
  id,
  data,
  currentUser
) => {
  const material =
    await Material.findById(id);

  if (!material) {
    const error = new Error(
      "Material not found"
    );

    error.statusCode = 404;
    throw error;
  }

  if (currentUser.role === "TEACHER") {
    await verifyTeacherLessonOwnership(
      material.lesson,
      currentUser._id
    );
  }

  if (
    data.lesson &&
    data.lesson.toString() !==
      material.lesson.toString()
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

  return Material.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteMaterial = async (
  id,
  currentUser
) => {
  const material =
    await Material.findById(id);

  if (!material) {
    const error = new Error(
      "Material not found"
    );

    error.statusCode = 404;
    throw error;
  }

  if (currentUser.role === "TEACHER") {
    await verifyTeacherLessonOwnership(
      material.lesson,
      currentUser._id
    );
  }

  await Material.findByIdAndDelete(id);

  return material;
};