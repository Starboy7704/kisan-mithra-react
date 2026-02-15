// Sidebar.jsx

import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menu = [
    { name: "Overview", key: "Overview" },
    { name: "Users", key: "Users" },
    { name: "Products", key: "Products" },
    { name: "Orders", key: "Orders" },
    { name: "Reports", key: "Reports" },
    { name: "Profile", key: "UserProfile" },
  ];

  return (
    <aside className="h-full w-full bg-green-700 text-white flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-6 text-center border-b border-green-500 pb-3">
        🌱 Admin Menu
      </h2>

      <div className="flex flex-col gap-2">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`text-left px-4 py-2 rounded-lg transition-all duration-200
              ${
                activeTab === item.key
                  ? "bg-green-500 shadow-md"
                  : "hover:bg-green-600"
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
