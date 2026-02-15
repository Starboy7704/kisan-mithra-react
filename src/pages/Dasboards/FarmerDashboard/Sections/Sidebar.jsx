function Sidebar({ activeTab, setActiveTab }) {
  const menu = [
    { name: "Buy Seeds", key: "BuySeeds" },
    { name: "Sell Vegetables", key: "SellVegetables" },
    { name: "Book Doctor", key: "BookDoctor" },
    { name: "Buy Pesticides", key: "BuyPesticides" },
    { name: "Orders", key: "Orders" },
    { name: "Appointments", key: "Appointments" },
    { name: "Cart", key: "Cart" },
    { name: "Profile", key: "UserProfile" },
  ];

  return (
    <aside className="h-full bg-green-700 text-white flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-6 text-center border-b border-green-500 pb-3">
        🌱 Farmer Menu
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
                  : "hover:bg-green-600 hover:translate-x-1"
              }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
