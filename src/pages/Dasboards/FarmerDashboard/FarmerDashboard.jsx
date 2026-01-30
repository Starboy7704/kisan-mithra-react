import React, { useState } from "react";
import TransferCrops from "./Sections/TransferCrops";
import SellVegetables from "./Sections/SellVegetables";
import BookDoctor from "./Sections/BookDoctor";
import BuyPesticides from "./Sections/BuyPesticides";
import BookVehicles from "./Sections/BookVehicles";
import BuySeeds from "./Sections/BuySeeds";
import Sidebar from "./Sections/Sidebar";
import Orders from "./Sections/Orders";
import UserProfile from "../../UserProfile";

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState("BuySeeds");

  const renderContent = () => {
    switch (activeTab) {
      case "BuySeeds":
        return <BuySeeds/>;
      case "TransferCrops":
        return <TransferCrops />;
      case "SellVegetables":
        return <SellVegetables />;
      case "BookDoctor":
        return <BookDoctor />;
      case "BuyPesticides":
        return <BuyPesticides />;
      case "BookVehicles":
        return <BookVehicles />;
      case "Orders":
        return <Orders />;
         case "Cart":
        return <Cart/>
      case "UserProfile":
        return <UserProfile/>;
      default:
        return <BuySeeds />;
    }
  };
  return (
  <div className="flex h-screen bg-green-50">
  {/* ✅ Fixed Sidebar */}
  <div className="w-60 fixed top-0 left-0 h-screen">
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
  </div>

  {/* ✅ Main Content */}
  <main className="ml-60 flex-1 h-screen overflow-y-auto p-8 bg-white rounded-l-2xl shadow-inner">
    <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
      Farmer Dashboard 🌾
    </h1>

    <div className="border-t border-green-200 pt-4">
      {renderContent()}
    </div>
  </main>2
</div>

  );
};

export default FarmerDashboard;
