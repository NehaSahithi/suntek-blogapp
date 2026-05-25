import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../store/authStore";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const location = useLocation();
  const currentUser = useAuth((state) => state.currentUser);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles.length > 0) {
    const role = currentUser.role || currentUser.userRole || currentUser.type;
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
}