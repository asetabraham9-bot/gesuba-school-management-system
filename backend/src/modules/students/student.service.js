import Student from "./student.model.js";
import User from "../users/user.model.js";
import Grade from "../academic/grades/grade.model.js";
import Section from "../academic/sections/section.model.js";
import { USER_ROLES } from "../users/user.constants.js";

/**
 * Validate the User assigned to a Student
 */
const validateStudentUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== USER_ROLES.STUDENT) {
    throw new Error("Selected user is not a student");
  }

  return user;
};

/**
 * Validate Grade and Section relationship
 */
const validateAcademicPlacement = async (gradeId, sectionId) => {
  const grade = await Grade.findById(gradeId);

  if (!grade) {
    throw new Error("Grade not found");
  }

  const section = await Section.findById(sectionId);

  if (!section) {
    throw new Error("Section not found");
  }

  // Critical relationship check
  if (section.grade.toString() !== gradeId.toString()) {
    throw new Error(
      "Section does not belong to the selected grade"
    );
  }

  return { grade, section };
};

/**
 * Create Student
 */
export const createStudent = async (studentData) => {
  const {
    user,
    admissionNumber,
    grade,
    section,
    dateOfBirth,
    gender,
    address,
    guardianName,
    guardianPhone,
    status,
  } = studentData;

  // 1. Validate User
  await validateStudentUser(user);

  // 2. Validate Grade + Section relationship
  await validateAcademicPlacement(grade, section);

  // 3. Check whether User is already assigned to a Student
  const existingStudent = await Student.findOne({
    user,
  });

  if (existingStudent) {
    throw new Error(
      "This user is already registered as a student"
    );
  }

  // 4. Check duplicate admission number
  const existingAdmission = await Student.findOne({
    admissionNumber: admissionNumber.trim().toUpperCase(),
  });

  if (existingAdmission) {
    throw new Error(
      "Admission number already exists"
    );
  }

  // 5. Create Student
  const student = await Student.create({
    user,
    admissionNumber,
    grade,
    section,
    dateOfBirth,
    gender,
    address,
    guardianName,
    guardianPhone,
    status,
  });

  // 6. Return populated result
  return await Student.findById(student._id)
    .populate("user", "fullName username email phone role")
    .populate("grade", "name status")
    .populate("section", "name status");
};

/**
 * Get all Students
 */
export const getAllStudents = async () => {
  return await Student.find()
    .populate(
      "user",
      "fullName username email phone role"
    )
    .populate("grade", "name status")
    .populate("section", "name status")
    .sort({ createdAt: -1 });
};

/**
 * Get Student by ID
 */
export const getStudentById = async (id) => {
  return await Student.findById(id)
    .populate(
      "user",
      "fullName username email phone role"
    )
    .populate("grade", "name status")
    .populate("section", "name status");
};

/**
 * Update Student
 */
export const updateStudent = async (id, studentData) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new Error("Student not found");
  }

  // Validate User if being changed
  if (studentData.user) {
    await validateStudentUser(studentData.user);

    const existingStudent = await Student.findOne({
      user: studentData.user,
      _id: { $ne: id },
    });

    if (existingStudent) {
      throw new Error(
        "This user is already registered as a student"
      );
    }
  }

  // Determine final Grade and Section
  const finalGrade =
    studentData.grade || student.grade;

  const finalSection =
    studentData.section || student.section;

  // Validate academic placement
  await validateAcademicPlacement(
    finalGrade,
    finalSection
  );

  // Normalize admission number
  if (studentData.admissionNumber) {
    studentData.admissionNumber =
      studentData.admissionNumber
        .trim()
        .toUpperCase();

    const existingAdmission =
      await Student.findOne({
        admissionNumber:
          studentData.admissionNumber,
        _id: { $ne: id },
      });

    if (existingAdmission) {
      throw new Error(
        "Admission number already exists"
      );
    }
  }

  const updatedStudent =
    await Student.findByIdAndUpdate(
      id,
      studentData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate(
        "user",
        "fullName username email phone role"
      )
      .populate("grade", "name status")
      .populate("section", "name status");

  return updatedStudent;
};

/**
 * Delete Student
 */
export const deleteStudent = async (id) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new Error("Student not found");
  }

  await Student.findByIdAndDelete(id);

  return student;
};