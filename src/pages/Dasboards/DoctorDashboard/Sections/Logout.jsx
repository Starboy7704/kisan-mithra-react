import { Button } from "@/components/ui/button";
import AppwriteAccount from "@/src/Appwrite/Account.Services";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const Logout=()=>{
const[isLoggingOut,setIsLoggingOut]=useState(false)

    const appwriteAcoount=new AppwriteAccount();
    const navigate=useNavigate();

   async function handleUserLogout(){
    setIsLoggingOut(true)
       const result=await appwriteAcoount.logout();
       console.log("result")
       if(!result?.message){
        setIsLoggingOut(false)
            navigate("/")
       }
    }
    console.log("Logout clicked rende and rerender")
    return(
    <div>
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
    )
}
export default Logout;
