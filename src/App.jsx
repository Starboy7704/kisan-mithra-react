import Spinner from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import HeroSection from "./pages/Herosection";
import PleaseWait from "./pleasewait";

export default function SpinnerOnly() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="flex items-center gap-3 scale-100 border border-green-400 rounded-lg px-4 py-2 bg-white/70 shadow-sm">
        <Spinner />
        <PleaseWait />
      </div>
    </div>
  ) : (
    <HeroSection />
  );
}
