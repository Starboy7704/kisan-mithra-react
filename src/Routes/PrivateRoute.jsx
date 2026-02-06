import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

function PrivateRoute({ children, allowedRoles }) {
  const currentUser = useAuthStore((s) => s.currentUser);
  // const isCheckingUser = useAuthStore((s) => s.isCheckingUser);

  // if (isCheckingUser) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <Button variant="outline" disabled>
  //         <Spinner className="mr-2" />
  //         Please wait
  //       </Button>
  //     </div>
  //   );
  // }

  // ❌ Not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Logged in but wrong role
  const userRole = currentUser?.prefs?.role || currentUser?.role;
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized
  return children;
}

export default PrivateRoute;
