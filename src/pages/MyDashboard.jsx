import { Button } from "@/components/ui/button";
import AppwriteAccount from "../Appwrite/Account.Services"
import { useNavigate } from "react-router";
import { useState } from "react";

const MyDashboard=()=>{
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
    console.log("render and re-render")
    return(
    <div>
        <h1>Secret Page</h1>
        <Button  
        disabled={isLoggingOut ? true :false}
        variant="destructive" onClick={handleUserLogout}>
            {isLoggingOut ? " Logging out....":"Log Out"}
        </Button>
    </div>
    )
}
export default MyDashboard