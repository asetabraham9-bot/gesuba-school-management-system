import AppError from "../utils/AppError.js";

const canManageTarget = (req, res, next) => {
  const requesterRole = req.user.role;
  const targetRole = req.targetUser?.role;

  if (!targetRole) {
    return next();
  }

  if (requesterRole === "SYSTEM_ADMIN") {
    return next();
  }

  if (
    requesterRole === "SCHOOL_ADMIN" &&
    ["STUDENT", "TEACHER"].includes(targetRole)
  ) {
    return next();
  }

  return next(
    new AppError(
      "You do not have permission to manage this user",
      403
    )
  );
};

export default canManageTarget;