import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AppwriteAccount from "../Appwrite/Account.Services";
import { Skeleton } from "@/components/ui/skeleton";

/* 🔹 Login Page Skeleton (matches login card UI exactly) */
const LoginSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-emerald-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48 rounded-md" />
            <Skeleton className="h-4 w-56 rounded-md" />
          </div>
          <Skeleton className="h-9 w-20 rounded-full" />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>

        {/* Login Button */}
        <Skeleton className="h-12 w-full rounded-xl" />

        {/* Google Login Button */}
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
};

function PublicRoute({ children }) {
  const [user, setUser] = useState(null);
  const [isCheckingUser, setIsCheckingUser] = useState(true);

  const appwriteAccount = new AppwriteAccount();

  useEffect(() => {
    async function fetchUser() {
      try {
        const appwriteUser = await appwriteAccount.getAppwriteUser();
        setUser(appwriteUser);
      } catch (error) {
        setUser(null);
      } finally {
        setIsCheckingUser(false);
      }
    }
    fetchUser();
  }, []);

  /* 🔹 Show skeleton while checking auth */
  if (isCheckingUser) {
    return <LoginSkeleton />;
  }

  /* 🔹 If logged in, redirect */
  if (user) {
    return <Navigate to="/farmer" replace />;
  }

  /* 🔹 Otherwise show public page (login/signup) */
  return children;
}

export default PublicRoute;
