import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menu = [
    { name: "Browse Products", key: "BrowseProducts" },
    { name: "Cart", key: "cart" },
    { name: "Orders", key: "Orders" },
    { name: "Payments", key: "Payments" },
    { name: "Profile", key: "UserProfile" },
  ];

  return (
    <aside
      className="
        h-full w-70
        bg-linear-to-b from-emerald-900 via-emerald-800 to-emerald-700
        text-white
        px-6 py-8
        flex flex-col
        shadow-xl
      "
    >
      {/* Header */}
      <h2
        className="
          text-xl font-semibold
          mb-8
          text-center
          tracking-wide
          border-b border-emerald-600
          pb-4
        "
      >
        Customer Panel🤵
      </h2>

      {/* Menu */}
      <div className="flex flex-col gap-2">
        {menu.map((item) => {
          const isActive = activeTab === item.key;

          return (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`
                relative w-full text-left
                px-4 py-3
                rounded-lg
                text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? `
                      bg-white
                      text-emerald-900
                      shadow-md
                    `
                    : `
                      text-emerald-100
                      hover:bg-emerald-700
                      hover:text-white
                    `
                }
              `}
            >
              {item.name}

              {/* Active Left Bar */}
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-emerald-500 rounded-r-md" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div
        className="
          mt-auto pt-8
          text-xs text-emerald-200/60
          text-center
          border-t border-emerald-600
        "
      >
        KISAN MITRA • PREMIUM
      </div>
    </aside>
  );
};

export default Sidebar;
