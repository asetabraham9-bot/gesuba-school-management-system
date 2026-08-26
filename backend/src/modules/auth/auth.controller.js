import { loginUser } from "./auth.service.js";

export const loginController = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserController = async (req, res) => {
  const user = req.user.toObject();

  delete user.password;

  res.status(200).json({
    success: true,
    message: "Current user retrieved successfully",
    data: user,
  });
};