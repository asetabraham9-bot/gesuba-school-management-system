import { loginUser, changePassword,} from "./auth.service.js";

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

export const changePasswordController = async (req, res, next) => {
  try {
    await changePassword({
      userId: req.user._id,
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword,
    });

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};