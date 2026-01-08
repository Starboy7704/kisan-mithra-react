import React, { useState } from "react";
import Browseproducts from "./Sections/Browseproducts";
import Cart from "./Sections/Cart";
import Orders from "../FarmerDashboard/Sections/Orders";
import Payments from "./Sections/Payments";
import Profile from "./Sections/Profile";
import Logout from "../../Logout";
import Sidebar from "./Sections/Sidebar";
import UserProfile from "../../UserProfile";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("Browse products");
  const renderContent = () => {
    switch (activeTab) {
      case "Browseproducts":
        return <Browseproducts/>;

      case "cart":
        return <Cart />;

      case "Orders":
        return <Orders />;

      case "Payments":
        return <Payments />;

      case "Profile":
        return <Profile />;

      case "UserProfile":
        return <UserProfile/>;

      default:
        return <Browseproducts/>
    }
  };

  return(
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 bg-white">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">Customer Dashboard🤵</h1>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            {renderContent()}
          </div>
        </main>
      </div>
  )
};

export default CustomerDashboard;
