import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menu = [
    { name: "Requests", key: "Requests" },
    { name: "My Appointments", key: "Appointments" },
    { name: "Profile", key: "DoctorProfile" },
    { name: "Chat", key: "Chat" },
    { name: "Video", key: "VideoConsultation" },
    { name: "Payments", key: "Payments" },
    { name: "Profile", key: "UserProfile" },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-66 min-h-screen bg-green-700 text-white p-4">
      {/* Title */}
      <h2 className="text-xl font-bold mb-6 border-b border-green-500 pb-2">
        🩺 Doctor Menu
      </h2>

      {/* Menu Buttons */}
      <div className="space-y-2">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition
              ${
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
