import bcrypt from "bcryptjs";

import User from "../users/user.model.js";
import generateToken from "../../utils/jwt.js";

export const loginUser = async ({ username, password }) => {
  // Validate required credentials
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  // Find user and explicitly include password
  const user = await User.findOne({
    username: username.toUpperCase(),
  }).select("+password");

  // Don't reveal whether username exists
  if (!user) {
    throw new Error("Invalid username or password");
  }

  // Check whether account is active
  if (!user.isActive) {
    throw new Error(
      "Your account has been deactivated. Please contact the school administrator."
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

export default {
    loginUser,
};