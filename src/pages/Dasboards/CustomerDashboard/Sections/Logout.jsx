import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import AppwriteAccount from "@/src/Appwrite/Account.Services";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const appwriteAcoount = new AppwriteAccount();
  const navigate = useNavigate();

   async function handleUserLogout(){
    setIsLoggingOut(true)
       const result=await appwriteAcoount.logout();
       console.log("result")
       if(!result?.message){
        setIsLoggingOut(false)
            navigate("/")
       }
    }
 
  console.log("clicked Logout render and rerender");
  return (
    <div className="flex justify-center">
      <Button
        disabled={isLoggingOut ? true : false}  
        onClick={handleUserLogout}
        className={`px-6 py-2 rounded-md font-medium text-white transition ${
          isLoggingOut
            ? "bg-red-400 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 hover:cursor-pointer"
        }`}
      >
        {isLoggingOut ? <Spinner className="size-8"/> : "Log out"}
      </Button>
    </div>
  );
};

export default Logout;
