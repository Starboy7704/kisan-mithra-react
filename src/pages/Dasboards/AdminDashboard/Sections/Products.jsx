import { Button } from "@/components/ui/button";
import AppwriteTablesDB from "../../../../Appwrite/TableDB.services.js";
import { APPWRITE_SEEDS_TABLE_ID } from "../../../../Utils/Appwrite/constants.js";
import React, { useState } from "react";
import AddPesticide from "./AddPesticide.jsx";

const Products = () => {
    const TablesDB = new AppwriteTablesDB();

  const [seedName, setSeedName] = useState("");
  const [species, setSpecies] = useState("");
  const [cropType, setCropType] = useState("");
  const [plantingSeason, setPlantingSeason] = useState("");
  const [soilType, setSoilType] = useState("Black");
  const [waterRequirement, setWaterRequirement] = useState("");
  const [growthDurationDays, setGrowthDurationDays] = useState("");
  const [yieldPerAcre, setYieldPerAcre] = useState("");



  async function handleSeedsFormSubmission(e) {
    e.preventDefault();

    const newSeed = {
      seedName,
      species,
      cropType,
      plantingSeason,
      soilType,
      waterRequirement,
      growthDurationDays: growthDurationDays
      ? Number(growthDurationDays)
      : null,
      yieldPerAcre: yieldPerAcre
      ? parseFloat(yieldPerAcre)
      : null,
    };

    if (!APPWRITE_SEEDS_TABLE_ID) {
      const msg = 'APPWRITE_SEEDS_TABLE_ID is not set. Please add VITE_APPWRITE_SEEDS_TABLE_ID to your .env and restart the dev server.';
      console.error(msg);
      alert(msg);
      return;
    }

    console.debug('Submitting seed to table:', APPWRITE_SEEDS_TABLE_ID, 'payload:', newSeed);

    try {
      const result = await TablesDB.createRow(APPWRITE_SEEDS_TABLE_ID, newSeed);
      console.log("Appwrite seed product record: ",result);
      alert('Seed saved successfully.');
      // reset form
      setSeedName("");
      setSpecies("");
      setCropType("");
      setPlantingSeason("");
      setSoilType("Black");
      setWaterRequirement("");
      setGrowthDurationDays("");
      setYieldPerAcre("");
    } catch (error) {
      console.error('Failed to create seed row:', error);
      alert('Failed to save seed: ' + (error.message || error));
    }
}

  return (
    //add seeds product
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow border rounded-xl p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-6">Add Seed Product</h2>

      <form
        onSubmit={handleSeedsFormSubmission}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Seed Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Seed Name *</label>
          <input
            type="text"
            value={seedName}
            onChange={(e) => setSeedName(e.target.value)}
            placeholder="e.g. Wheat"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Species */}
        <div>
          <label className="block text-sm font-medium mb-1">Species</label>
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            placeholder="e.g. Triticum aestivum"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Crop Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Crop Type *</label>
          <select
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Crop Type</option>
            <option value="Cereal">Cereal</option>
            <option value="Pulse">Pulse</option>
            <option value="Oilseed">Oilseed</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Fiber">Fiber</option>
            <option value="Spice">Spice</option>
          </select>
        </div>

        {/* Planting Season */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Planting Season *
          </label>
          <select
            value={plantingSeason}
            onChange={(e) => setPlantingSeason(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Season</option>
            <option value="Kharif">Kharif</option>
            <option value="Rabi">Rabi</option>
            <option value="Zaid">Zaid</option>
            <option value="WholeYear">Whole Year</option>
          </select>
        </div>

        {/* Soil Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Soil Type</label>
          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Black">Black</option>
            <option value="Red">Red</option>
            <option value="Sandy">Sandy</option>
            <option value="Loamy">Loamy</option>
            <option value="Clay">Clay</option>
            <option value="Alluvial">Alluvial</option>
          </select>
        </div>

        {/* Water Requirement */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Water Requirement
          </label>
          <select
            value={waterRequirement}
            onChange={(e) => setWaterRequirement(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Water Level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Growth Duration */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Growth Duration (Days)
          </label>
          <input
            type="number"
            min="1"
            max="365"
            value={growthDurationDays}
            onChange={(e) => setGrowthDurationDays(e.target.value)}
            placeholder="e.g. 120"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Yield */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Yield per Acre (Quintals)
          </label>
          <input
            type="number"
            step="0.01"
            value={yieldPerAcre}
            onChange={(e) => setYieldPerAcre(e.target.value)}
            placeholder="e.g. 20"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            Save Seed Product
          </Button>
        </div>
      </form><br/>
    </div>
  );
};

export default Products;
