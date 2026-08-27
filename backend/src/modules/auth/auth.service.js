import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;
import User from "../users/user.model.js";
import generateToken from "../../utils/jwt.js";
import AppError from "../../utils/AppError.js";

export const loginUser = async ({ username, password }) => {
  // Validate required credentials
  if (!username || !password) {
    throw new AppError(
  "Username and password are required",
  400
);
  }

  // Find user and explicitly include password
  const user = await User.findOne({
    username: username.toUpperCase(),
  }).select("+password");

  // Don't reveal whether username exists
  if (!user) {
    throw new AppError(
  "Invalid username or password",
  401
);
  }

  // Check whether account is active
  if (!user.isActive) {
    throw new AppError(
  "Your account has been deactivated. Please contact the school administrator.",
  403
);
  }

  // Compare entered password with stored hash
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  // Update last login
  user.lastLogin = new Date();

  await user.save();

  // Generate JWT
  const token = generateToken(user);

  return {
    user: sanitizeUser(user),
    token,
  };
};

const sanitizeUser = (user) => {
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

export const changePassword = async ({
  userId,
  currentPassword,
  newPassword,
}) => {
  if (!currentPassword || !newPassword) {
    throw new Error(
      "Current password and new password are required"
    );
  }

  if (newPassword.length < 8) {
    throw new Error(
      "New password must be at least 8 characters long"
    );
  }

  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new Error("User account not found");
  }

  if (!user.isActive) {
    throw new Error("Your account has been deactivated");
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isCurrentPasswordValid) {
    throw new Error("Current password is incorrect");
  }

  const isSamePassword = await bcrypt.compare(
    newPassword,
    user.password
  );

  if (isSamePassword) {
    throw new Error(
      "New password must be different from your current password"
    );
  }

  user.password = await bcrypt.hash(
    newPassword,
    SALT_ROUNDS
  );

  await user.save();

  return true;
};

export default {
    loginUser,
    changePassword,
};