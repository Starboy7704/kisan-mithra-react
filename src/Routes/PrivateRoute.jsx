import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

function PrivateRoute({ children, allowedRoles }) {
  const currentUser = useAuthStore((s) => s.currentUser);

  console.log("CurrentUser:", currentUser);
  console.log("User Role:", currentUser?.prefs?.role);
  console.log("Allowed Roles:", allowedRoles);

  if (!currentUser) {
    console.log("Redirecting because no user");
    return <Navigate to="/login" replace />;
  }

  const userRole = currentUser?.prefs?.role;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.log("Redirecting because role mismatch");
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
