import React, { useState } from "react";
import SellVegetables from "./Sections/SellVegetables";
import BookDoctor from "./Sections/BookDoctor";
import BuyPesticides from "./Sections/BuyPesticides";
import BuySeeds from "./Sections/BuySeeds";
import Sidebar from "./Sections/Sidebar";
import Cart from "./Sections/Cart";
import Orders from "./Sections/Orders";
import UserProfile from "../../UserProfile";
import FarmerAppointments from "./Sections/FarmerAppointments";
import { Menu, X } from "lucide-react";

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState("BuySeeds");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "BuySeeds":
        return <BuySeeds />;
      case "SellVegetables":
        return <SellVegetables />;
      case "BookDoctor":
        return <BookDoctor />;
      case "BuyPesticides":
        return <BuyPesticides />;
      case "Appointments":
        return <FarmerAppointments />;
      case "Orders":
        return <Orders />;
      case "Cart":
        return <Cart />;
      case "UserProfile":
        return <UserProfile />;
      default:
        return <BuySeeds />;
    }
  };

return (
  <div
    className="
      relative flex min-h-screen overflow-hidden
      bg-gradient-to-br from-green-100 via-white to-green-50
    "
  >
    {/* Mobile Menu Button */}
    <button
      className="
        md:hidden fixed top-4 left-4 z-50
        p-2 bg-gradient-to-r from-green-600 to-emerald-600
        text-white rounded-lg shadow-xl
        active:scale-95 transition
      "
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>

    {/* Sidebar */}
    <div
      className={`
        fixed inset-y-0 left-0 z-40
        w-72 sm:w-64
        bg-white/90 backdrop-blur-lg
        border-r border-green-200
        shadow-2x
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block
      `}
    >
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSidebarOpen(false);
        }}
      />
    </div>

    {/* Overlay */}
    {sidebarOpen && (
      <div
        className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
        onClick={() => setSidebarOpen(false)}
      />
    )}

    {/* Main Content */}
    <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-8 lg:p-10">
      {/* Header */}
      <div
        className="
          bg-white/90 backdrop-blur-lg
          rounded-2xl shadow-lg
          border border-green-200
          p-4 sm:p-6
          mb-4
        "
      >
        <h1 className="  text-2xl sm:text-2xl md:text-3xl lg:text-4xl
            font-extrabold
            bg-gradient-to-r from-green-700 via-emerald-600 to-green-800
            bg-clip-text
            text-center">
          Farmer Dashboard 🌾
        </h1>
        <p className="text-center text-green-600 mt-2 text-xs sm:text-sm md:text-base">
          Manage your farming activities efficiently
        </p>
      </div>

      {/* Content Card */}
      <div
        className="
          bg-white rounded-2xl sm:rounded-3xl
          shadow-xl border border-green-100
          p-4 sm:p-6 md:p-8
          transition-all duration-300 hover:shadow-2xl
        "
      >
        {renderContent()}
      </div>
    </main>
  </div>
);


}
export default FarmerDashboard;
