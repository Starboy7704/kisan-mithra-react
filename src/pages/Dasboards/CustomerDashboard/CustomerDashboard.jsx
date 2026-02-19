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
  <div
    className="
      relative flex min-h-screen overflow-hidden
      bg-linear-to-br from-green-100 via-white to-green-50
    "
  >

    {/* Mobile Menu Button */}
    <button
      className="
        md:hidden fixed top-4 left-4 z-50 p-2
        bg-green-700 text-white rounded-xl shadow-xl
        hover:scale-105 active:scale-95 transition
      "
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
    </button>

    {/* Sidebar */}
  <div
  className={`
    fixed inset-y-0 left-0 z-40
    w-72 sm:w-64
    bg-white border-r border-emerald-200
    shadow-xl
    transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
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
<main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-8 lg:p-10 md:ml-64">

      {/* Header Card */}
      <div
        className="
          bg-white/90 backdrop-blur-lg
          rounded-2xl
          shadow-lg
          border border-green-200
          p-4 sm:p-6
          mb-6 sm:mb-8
          text-center
        "
      >
        <h1
          className="
            text-2xl sm:text-2xl md:text-3xl lg:text-4xl
            font-extrabold
            bg-linear-to-r from-green-700 via-emerald-600 to-green-800
            bg-clip-text
          "
        >
          Customer Dashboard 🤵
        </h1>

        <p className="text-green-600 mt-2 text-xs sm:text-sm md:text-base">
          Explore products, manage orders & payments smoothly
        </p>
      </div>

      {/* Content Container */}
      <div
        className="
          bg-white
          p-4 sm:p-6 md:p-8
          rounded-2xl sm:rounded-3xl
          border border-green-100
          shadow-[0_15px_40px_rgba(0,0,0,0.08)]
          transition-all duration-300
          hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
        "
      >
        {renderContent()}
      </div>

    </main>
  </div>
);

};

export default CustomerDashboard;
