import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo2.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const [showNavbar, setShowNavbar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  // 🔥 Hide Navbar on Scroll Down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll + close mobile
  const handleNavClick = (href) => {
    setMobileMenuOpen(false);

    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="backdrop-blur-md bg-linear-to-r from-emerald-100/80 to-green-100 border-b border-emerald-200">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              alt="Kisan Mitra Logo"
              className="h-12 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-[17px] font-medium text-emerald-900">
            <a
              href="/"
              className="hover:text-green-700 transition"
              onClick={() => handleNavClick("/")}
            >
              Home
            </a>
            <a
              href="#aboutsection"
              className="hover:text-green-700 transition"
              onClick={() => handleNavClick("#aboutsection")}
            >
              About
            </a>
            <a
              href="#servicesSection"
              className="hover:text-green-700 transition"
              onClick={() => handleNavClick("#servicesSection")}
            >
              Services
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="
                    rounded-full 
                    bg-linear-to-r from-green-600 to-emerald-600 
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
                className="w-56 rounded-2xl p-2 shadow-xl border bg-white"
              >
                <DropdownMenuItem
                  className="rounded-lg px-3 py-2 cursor-pointer hover:bg-green-50"
                  onClick={() => navigate("/login")}
                >
                  🌾 Farmer Login
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="rounded-lg px-3 py-2 cursor-pointer hover:bg-green-50"
                  onClick={() => navigate("/login")}
                >
                  🛒 Customer Login
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="rounded-lg px-3 py-2 cursor-pointer hover:bg-green-50"
                  onClick={() => navigate("/admin-login")}
                >
                  🛠 Admin Login
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-emerald-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-emerald-200 px-6 py-4 space-y-4 text-emerald-900 font-medium">
            <a
              href="/"
              onClick={() => handleNavClick("/")}
              className="block hover:text-green-700 transition"
            >
              Home
            </a>
            <a
              href="#aboutsection"
              onClick={() => handleNavClick("#aboutsection")}
              className="block hover:text-green-700 transition"
            >
              About
            </a>
            <a
              href="#servicesSection"
              onClick={() => handleNavClick("#servicesSection")}
              className="block hover:text-green-700 transition"
            >
              Services
            </a>

            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/login");
              }}
              className="w-full rounded-full bg-green-600 hover:bg-green-700 text-white"
            >
              Login
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
