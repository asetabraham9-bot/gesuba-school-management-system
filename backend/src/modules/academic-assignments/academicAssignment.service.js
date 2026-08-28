import AcademicAssignment from "./academicAssignment.model.js";
import Teacher from "../teachers/teacher.model.js";
import Subject from "../academic/subjects/subject.model.js";
import Grade from "../academic/grades/grade.model.js";
import Section from "../academic/sections/section.model.js";
import AcademicYear from "../academic/academic-years/academicYear.model.js";

const validateAssignmentData = async (
  teacherId,
  subjectId,
  gradeId,
  sectionId,
  academicYearId
) => {
  const teacher = await Teacher.findById(teacherId);

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  const subject = await Subject.findById(subjectId);

  if (!subject) {
    throw new Error("Subject not found");
  }

  const grade = await Grade.findById(gradeId);

  if (!grade) {
    throw new Error("Grade not found");
  }

  const section = await Section.findById(sectionId);

  if (!section) {
    throw new Error("Section not found");
  }

  if (
    section.grade.toString() !==
    grade._id.toString()
  ) {
    throw new Error(
      "Section does not belong to the selected grade"
    );
  }

  const academicYear =
    await AcademicYear.findById(academicYearId);

  if (!academicYear) {
    throw new Error("Academic year not found");
  }

  return {
    teacher,
    subject,
    grade,
    section,
    academicYear,
  };
};

export const createAcademicAssignment = async (
  data
) => {
  const {
    teacher,
    subject,
    grade,
    section,
    academicYear,
    status,
  } = data;

  await validateAssignmentData(
    teacher,
    subject,
    grade,
    section,
    academicYear
  );

  const existingAssignment =
    await AcademicAssignment.findOne({
      teacher,
      subject,
      grade,
      section,
      academicYear,
    });

  if (existingAssignment) {
    throw new Error(
      "This academic assignment already exists"
    );
  }

  const assignment =
    await AcademicAssignment.create({
      teacher,
      subject,
      grade,
      section,
      academicYear,
      status,
    });

  return await AcademicAssignment.findById(
    assignment._id
  )
    .populate({
      path: "teacher",
      populate: {
        path: "user",
        select: "fullName username email role",
      },
    })
    .populate("subject", "name code status")
    .populate("grade", "name status")
    .populate("section", "name status")
    .populate(
      "academicYear",
      "name startDate endDate status"
    );
};

export const getAllAcademicAssignments =
  async () => {
    return await AcademicAssignment.find()
      .populate({
        path: "teacher",
        populate: {
          path: "user",
          select: "fullName username email role",
        },
      })
      .populate("subject", "name code status")
      .populate("grade", "name status")
      .populate("section", "name status")
      .populate(
        "academicYear",
        "name startDate endDate status"
      )
      .sort({ createdAt: -1 });
  };

export const getAcademicAssignmentById =
  async (id) => {
    return await AcademicAssignment.findById(id)
      .populate({
        path: "teacher",
        populate: {
          path: "user",
          select: "fullName username email role",
        },
      })
      .populate("subject", "name code status")
      .populate("grade", "name status")
      .populate("section", "name status")
      .populate(
        "academicYear",
        "name startDate endDate status"
      );
  };

export const updateAcademicAssignment =
  async (id, data) => {
    const assignment =
      await AcademicAssignment.findById(id);

    if (!assignment) {
      throw new Error(
        "Academic assignment not found"
      );
    }

    const finalTeacher =
      data.teacher || assignment.teacher;

    const finalSubject =
      data.subject || assignment.subject;

    const finalGrade =
      data.grade || assignment.grade;

    const finalSection =
      data.section || assignment.section;

    const finalAcademicYear =
      data.academicYear ||
      assignment.academicYear;

    await validateAssignmentData(
      finalTeacher,
      finalSubject,
      finalGrade,
      finalSection,
      finalAcademicYear
    );

    const duplicate =
      await AcademicAssignment.findOne({
        teacher: finalTeacher,
        subject: finalSubject,
        grade: finalGrade,
        section: finalSection,
        academicYear: finalAcademicYear,
        _id: { $ne: id },
      });

    if (duplicate) {
      throw new Error(
        "This academic assignment already exists"
      );
    }

    return await AcademicAssignment.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate({
        path: "teacher",
        populate: {
          path: "user",
          select: "fullName username email role",
        },
      })
      .populate("subject", "name code status")
      .populate("grade", "name status")
      .populate("section", "name status")
      .populate(
        "academicYear",
        "name startDate endDate status"
      );
  };

export const deleteAcademicAssignment =
  async (id) => {
    const assignment =
      await AcademicAssignment.findById(id);

    if (!assignment) {
      throw new Error(
        "Academic assignment not found"
      );
    }

    await AcademicAssignment.findByIdAndDelete(id);

    return assignment;
  };