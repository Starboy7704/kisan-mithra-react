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
    <div className="relative flex h-screen bg-green-50 overflow-hidden">

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-green-700 text-white rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-60 bg-white shadow-lg
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

      {/* Overlay (Mobile Only) */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto bg-white p-4 md:p-8 md:ml-60">

        <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 text-center pt-12 md:pt-0">
          Farmer Dashboard 🌾
        </h1>

        <div className="border-t border-green-200 pt-6">
          {renderContent()}
        </div>

      </main>
    </div>
  );
};

export default FarmerDashboard;