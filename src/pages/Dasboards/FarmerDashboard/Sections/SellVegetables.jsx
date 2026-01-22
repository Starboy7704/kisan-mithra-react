import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import AppwriteTablesDB from "../../../../Appwrite/TableDB.services.js";
import { APPWRITE_VEGETABLES_TABLE_ID } from "../../../../Utils/Appwrite/constants.js";

const SellVegetables = () => {
  const appwriteTablesDb = new AppwriteTablesDB();

  const [vegetableName, setVegetableName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Kg");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  async function handleSellVegetableSubmit(e) {
    e.preventDefault();

    const vegetableData = {
      vegetableName,
      quantity: quantity ? Number(quantity) : null,
      unit,
      pricePerUnit: pricePerUnit ? Number(pricePerUnit) : null,
      location,
      description,
      status: "available",
    };

    if (!APPWRITE_VEGETABLES_TABLE_ID) {
      const msg =
        "SELL_VEGETABLES_TABLE_ID is not set. Check your .env file.";
      console.error(msg);
      alert(msg);
      return;
    }

    console.debug(
      "Submitting vegetable to table:",
      APPWRITE_VEGETABLES_TABLE_ID,
      vegetableData
    );

    try {
      const result = await appwriteTablesDb.createRow(
        APPWRITE_VEGETABLES_TABLE_ID,
        vegetableData
      );
      console.log("Vegetable listed:", result);
      alert("Vegetable listed successfully.");

      // reset form
      setVegetableName("");
      setQuantity("");
      setUnit("Kg");
      setPricePerUnit("");
      setLocation("");  
      setDescription("");
    } catch (error) {
      console.error("Failed to list vegetable:", error);
      alert("Failed to list vegetable: " + (error.message || error));
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Sell Vegetables</h2>

      <form
        onSubmit={handleSellVegetableSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Vegetable Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Vegetable Name *
          </label>
          <input
            type="text"
            value={vegetableName}
            onChange={(e) => setVegetableName(e.target.value)}
            placeholder="e.g. Tomato"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium mb-1">Quantity *</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Unit */}
        <div>
          <label className="block text-sm font-medium mb-1">Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Kg">Kg</option>
            <option value="Quintal">Quintal</option>
            <option value="Ton">Ton</option>
          </select>
        </div>

        {/* Price per Unit */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Price per Unit *
          </label>
          <input
            type="number"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Location *</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Madhapur"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Sell Vegetable
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SellVegetables;
