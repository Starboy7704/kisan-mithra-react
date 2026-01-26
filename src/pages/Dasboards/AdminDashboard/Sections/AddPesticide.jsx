import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AppwriteTablesDB from "../../../../Appwrite/TableDB.services.js";

const APPWRITE_PESTICIDES_TABLE_ID =import.meta.env.VITE_APPWRITE_PESTICIDES_TABLE_ID;

const AddPesticide = () => {
  const TablesDB = new AppwriteTablesDB();

  const [pesticideName, setPesticideName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [cropType, setCropType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("ml");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [usageInstructions, setUsageInstructions] = useState("");
  const [safetyPrecautions, setSafetyPrecautions] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePesticideFormSubmission(e) {
    e.preventDefault();
    setLoading(true);

    const newPesticide = {
      pesticideName,
      category,
      brand,
      cropType,
      quantity: quantity ? Number(quantity) : null,
      unit,
      pricePerUnit: pricePerUnit ? Number(pricePerUnit) : null,
      usageInstructions,
      safetyPrecautions,
      manufacturer,
      status: "available", 
      createdBy: "admin",
    };

    if (!APPWRITE_PESTICIDES_TABLE_ID) {
      alert(
        "APPWRITE_PESTICIDES_TABLE_ID is not set. Please add VITE_APPWRITE_PESTICIDES_TABLE_ID to your .env and restart the dev server."
      );
      setLoading(false);
      return;
    }

    try {
      const result = await TablesDB.createRow(
        APPWRITE_PESTICIDES_TABLE_ID,
        newPesticide
      );
      console.log("Appwrite pesticide product record:", result);
      alert("Pesticide saved successfully.");

      setPesticideName("");
      setCategory("");
      setBrand("");
      setCropType("");
      setQuantity("");
      setUnit("ml");
      setPricePerUnit("");
      setUsageInstructions("");
      setSafetyPrecautions("");
      setManufacturer("");
    } catch (error) {
      console.error("Failed to create pesticide row:", error);
      alert("Failed to save pesticide: " + (error.message || error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-xl shadow border bg-gray-10">
      <h2 className="text-2xl font-semibold mb-6">Add Pesticide Product</h2>

      <form
        onSubmit={handlePesticideFormSubmission}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Pesticide Name *
          </label>
          <input
            value={pesticideName}
            onChange={(e) => setPesticideName(e.target.value)}
            placeholder="e.g. Corigen"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Insecticide"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Brand</label>
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="e.g. FMC"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Crop Type</label>
          <input
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            placeholder="e.g. Cotton"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quantity *</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 250"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Unit *</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="ml">ml</option>
            <option value="litre">litre</option>
            <option value="kg">kg</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Price Per Unit *
          </label>
          <input
            type="number"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            placeholder="e.g. 1450"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Manufacturer</label>
          <input
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            placeholder="e.g. FMC India"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Usage Instructions
          </label>
          <textarea
            value={usageInstructions}
            onChange={(e) => setUsageInstructions(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Safety Precautions
          </label>
          <textarea
            value={safetyPrecautions}
            onChange={(e) => setSafetyPrecautions(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="md:col-span-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg"
          >
            {loading ? "Saving..." : "Save Pesticide Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPesticide;
