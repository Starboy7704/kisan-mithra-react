// Sidebar.jsx

import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menu = [
    { name: "Requests", key: "Requests" },
    { name: "My Appointments", key: "Appointments" },
    { name: "Video", key: "VideoConsultation" },
    { name: "Payments", key: "Payments" },
    { name: "Profile", key: "UserProfile" },
  ];

  return (
    <aside className="h-full w-full bg-green-700 text-white flex flex-col p-6">
      
      <h2 className="text-xl font-bold mb-6 border-b border-green-500 pb-3 text-center">
        🩺 Doctor Menu
      </h2>

      <div className="flex flex-col gap-2">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                activeTab === item.key
                  ? "bg-green-500 shadow-md"
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
