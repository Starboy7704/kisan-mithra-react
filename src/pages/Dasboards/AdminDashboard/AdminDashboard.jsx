import React, { useState } from "react";
import Sidebar from "./Sections/Sidebar";
import Overview from "./Sections/Overview";
import ManageUsers from "./Sections/ManageUsers";
import ManageProducts from "./Sections/ManageProducts";
import Orders from "./Sections/Orders";
import Reports from "./Sections/Reports";
import UserProfile from "../../UserProfile";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");

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
    <div className="flex h-screen bg-green-50">
  {/* ✅ Fixed Sidebar */}
  <div className="w-64 fixed top-0 left-0 h-screen">
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
  </div>

  {/* ✅ Main Content Scroll */}
  <main className="ml-64 flex-1 h-screen overflow-y-auto p-8 bg-white rounded-l-2xl shadow-inner">
    <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
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
