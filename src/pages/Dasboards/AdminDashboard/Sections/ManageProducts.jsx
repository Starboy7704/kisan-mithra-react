import React, { useState } from "react";
import Products from "./Products";
import AddPesticide from "./AddPesticide";
import { AnimatePresence, motion } from "framer-motion";

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const ManageProducts = () => {
  const [activeCard, setActiveCard] = useState(null);

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

      {/* 📦 Animated Cards */}
      <AnimatePresence mode="wait">
        {activeCard === "seeds" && (
          <motion.div
            key="seeds"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Products />
          </motion.div>
        )}

        {activeCard === "pesticides" && (
          <motion.div
            key="pesticides"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <AddPesticide />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageProducts;
