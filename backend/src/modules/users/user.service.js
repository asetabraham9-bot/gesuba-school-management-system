import bcrypt from "bcryptjs";

import AppError from "../../utils/AppError.js";
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

    // GET all users of the system - by ADMIN only
export const getAllUsers = async ({ role, isActive, search, page = 1, limit = 20,}) => {
  const query = {
    isDeleted: false,
  };

  if (role) {
    query.role = role;
  }

  if (typeof isActive !== "undefined") {
    query.isActive = isActive === "true";
  }

  if (search) {
    query.$or = [
      {
        fullName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        username: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (page - 1) * limit;

  const [users, totalUsers] = await Promise.all([
    User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),

    User.countDocuments(query),
  ]);

  return {
    users,
    pagination: {
      currentPage: Number(page),
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      limit: Number(limit),
    },
  };
};

    //GET individual user by its username - by ADMIN only
export const getUserById = async (userId) => {
  const user = await User.findOne({
    _id: userId,
    isDeleted: false,
  }).select("-password");

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  return user;
};

    //UPDATE a user data - by ADMIN only
export const updateUser = async (
  userId,
  updateData
) => {
  const allowedFields = [
    "fullName",
    "email",
    "phone",
    "profileImage",
  ];

  const updates = {};

  for (const field of allowedFields) {
    if (
      Object.prototype.hasOwnProperty.call(
        updateData,
        field
      )
    ) {
      updates[field] = updateData[field];
    }
  }

  if (updates.email) {
    updates.email = updates.email.toLowerCase();

    const existingUser = await User.findOne({
      email: updates.email,
      _id: { $ne: userId },
      isDeleted: false,
    });

    if (existingUser) {
      throw new AppError(
        "Email is already registered",
        409
      );
    }
  }

  const user = await User.findOneAndUpdate(
    {
      _id: userId,
      isDeleted: false,
    },
    {
      $set: updates,
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  return user;
};

    // Activate/ Deactivate User - by ADMIN only
export const updateUserStatus = async (
  userId,
  isActive
) => {
  const user = await User.findOneAndUpdate(
    {
      _id: userId,
      isDeleted: false,
    },
    {
      $set: {
        isActive,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  return user;
};

    //Soft DELETE User by SYSTEM_ADMIN
export const deleteUser = async (userId) => {
  const user = await User.findOneAndUpdate(
    {
      _id: userId,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
        isActive: false,
        deletedAt: new Date(),
      },
    },
    {
      new: true,
    }
  ).select("-password");

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  return user;
};

export default {
  createStudent,
  createTeacher,
  registerParent,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  deleteUser,
};