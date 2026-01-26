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
    <aside className="fixed top-0 left-0 w-64 h-screen bg-green-700 text-white flex flex-col p-8 rounded-r-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center border-b border-green-500 pb-2">
        🌱 Admin Menu
      </h2>

      {menu.map((item) => (
        <button
          key={item.key}
          onClick={() => setActiveTab(item.key)}
          className={`text-left px-4 py-2 mb-2 rounded-lg transition-all 
          ${
            activeTab === item.key
              ? "bg-green-500"
              : "hover:bg-green-600 hover:translate-x-1"
          }`}
        >
          {item.name}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
