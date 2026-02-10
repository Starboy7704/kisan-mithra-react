import Spinner from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import HeroSection from "./pages/Herosection";

function SpinnerOnly() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="flex items-center gap-3 scale-200 rounded-lg">
        <Spinner />
      </div>
    </div>  
  ) : (
    <HeroSection />
  );

}
export default SpinnerOnly