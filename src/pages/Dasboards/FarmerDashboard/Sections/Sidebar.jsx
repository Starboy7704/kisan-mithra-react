import { X } from "lucide-react";

function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const menu = [
    { name: "Buy Seeds", key: "BuySeeds" },
    { name: "Sell Vegetables", key: "SellVegetables" },
    { name: "Book Doctor", key: "BookDoctor" },
    { name: "Buy Pesticides", key: "BuyPesticides" },
    { name: "Appointments", key: "Appointments" },
    { name: "My Activity", key: "MyActivity" },
    { name: "Cart", key: "Cart" },
    { name: "Orders", key: "Orders" },
    { name: "Profile", key: "UserProfile" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0
          h-screen w-80
          bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-800
          text-white
          flex flex-col
          px-6 py-8
          overflow-y-auto
          transition-transform duration-300
          z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-between items-center mb-10 md:hidden">
          <h2 className="text-lg font-semibold text-emerald-200">
            🌾 FARMER PANEL
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Desktop Title */}
        <h2 className="hidden md:block text-xl font-semibold tracking-widest text-center mb-12 text-emerald-200">
          🌾 FARMER PANEL
        </h2>

        {/* Menu */}
        <div className="flex flex-col gap-3">
          {menu.map((item) => {
            const isActive = activeTab === item.key;

            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  setIsOpen(false); // auto close mobile
                }}
                className={`
                  group relative px-5 py-3
                  text-left rounded-xl text-sm
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#d4af37]/20 to-[#f5d76e]/10 text-[#f5d76e] border border-[#d4af37]/40"
                      : "text-emerald-200/80 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {item.name}

                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#d4af37] rounded-r-md" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-10 text-xs text-emerald-300/40 tracking-widest text-center">
          KISAN MITRA • PREMIUM
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
