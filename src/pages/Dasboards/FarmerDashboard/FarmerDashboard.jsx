import React, { useState } from "react";
import TransferCrops from "./Sections/TransferCrops";
import SellVegetables from "./Sections/SellVegetables";
import BookDoctor from "./Sections/BookDoctor";
import BuyPesticides from "./Sections/BuyPesticides";
import BookVehicles from "./Sections/BookVehicles";
import BuySeeds from "./Sections/BuySeeds";
import Sidebar from "./Sections/Sidebar";
import Orders from "./Sections/Orders";
import Logout from "../../Logout";

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
      case "Logout":
        return <Logout />;
      default:
        return <BuySeeds />;
    }
  };
  return (
    <div className="flex min-h-screen bg-green-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-8 bg-white rounded-l-2xl shadow-inner">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Farmer Dashboard 🌾
        </h1>

        <div className="border-t border-green-200 pt-4">{renderContent()}</div>
      </main>
    </div>
  );
};

export default FarmerDashboard;
