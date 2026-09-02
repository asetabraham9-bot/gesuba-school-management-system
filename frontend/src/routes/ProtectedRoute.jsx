import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const token =
    localStorage.getItem("ggss_token") ||
    sessionStorage.getItem("ggss_token");

  const storedUser =
    localStorage.getItem("ggss_user") ||
    sessionStorage.getItem("ggss_user");

  /*
   * Temporary frontend authentication check.
   *
   * Later this will be replaced by our centralized
   * authentication context/service.
   */

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid stored user data:", error);
  }

  if (
    allowedRoles.length > 0 &&
    (!user?.role || !allowedRoles.includes(user.role))
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;