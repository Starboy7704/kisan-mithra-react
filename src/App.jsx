import { useEffect, useState } from "react";
import AppwriteAccount from "./Appwrite/Account.Services";
import { useNavigate, Link } from "react-router";
import Herosection from "./pages/Herosection";
import { Spinner } from "@/components/ui/spinner";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const appwriteAccount = new AppwriteAccount();
  const navigate = useNavigate();

  async function checkUserSession() {
    const user = await appwriteAccount.getAppwriteUser();
    if (!user) {
      console.log("user session not found! at home route");
      navigate("/login");
    }
    return true;
  }

  useEffect(() => {
    // ComponentWillUnmount()
    console.log("loading...");
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []); //empty dependency
  //ComponentDidUpdate()
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-linear-to-b from-green-50 to-emerald-100">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <Herosection />
    </>
  );
}
export default App;
