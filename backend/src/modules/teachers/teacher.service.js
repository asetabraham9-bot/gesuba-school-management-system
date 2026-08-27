import bcrypt from "bcryptjs";
import Teacher from "./teacher.model.js";
import User from "../users/user.model.js";

const generateTeacherUsername = async () => {
  const lastTeacher = await User.findOne({
    role: "TEACHER",
    username: /^GGSS\.TEA\d+$/
  }).sort({ username: -1 });

  if (!lastTeacher) {
    return "GGSS.TEA0001";
  }

  const lastNumber = parseInt(
    lastTeacher.username.replace("GGSS.TEA", ""),
    10
  );

  const nextNumber = lastNumber + 1;

  return `GGSS.TEA${String(nextNumber).padStart(4, "0")}`;
};

export const createTeacher = async (teacherData) => {
  const {
    fullName,
    employeeNumber,
    dateOfBirth,
    gender,
    phone,
    address,
    qualification,
    specialization
  } = teacherData;

  // Check employee number
  const existingTeacher = await Teacher.findOne({
    employeeNumber
  });

  if (existingTeacher) {
    throw new Error("Employee number already exists");
  }

  // Generate username
  const username = await generateTeacherUsername();

  // Generate temporary password
  const temporaryPassword = `${username}@123`;

  // Hash password
  const hashedPassword = await bcrypt.hash(
    temporaryPassword,
    10
  );

  // Create User account
  const user = await User.create({
    fullName,
    username,
    password: hashedPassword,
    role: "TEACHER"
  });

  try {
    // Create Teacher profile
    const teacher = await Teacher.create({
      user: user._id,
      employeeNumber,
      dateOfBirth,
      gender,
      phone,
      address,
      qualification,
      specialization
    });

    return {
      teacher,
      credentials: {
        username,
        temporaryPassword
      }
    };
  } catch (error) {
    // Remove User if Teacher creation fails
    await User.findByIdAndDelete(user._id);

    throw error;
  }
};

export const getAllTeachers = async () => {
  return await Teacher.find()
    .populate("user", "fullName username role")
    .sort({ createdAt: -1 });
};

export const getTeacherById = async (id) => {
  return await Teacher.findById(id)
    .populate("user", "fullName username role");
};

export const updateTeacher = async (id, teacherData) => {
  return await Teacher.findByIdAndUpdate(
    id,
    teacherData,
    {
      new: true,
      runValidators: true
    }
  ).populate(
    "user",
    "fullName username role"
  );
};

export const deleteTeacher = async (id) => {
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  await Teacher.findByIdAndDelete(id);

  await User.findByIdAndDelete(teacher.user);

  return teacher;
};
