import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const token =
    localStorage.getItem('ggss_token') ||
    sessionStorage.getItem('ggss_token');

  const storedUser =
    localStorage.getItem('ggss_user') ||
    sessionStorage.getItem('ggss_user');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Invalid stored user data:', error);

    localStorage.removeItem('ggss_user');
    sessionStorage.removeItem('ggss_user');

    return <Navigate to="/login" replace />;
  }

  if (!user?.role) {
    return <Navigate to="/login" replace />;
  }

  const normalizedUserRole = user.role.trim().toUpperCase();

  const normalizedAllowedRoles = allowedRoles.map((role) =>
    role.trim().toUpperCase()
  );

  if (
    normalizedAllowedRoles.length > 0 &&
    !normalizedAllowedRoles.includes(normalizedUserRole)
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;