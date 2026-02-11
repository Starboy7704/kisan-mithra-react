import { useState,useEffect } from "react";
import LoginSelection from "../pages/LoginSelection";
import { Navigate } from "react-router";
function PublicRoute({ children }) {
  const [user, setUser] = useState(null);
  const [isCheckingUser, setIsCheckingUser] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const appwriteAccount = new AppwriteAccount();
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
    return <LoginSelection/>;
  }
  /* 🔹 If logged in, redirect */
  if (user) {
    return <Navigate to="/farmer" replace />;
  }
  /* 🔹 Otherwise show public page (login/signup) */
  return children;
}

export default PublicRoute;
