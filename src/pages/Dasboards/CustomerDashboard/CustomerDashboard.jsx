import React, { useState } from "react";
import Browseproducts from "./Sections/Browseproducts";
import Cart from "./Sections/Cart";
import Orders from "../FarmerDashboard/Sections/Orders";
import Payments from "./Sections/Payments";
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

      // case "Profile":
      //   return <Profile />;

      case "UserProfile":
        return <UserProfile/>;

      default:
        return <Browseproducts/>
    }
  };

  return(
     <div className="flex bg-gray-100">

  <div className="w-100 h-screen fixed top-0 left-0">
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
  </div>

  <main className="ml-66 flex-1 h-screen overflow-y-auto p-6 bg-white">
    <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">
      Customer Dashboard🤵
    </h1>

    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      {renderContent()}
    </div>
  </main>
</div>

  )
};

export default CustomerDashboard;
