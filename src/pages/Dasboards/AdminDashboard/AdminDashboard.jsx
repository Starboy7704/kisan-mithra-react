// AdminDashboard.jsx

import React, { useState } from "react";
import Sidebar from "./Sections/Sidebar";
import Overview from "./Sections/Overview";
import ManageUsers from "./Sections/ManageUsers";
import ManageProducts from "./Sections/ManageProducts";
import Orders from "./Sections/Orders";
import Reports from "./Sections/Reports";
import UserProfile from "../../UserProfile";
import { Menu, X } from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview />;
      case "Users":
        return <ManageUsers />;
      case "Products":
        return <ManageProducts />;
      case "Orders":
        return <Orders />;
      case "Reports":
        return <Reports />;
      case "UserProfile":
        return <UserProfile />;
      default:
        return <Overview />;
    }
  };

return (
  <div
    className="
      relative flex min-h-screen overflow-hidden
      bg-linear-to-br from-emerald-100 via-white to-emerald-50
    "
  >

    {/* Mobile Menu Button */}
    <button
      className="
        md:hidden fixed top-4 left-4 z-50 p-2
        bg-emerald-800 text-white rounded-xl shadow-xl
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
        className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30 "
        onClick={() => setSidebarOpen(false)}
      />
    )}

    {/* Main Content */}
<main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-8 lg:p-10 md:ml-68">

      {/* Header Card */}
      <div
        className="
          bg-white
          rounded-2xl
          shadow-lg
          border border-emerald-200
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
          Admin Dashboard🛠️
        </h1>

        <p className="text-emerald-700 mt-2 text-xs sm:text-sm md:text-base">
          System control, analytics & management overview
        </p>
      </div>

      {/* Content Area */}
      <div
        className="
          bg-white
          rounded-2xl sm:rounded-3xl
          border border-emerald-100
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          p-4 sm:p-6 md:p-8
          transition-all duration-300
          hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]
        "
      >
        {renderContent()}
      </div>

    </main>
  </div>
);


};

export default AdminDashboard;
