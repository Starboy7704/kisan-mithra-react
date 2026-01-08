import AppwriteAccount from "./Appwrite/Account.Services";
import { useNavigate } from "react-router";
import Herosection from "./pages/Herosection";
// import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner";

function App() {
  const appwriteAccount = new AppwriteAccount();
  const navigate = useNavigate();


  //Tanstack
  const { isPending, data } = useQuery({
    queryKey: ["authUser"],
    //query function
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const user = await appwriteAccount.getAppwriteUser();
      return user ?? null;
    },

    onSuccess: (user) => {
      if (!user) {
        console.log("user session not found! at home route");
        navigate("/login");
      }
    },
  });

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-green-50 to-emerald-100">
  <Spinner className="size-10 text-emerald-600 animate-spin" />
</div>

    );
  }

  return <Herosection />;
}

export default App;
