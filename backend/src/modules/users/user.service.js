import bcrypt from "bcryptjs";

import User from "./user.model.js";
import generateUserId from "./user-id.service.js";
import { USER_ROLES } from "./user.constants.js";

const SALT_ROUNDS = 12;

/**
 * Create a student account.
 * This operation will eventually be restricted to School Admin.
 */
export const createStudent = async ({
  fullName,
  email,
  phone,
  password,
}) => {
  // Check whether email is already used
  if (email) {
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      throw new Error("Email is already registered");
    }
  }

  // Generate school ID
  const username = await generateUserId(USER_ROLES.STUDENT);

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user
  const user = await User.create({
    fullName,
    username,
    email,
    password: hashedPassword,
    role: USER_ROLES.STUDENT,
    phone,
  });


  return sanitizeUser(user);
};

/**
 * Create a teacher account.
 * This operation will eventually be restricted to School Admin.
 */
export const createTeacher = async ({
  fullName,
  email,
  phone,
  password,
}) => {
  // Check whether email is already used
  if (email) {
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      throw new Error("Email is already registered");
    }
  }

  // Generate school ID
  const username = await generateUserId(USER_ROLES.TEACHER);

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user
  const user = await User.create({
    fullName,
    username,
    email,
    password: hashedPassword,
    role: USER_ROLES.TEACHER,
    phone,
  });

  return sanitizeUser(user);
};

/**
 * Register a parent account.
 *
 * Student verification will be connected when
 * the Student module is implemented.
 */
export const registerParent = async ({
  fullName,
  email,
  phone,
  password,
  studentId,
}) => {
  if (!studentId) {
    throw new Error("Student ID is required for parent registration");
  }

  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingUser) {
    throw new Error("Email is already registered");
  }

  /*
   * TODO:
   *
   * Verify that studentId exists in the Student collection.
   *
   * This will be implemented when the Student module
   * is introduced.
   */

  const username = await generateUserId(USER_ROLES.PARENT);

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    fullName,
    username,
    email,
    password: hashedPassword,
    role: USER_ROLES.PARENT,
    phone,
  });

  return sanitizeUser(user);
};

/**
 * Remove sensitive fields before returning user information.
 */
const sanitizeUser = (user) => {
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

export default {
  createStudent,
  createTeacher,
  registerParent,
};