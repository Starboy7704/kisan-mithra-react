import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router";
import AppwriteAccount from "../appwrite/Account.services";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@/store/authStore";

function LogInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const appwriteAccount = new AppwriteAccount();

    const setCurrentUser = useAuthStore((state) => state.setCurrentUser)

    function handleNavigateToRegisterPage() {
        navigate("/loginSelection");
    }
    const mutation = useMutation({
        mutationFn : async({email, password})=>{
            const session = await appwriteAccount.createAppwriteEmailPasswordSession(
                email,
                password
            );
            const user = await appwriteAccount.getAppwriteUser();
            console.log("session ->", session, "user ->", user);
            console.log(user)
            return user;
        },
        onSuccess : (user)=>{
            setCurrentUser(user);
            console.log(setCurrentUser);
            const userRole  = user?.prefs?.role || user?.role;
            if(userRole === "FARMER"){
                navigate("/farmer");
            }else if (userRole === "AGRI_EXPERT") {
                navigate("/doctor");
            } else if(userRole==="CUSTOMER"){
                navigate("/customer")
            }
            else {
                navigate("/mydashboard");
            }

        }
        
    })
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-green-50 to-emerald-100 p-6">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button onClick={handleNavigateToRegisterPage}>
                            Sign Up
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                onChange={(e) =>setEmail(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                onChange={(e) =>setPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex-col gap-2">
                    <Button
                        onClick= {()=>{
                            mutation.mutate({ email, password })
                        }}
                        disabled = {mutation.isPending}
                        className="w-full" 
                        >
                        Login
                    </Button>

                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default LogInPage;
