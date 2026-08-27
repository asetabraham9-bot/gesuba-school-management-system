import bcrypt from "bcryptjs";
import Student from "./student.model.js";
import User from "../users/user.model.js";

const generateStudentUsername = async () => {
  const lastStudent = await User.findOne({
    role: "STUDENT",
    username: /^GGSS\.STU\d+$/
  }).sort({ username: -1 });

  if (!lastStudent) {
    return "GGSS.STU0001";
  }

  const lastNumber = parseInt(
    lastStudent.username.replace("GGSS.STU", ""),
    10
  );

  const nextNumber = lastNumber + 1;

  return `GGSS.STU${String(nextNumber).padStart(4, "0")}`;
};

export const createStudent = async (studentData) => {
  const {
    fullName,
    dateOfBirth,
    gender,
    phone,
    address,
    grade,
    section,
    guardianName,
    guardianPhone,
    admissionNumber
  } = studentData;

  // Check admission number
  const existingStudent = await Student.findOne({
    admissionNumber
  });

  if (existingStudent) {
    throw new Error("Admission number already exists");
  }

  // Generate username
  const username = await generateStudentUsername();

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
    role: "STUDENT"
  });

  try {
    // Create Student profile
    const student = await Student.create({
      user: user._id,
      admissionNumber,
      dateOfBirth,
      gender,
      phone,
      address,
      grade,
      section,
      guardianName,
      guardianPhone
    });

    return {
      student,
      credentials: {
        username,
        temporaryPassword
      }
    };
  } catch (error) {
    // Remove user if student creation fails
    await User.findByIdAndDelete(user._id);

    throw error;
  }
};

export const getAllStudents = async () => {
  return await Student.find()
    .populate("user", "fullName username role")
    .sort({ createdAt: -1 });
};

export const getStudentById = async (id) => {
  return await Student.findById(id)
    .populate("user", "fullName username role");
};

export const updateStudent = async (id, studentData) => {
  return await Student.findByIdAndUpdate(
    id,
    studentData,
    {
      new: true,
      runValidators: true
    }
  ).populate(
    "user",
    "fullName username role"
  );
};

export const deleteStudent = async (id) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new Error("Student not found");
  }

  await Student.findByIdAndDelete(id);

  await User.findByIdAndDelete(student.user);

  return student;
};