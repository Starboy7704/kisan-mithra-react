import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AppwriteAccount from "../Appwrite/Account.Services";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";


function PrivateRoute({ children }) {
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

  if (isCheckingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-green-50 to-emerald-100">
        <Button
          variant="outline"
          disabled
          size="sm"
          className="flex items-center gap-2"
        >
        <Spinner/>
          Please wait
        </Button>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
