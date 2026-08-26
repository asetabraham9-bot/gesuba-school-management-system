import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const payload = {
    userId: user._id.toString(),
    username: user.username,
    role: user.role,
  };

  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );
};

export default generateToken;