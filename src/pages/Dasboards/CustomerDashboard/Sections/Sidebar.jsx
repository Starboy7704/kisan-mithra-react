import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menu = [
    { name: "Browse Products", key: "BrowseProducts" },
    { name: "Cart", key: "cart" },
    { name: "Orders", key: "Orders" },
    { name: "Payments", key: "Payments" },
    // { name: "Profile", key: "Profile" },
    { name: "Profile", key: "UserProfile" },
  ];
  return (
    <aside className=" fixed top-0 left-0 w-64 h-screen min-h-screen bg-green-700 text-white p-4">
      <h2 className="text-xl font-bold mb-6 border-b border-green-500 pb-2">Customer Menu</h2>

      <div className="space-y-2">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === item.key
                ? "bg-green-500"
                : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
