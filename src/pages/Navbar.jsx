import React from "react";
import Logo from "../assets/Logo.png";
import AboutSection from "./AboutSection";
import { Link, useNavigate } from "react-router-dom";
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
    <nav className="flex items-center justify-between px-6 bg-emerald-200">
      <Link to="/">
        <img
          src={Logo}
          alt="Kisan Mitra Logo"
          className="
    w-40 h-20
    object-contain
    drop-shadow-md
    transition-all duration-300 ease-in-out
    group-hover:scale-110
    group-hover:drop-shadow-lg
  "
        />
      </Link>
      <div className="flex items-center gap-6">
<a
  href="#aboutsection"
  className="px-4 py-2 text-gray-700 rounded-md
             hover:text-green-600 hover:shadow-[0_10px_rgba(34,197,94,0.6)]
             transition-all duration-300"
>
  Home
</a>


<a
  href="#aboutsection"
  className="px-4 py-2 text-gray-700 rounded-md
             hover:text-green-600 hover:shadow-[0_10px_rgba(34,197,94,0.6)]
             transition-all duration-300">
  About
</a>

<a
  href="#aboutsection"
  className="px-4 py-2 text-gray-700 rounded-md
             hover:text-white-600 hover:shadow-[0_10px_rgba(34,197,94,0.6)]
             transition-all duration-300">
  Services
</a>


        <DropdownMenu>
          <Button>
            <DropdownMenuTrigger className="cursor-pointer ">
              Login
            </DropdownMenuTrigger>
          </Button>
          <Button onClick={() => navigate("/LoginSelection")}>Register</Button>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate("/login")}>
              Farmer Login
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate("/login/doctor")}>
              Doctor Login
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate("/login/agri")}>
              Agri Doctor Login
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
