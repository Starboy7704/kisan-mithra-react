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
    <div className="relative flex h-screen bg-green-50 overflow-hidden">
      
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
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg
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
      <main className="flex-1 h-full overflow-y-auto p-4 md:p-8 bg-white md:ml-64 md:rounded-l-2xl shadow-inner">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 text-center pt-12 md:pt-0">
          Admin Dashboard 🛠️
        </h1>

        <div className="border-t border-green-200 pt-4">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
