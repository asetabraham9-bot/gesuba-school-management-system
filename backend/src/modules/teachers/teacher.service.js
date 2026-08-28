import Teacher from "./teacher.model.js";
import User from "../users/user.model.js";
import { USER_ROLES } from "../users/user.constants.js";

const validateTeacherUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== USER_ROLES.TEACHER) {
    throw new Error("Selected user is not a teacher");
  }

  return user;
};

export const createTeacher = async (teacherData) => {
  const {
    user,
    employeeId,
    qualification,
    specialization,
    dateOfBirth,
    gender,
    address,
    status,
  } = teacherData;

  // Validate User
  await validateTeacherUser(user);

  // Prevent one User from having multiple Teacher profiles
  const existingTeacher = await Teacher.findOne({
    user,
  });

  if (existingTeacher) {
    throw new Error(
      "This user is already registered as a teacher"
    );
  }

  // Normalize employee ID
  const normalizedEmployeeId = employeeId
    .trim()
    .toUpperCase();

  // Check duplicate employee ID
  const existingEmployee = await Teacher.findOne({
    employeeId: normalizedEmployeeId,
  });

  if (existingEmployee) {
    throw new Error(
      "Employee ID already exists"
    );
  }

  const teacher = await Teacher.create({
    user,
    employeeId: normalizedEmployeeId,
    qualification,
    specialization,
    dateOfBirth,
    gender,
    address,
    status,
  });

  return await Teacher.findById(teacher._id).populate(
    "user",
    "fullName username email phone role"
  );
};

export const getAllTeachers = async () => {
  return await Teacher.find()
    .populate(
      "user",
      "fullName username email phone role"
    )
    .sort({ createdAt: -1 });
};

export const getTeacherById = async (id) => {
  return await Teacher.findById(id).populate(
    "user",
    "fullName username email phone role"
  );
};

export const updateTeacher = async (id, teacherData) => {
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  // Validate new User if provided
  if (teacherData.user) {
    await validateTeacherUser(teacherData.user);

    const existingTeacher = await Teacher.findOne({
      user: teacherData.user,
      _id: { $ne: id },
    });

    if (existingTeacher) {
      throw new Error(
        "This user is already registered as a teacher"
      );
    }
  }

  // Normalize employee ID
  if (teacherData.employeeId) {
    teacherData.employeeId = teacherData.employeeId
      .trim()
      .toUpperCase();

    const existingEmployee = await Teacher.findOne({
      employeeId: teacherData.employeeId,
      _id: { $ne: id },
    });

    if (existingEmployee) {
      throw new Error(
        "Employee ID already exists"
      );
    }
  }

  return await Teacher.findByIdAndUpdate(
    id,
    teacherData,
    {
      new: true,
      runValidators: true,
    }
  ).populate(
    "user",
    "fullName username email phone role"
  );
};

export const deleteTeacher = async (id) => {
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  await Teacher.findByIdAndDelete(id);

  return teacher;
};