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
import AppwriteAccount from "../Appwrite/Account.Services";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const appwriteAccount = new AppwriteAccount();
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  function handleNavigateToRegisterPage() {
    navigate("/loginSelection");
  }
  const mutation = useMutation({
    mutationFn: async ({ email, password }) => {
      // create session
      const session = await appwriteAccount.createAppwriteEmailPasswordSession(
        email,
        password
      );

      if (!session) throw new Error("Session not created");
      // fetch user
      const user = await appwriteAccount.getAppwriteUser();

      if (!user) throw new Error("User fetch failed");
      return user;
    },
    onSuccess: (user) => {
      setCurrentUser(user);

      const userRole = user?.prefs?.role;

      if (userRole === "FARMER") navigate("/farmer");
      else if (userRole === "AGRI_EXPERT") navigate("/doctor");
      else if (userRole === "CUSTOMER") navigate("/customer");
      else if (userRole === "ADMIN") navigate("/admin");
      else {
        toast.error("Role missing");
      }
      toast.success("Welcome back! You’re now logged in.", {
        icon: "👏",
      });
    },

    onError: (error) => {
      console.error("Login failed:", error);
      toast.error(error.message|| "Login failed — invalid email or password");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-400 via-white to-emerald-50 px-4">
      <Card className="relative w-full max-w-sm rounded-3xl border border-emerald-400 bg-white/100 backdrop-blur shadow-xl">
        {/* HEADER */}
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-emerald-700">
            Welcome back 👋
          </CardTitle>

          <CardDescription className="text-sm text-gray-500">
            Login to continue to{" "}
            <span className="font-medium text-emerald-600">Kisan-Mitra</span>
          </CardDescription>

          <CardAction>
            <Button
              onClick={handleNavigateToRegisterPage}
              variant="ghost"
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 rounded-full px-4"
            >
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>

        {/* CONTENT */}
        <CardContent>
          <div className="flex flex-col gap-5">
            {/* EMAIL */}
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            {/* PASSWORD */}
            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </CardContent>

        {/* FOOTER */}
        <CardFooter className="flex-col gap-3">
          {/* LOGIN BUTTON */}
          <Button
            onClick={() => mutation.mutate({ email, password })}
            disabled={mutation.isPending}
            className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition"
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </Button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 w-full">
            <span className="h-px bg-gray-200 flex-1" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LogInPage;
