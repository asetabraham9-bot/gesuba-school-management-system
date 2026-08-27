import {
  createStudent,
  createTeacher,
  registerParent,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  deleteUser,
} from "./user.service.js";

export const createStudentController = async (req, res, next) => {
  try {
    const student = await createStudent(req.body);

    res.status(201).json({
      success: true,
      message: "Student account created successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const createTeacherController = async (req, res, next) => {
  try {
    const teacher = await createTeacher(req.body);

    res.status(201).json({
      success: true,
      message: "Teacher account created successfully",
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};

export const registerParentController = async (req, res, next) => {
  try {
    const parent = await registerParent(req.body);

    res.status(201).json({
      success: true,
      message: "Parent account registered successfully",
      data: parent,
    });
  } catch (error) {
    next(error);
  }
};

//GET all Users
export const getAllUsersController = async (req, res, next) => {
  try {
    const result = await getAllUsers(req.query);

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// GET individual User
export const getUserByIdController = async ( req, res, next) => {
  try {
    const user = await getUserById(
      req.params.userId
    );

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//UPDATE User
export const updateUserController = async ( req, res, next) => {
  try {
    const user = await updateUser(
      req.params.userId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//Change a User Status
export const updateUserStatusController = async (req, res, next) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be a boolean",
      });
    }

    const user = await updateUserStatus(
      req.params.userId,
      isActive
    );

    res.status(200).json({
      success: true,
      message: `User ${
        isActive ? "activated" : "deactivated"
      } successfully`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Soft DELETE
export const deleteUserController = async ( req, res, next) => {
  try {
    const user = await deleteUser(
      req.params.userId
    );

    res.status(200).json({
      success: true,
      message: "User archived successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};