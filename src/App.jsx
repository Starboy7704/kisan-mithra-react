import Spinner from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import HeroSection from "./pages/Herosection";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <div className="flex items-center gap-3 scale-200 rounded-lg">
          <Spinner/>
        </div>
      </div>
    );
  }
  return <HeroSection/>;
}

export default App;
