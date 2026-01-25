import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50">
      <nav className="backdrop-blur-md bg-linear-to-r from-emerald-100/80 to-green-100/80 border-b border-emerald-200">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={Logo}
              alt="Kisan Mitra Logo"
              className="h-12 w-auto object-contain"
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
          <div className="flex items-center gap-3">
            {/* Login Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full bg-green-700 px-6 text-white hover:bg-green-800 shadow-md">
                  Login
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-48 rounded-xl p-1 shadow-lg"
              >
                <DropdownMenuItem onClick={() => navigate("/login")}>
                  Farmer Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/login")}>
                  Customer Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/login")}>
                  Agri Doctor Login
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Register */}
            <Button
              variant="outline"
              onClick={() => navigate("/LoginSelection")}
              className="rounded-full px-6 border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
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