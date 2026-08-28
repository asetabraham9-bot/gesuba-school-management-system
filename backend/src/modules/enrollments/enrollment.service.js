import Enrollment from "./enrollment.model.js";
import Student from "../students/student.model.js";
import AcademicYear from "../academic/academic-years/academicYear.model.js";
import Grade from "../academic/grades/grade.model.js";
import Section from "../academic/sections/section.model.js";

const validateEnrollmentData = async (
  studentId,
  academicYearId,
  gradeId,
  sectionId
) => {
  const student = await Student.findById(studentId);

  if (!student) {
    throw new Error("Student not found");
  }

  const academicYear =
    await AcademicYear.findById(academicYearId);

  if (!academicYear) {
    throw new Error("Academic year not found");
  }

  const grade = await Grade.findById(gradeId);

  if (!grade) {
    throw new Error("Grade not found");
  }

  const section = await Section.findById(sectionId);

  if (!section) {
    throw new Error("Section not found");
  }

  // Ensure Section belongs to Grade
  if (
    section.grade.toString() !==
    grade._id.toString()
  ) {
    throw new Error(
      "Section does not belong to the selected grade"
    );
  }

  return {
    student,
    academicYear,
    grade,
    section,
  };
};

export const createEnrollment = async (data) => {
  const {
    student,
    academicYear,
    grade,
    section,
    status,
    enrollmentDate,
  } = data;

  await validateEnrollmentData(
    student,
    academicYear,
    grade,
    section
  );

  const existingEnrollment =
    await Enrollment.findOne({
      student,
      academicYear,
    });

  if (existingEnrollment) {
    throw new Error(
      "Student is already enrolled for this academic year"
    );
  }

  const enrollment = await Enrollment.create({
    student,
    academicYear,
    grade,
    section,
    status,
    enrollmentDate,
  });

  return await Enrollment.findById(
    enrollment._id
  )
    .populate({
      path: "student",
      populate: {
        path: "user",
        select: "fullName username email role",
      },
    })
    .populate("academicYear", "name startDate endDate status")
    .populate("grade", "name status")
    .populate("section", "name status");
};

export const getAllEnrollments = async () => {
  return await Enrollment.find()
    .populate({
      path: "student",
      populate: {
        path: "user",
        select: "fullName username email role",
      },
    })
    .populate(
      "academicYear",
      "name startDate endDate status"
    )
    .populate("grade", "name status")
    .populate("section", "name status")
    .sort({ createdAt: -1 });
};

export const getEnrollmentById = async (id) => {
  return await Enrollment.findById(id)
    .populate({
      path: "student",
      populate: {
        path: "user",
        select: "fullName username email role",
      },
    })
    .populate(
      "academicYear",
      "name startDate endDate status"
    )
    .populate("grade", "name status")
    .populate("section", "name status");
};

export const updateEnrollment = async (
  id,
  data
) => {
  const enrollment =
    await Enrollment.findById(id);

  if (!enrollment) {
    throw new Error("Enrollment not found");
  }

  const finalStudent =
    data.student || enrollment.student;

  const finalAcademicYear =
    data.academicYear ||
    enrollment.academicYear;

  const finalGrade =
    data.grade || enrollment.grade;

  const finalSection =
    data.section || enrollment.section;

  await validateEnrollmentData(
    finalStudent,
    finalAcademicYear,
    finalGrade,
    finalSection
  );

  if (
    data.student ||
    data.academicYear
  ) {
    const duplicate =
      await Enrollment.findOne({
        student: finalStudent,
        academicYear: finalAcademicYear,
        _id: { $ne: id },
      });

    if (duplicate) {
      throw new Error(
        "Student is already enrolled for this academic year"
      );
    }
  }

  return await Enrollment.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate({
      path: "student",
      populate: {
        path: "user",
        select: "fullName username email role",
      },
    })
    .populate(
      "academicYear",
      "name startDate endDate status"
    )
    .populate("grade", "name status")
    .populate("section", "name status");
};

export const deleteEnrollment = async (id) => {
  const enrollment =
    await Enrollment.findById(id);

  if (!enrollment) {
    throw new Error("Enrollment not found");
  }

  await Enrollment.findByIdAndDelete(id);

  return enrollment;
};