import { Button } from "@/components/ui/button";
import AppwriteTablesDB from "../../../../Appwrite/TableDB.services.js";
import {
  APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
  APPWRITE_SEEDS_TABLE_ID,
} from "../../../../Utils/Appwrite/constants.js";
import React from "react";
import AppwriteStorage from "../../../../Appwrite/Storage.Services.jsx"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Products = () => {
  const TablesDB = new AppwriteTablesDB();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      soilType: "Black",
    },
  });

  async function onSubmit(data) {
    const imageFile = data.image?.[0]; // 🌱 seed image

    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const uploaded = await AppwriteStorage.uploadFile(
        APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
        imageFile
      );

      const imageId = uploaded.$id;

const newSeed = {
  seedName: data.seedName,
  species: data.species || "",
  cropType: data.cropType,
  plantingSeason: data.plantingSeason,
  soilType: data.soilType,
  waterRequirement: data.waterRequirement || "",
  growthDurationDays: data.growthDurationDays
    ? Number(data.growthDurationDays)
    : null,
  yieldPerAcre: data.yieldPerAcre
    ? parseFloat(data.yieldPerAcre)
    : null,

  pricePerUnit: Number(data.pricePerUnit), // ✅ matches schema

  imageId,
};
      console.log("Selected seed image:", imageFile);

      if (!APPWRITE_SEEDS_TABLE_ID) {
        toast.error("seeds table is missing");
        return;
      }
      await TablesDB.createRow(APPWRITE_SEEDS_TABLE_ID, newSeed);
      toast.success("Seed saved successfully");
      reset(); // 🔥 clears entire form
    } catch (error) {
      console.log(error)
      toast.error(error.message || "Failed to save seed");
    }
  }
  return (
  <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-emerald-100">
  {/* Header */}
  <div className="mb-8 text-center">
    <h2 className="text-3xl font-bold text-emerald-700">
      Add Seed Product 🌱
    </h2>
    <p className="text-sm text-gray-500 mt-1">
      Fill in the details to add a new seed to the marketplace
    </p>
  </div>

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="grid grid-cols-1 md:grid-cols-2 gap-6"
  >
    {/* Seed Name */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Seed Name <span className="text-red-500">*</span>
      </label>
      <input
        {...register("seedName", { required: "Seed name is required" })}
        placeholder="e.g. Wheat"
        className="w-full rounded-lg border border-gray-300 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      />
      {errors.seedName && (
        <p className="text-red-500 text-xs mt-1">
          {errors.seedName.message}
        </p>
      )}
    </div>

    {/* Species */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Species
      </label>
      <input
        {...register("species")}
        placeholder="e.g. Triticum aestivum"
        className="w-full rounded-lg border border-gray-300 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>

    {/* Crop Type */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Crop Type <span className="text-red-500">*</span>
      </label>
      <select
        {...register("cropType", { required: "Crop type is required" })}
        className="w-full rounded-lg border border-gray-300 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
      {errors.cropType && (
        <p className="text-red-500 text-xs mt-1">
          {errors.cropType.message}
        </p>
      )}
    </div>

    {/* Planting Season */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Planting Season <span className="text-red-500">*</span>
      </label>
      <select
        {...register("plantingSeason", { required: "Season is required" })}
        className="w-full rounded-lg border border-gray-300 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="">Select Season</option>
        <option value="Kharif">Kharif</option>
        <option value="Rabi">Rabi</option>
        <option value="Zaid">Zaid</option>
        <option value="WholeYear">Whole Year</option>
      </select>
      {errors.plantingSeason && (
        <p className="text-red-500 text-xs mt-1">
          {errors.plantingSeason.message}
        </p>
      )}
    </div>

    {/* Soil Type */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Soil Type
      </label>
      <select
        {...register("soilType")}
        className="w-full rounded-lg border border-gray-300 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Water Requirement
      </label>
      <select
        {...register("waterRequirement")}
        className="w-full rounded-lg border border-gray-300 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="">Select Water Level</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>

    {/* Growth Duration */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Growth Duration (Days)
      </label>
      <input
        type="number"
        min="1"
        max="365"
        {...register("growthDurationDays")}
        className="w-full rounded-lg border border-gray-300 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>

    {/* Yield */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Yield per Acre (Quintals)
      </label>
      <input
        type="number"
        step="0.01"
        {...register("yieldPerAcre")}
        className="w-full rounded-lg border border-gray-300 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>

    {/* Price */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Price Per Unit <span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        step="0.01"
        {...register("pricePerUnit", {
          required: "Price per unit is required",
          min: { value: 0.01, message: "Price must be greater than 0" },
        })}
        placeholder="e.g. 250"
        className="w-full rounded-lg border border-gray-300 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      {errors.pricePerUnit && (
        <p className="text-red-500 text-xs mt-1">
          {errors.pricePerUnit.message}
        </p>
      )}
    </div>

    {/* Image Upload */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">
        Seed Image <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        accept="image/*"
        {...register("image")}
        className="block ml-12 w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-lg file:border-0
                   file:bg-emerald-50 file:text-emerald-700
                   hover:file:bg-emerald-100"
      />
    </div>

    {/* Submit */}
    <div className="md:col-span-2 mt-6">
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 text-lg font-semibold rounded-xl
                   bg-emerald-600 hover:bg-emerald-700 transition"
      >
        {isSubmitting ? "Saving..." : "Save Seed Product"}
      </Button>
    </div>
  </form>
</div>

  );
};

export default Products;
