function Sidebar({ activeTab, setActiveTab }) {
  const menu = [
    { name: "Buy Seeds", key: "BuySeeds" },
    { name: "Transfer Crops", key: "TransferCrops" },
    { name: "Sell Vegetables", key: "SellVegetables" },
    { name: "Book Doctor", key: "BookDoctor" },
    { name: "Buy Pesticides", key: "BuyPesticides" },
    { name: "Orders", key: "Orders" },
    { name: "Book Vehicles", key: "BookVehicles" },
    {name:"Profile",key:"UserProfile"}
  ];

  return (
    <aside className="w-65 h-screen bg-green-700 text-white flex flex-col p-8 rounded-r-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center border-b border-green-500 pb-2">
        🌱Farmer Menu
      </h2>
      {menu.map((item) => (
        <button
          key={item.key}
          onClick={() => setActiveTab(item.key)}
          className={`text-left px-4 py-2 mb-2 rounded-lg transition-all 
            ${ activeTab === item.key ? "bg-green-500" : "hover:bg-green-600 hover:translate-x-1"}`}
        >
          {item.name}
        </button>
      ))}
    </aside>
  );
}
export default Sidebar;
