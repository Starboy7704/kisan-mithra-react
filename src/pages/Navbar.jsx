import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo2.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling down → hide
        setShowNavbar(false);
      } else {
        // scrolling up → show
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
   <header className="fixed top-0 left-0 right-0 z-50">
  <nav className="backdrop-blur-md bg-gradient-to-r from-emerald-100/80 to-green-100/1000 border-b border-emerald-200">
    <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
      
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={Logo}
          alt="Kisan Mitra Logo"
          className="h-20 w-auto object-contain"
        />
      </Link>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-8 text-[17px] font-medium text-emerald-900">
        <a href="/" className="hover:text-green-700 transition">
          Home
        </a>
        <a href="#aboutsection" className="hover:text-green-700 transition">
          About
        </a>
        <a href="#servicesSection" className="hover:text-green-700 transition">
          Services
        </a>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="
                rounded-full 
                bg-gradient-to-r from-green-600 to-emerald-600 
                px-6 
                text-white 
                shadow-lg 
                hover:from-green-700 hover:to-emerald-700
                active:scale-95
                transition-all
              "
            >
              Login
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 rounded-2xl p-2 shadow-xl border bg-white/95 backdrop-blur"
          >
            <DropdownMenuItem
              className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer hover:bg-green-50"
              onClick={() => navigate("/login")}
            >
              🌾 Farmer Login
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer hover:bg-green-50"
              onClick={() => navigate("/login")}
            >
              🛒 Customer Login
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer hover:bg-green-50"
              onClick={() => navigate("/login")}
            >
              🩺 Agri Doctor Login
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          onClick={() => navigate("/LoginSelection")}
          className="
            rounded-full 
            px-6 
            border-2 border-green-700 
            text-green-700 
            font-semibold
            hover:bg-green-700 hover:text-white 
            active:scale-95
            transition-all
          "
        >
          Register
        </Button>
      </div>
    </div>
  </nav>
</header>

  );
};

export default Navbar;
