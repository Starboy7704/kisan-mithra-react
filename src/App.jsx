import AppwriteAccount from "./Appwrite/Account.Services";
import { useNavigate } from "react-router";
import Herosection from "./pages/Herosection";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";

function App() {
  const appwriteAccount = new AppwriteAccount();
  const navigate = useNavigate();

  const { isPending, data } = useQuery({
    queryKey: ["authUser"],

    queryFn: async () => {
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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-linear-to-b from-green-50 to-emerald-100">
        <Spinner />
      </div>
    );
  }

  return <Herosection />;
}

export default App;
