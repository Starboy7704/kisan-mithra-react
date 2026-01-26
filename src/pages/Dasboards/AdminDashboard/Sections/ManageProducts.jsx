import React, { useState } from "react";
import Products from "./Products";
import AddPesticide from "./AddPesticide";  

const ManageProducts = () => {
  const [activeCard, setActiveCard] = useState(null); // 👈 nothing shown initially

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow">
      {/* 🔘 Buttons */}
      <div className="flex justify-center gap-6 mb-8">
        <button
          onClick={() => setActiveCard("seeds")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          🌱 Seeds
        </button>

        <button
          onClick={() => setActiveCard("pesticides")}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
        >
          🧪 Pesticides
        </button>
      </div>

      {/* 📦 Cards (ONLY after click) */}
      {activeCard === "seeds" && <Products/>}
      {activeCard === "pesticides" && <AddPesticide/>}
    </div>
  );
};

export default ManageProducts;
