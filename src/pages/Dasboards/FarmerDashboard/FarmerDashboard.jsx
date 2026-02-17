import React, { useState } from "react";
import {
  Menu,
  X
} from "lucide-react";

import SellVegetables from "./Sections/SellVegetables";
import BookDoctor from "./Sections/BookDoctor";
import BuyPesticides from "./Sections/BuyPesticides";
import BuySeeds from "./Sections/BuySeeds";
import Sidebar from "./Sections/Sidebar";
import Cart from "./Sections/Cart";
import Orders from "./Sections/Orders";
import UserProfile from "../../UserProfile";
import FarmerAppointments from "./Sections/FarmerAppointments";
import MyActivity from "./Sections/MyListing";

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState("BuySeeds");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "BuySeeds": return <BuySeeds />;
      case "SellVegetables": return <SellVegetables />;
      case "BookDoctor": return <BookDoctor />;
      case "BuyPesticides": return <BuyPesticides />;
      case "Appointments": return <FarmerAppointments />;
      case "MyActivity": return <MyActivity key={activeTab} />;
      case "Orders": return <Orders />;
      case "Cart": return <Cart setActiveTab={setActiveTab} />;
      case "UserProfile": return <UserProfile />;
      default: return <BuySeeds />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50">

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 
                   bg-gradient-to-r from-green-600 to-emerald-600
                   text-white rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={22} />
      </button>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 overflow-y-auto p-4 sm:p-6 md:p-10">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md border border-green-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text ">
            Farmer Dashboard 🌾
          </h1>
          <p className="text-center text-green-600 mt-2 text-sm">
            Manage your farming activities efficiently
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-6">
          {renderContent()}
        </div>

      </main>
    </div>
  );
};

export default FarmerDashboard;
