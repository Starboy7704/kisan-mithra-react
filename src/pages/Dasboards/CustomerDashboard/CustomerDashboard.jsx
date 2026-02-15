// CustomerDashboard.jsx

import React, { useState, useEffect } from "react";
import Browseproducts from "./Sections/Browseproducts";
import Cart from "./Sections/Cart";
import Orders from "./Sections/Orders";
import Payments from "./Sections/Payments";
import Sidebar from "./Sections/Sidebar";
import UserProfile from "../../UserProfile";
import { Menu, X } from "lucide-react";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("BrowseProducts");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (paymentAmount > 0) {
      setActiveTab("Payments");
    }
  }, [paymentAmount]);

  const renderContent = () => {
    switch (activeTab) {
      case "BrowseProducts":
        return <Browseproducts />;
      case "cart":
        return <Cart setActiveTab={setActiveTab} />;
      case "Orders":
        return (
          <Orders
            setActiveTab={setActiveTab}
            setPaymentAmount={setPaymentAmount}
          />
        );
      case "Payments":
        return <Payments amount={paymentAmount} />;
      case "UserProfile":
        return <UserProfile />;
      default:
        return <Browseproducts />;
    }
  };

  return (
    <div className="relative flex h-screen bg-gray-100 overflow-hidden">
      
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-green-700 text-white rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
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

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto p-4 md:p-6 bg-white md:ml-60">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 text-center pt-12 md:pt-0">
          Customer Dashboard 🤵
        </h1>

        <div className="bg-gray-50 p-4 md:p-6 rounded-xl shadow-sm">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
