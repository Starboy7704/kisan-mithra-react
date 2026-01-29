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
        yieldPerAcre: data.yieldPerAcre ? parseFloat(data.yieldPerAcre) : null,
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
    //add seeds product
    <div className="max-w-4xl mx-auto p-6  rounded-xl shadow border  bg-gray-50">

      <h2 className="text-2xl font-semibold mb-6">Add Seed Product</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Seed Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Seed Name *</label>
          <input
            {...register("seedName", { required: "Seed name is required" })}
            placeholder="e.g. Wheat"
            className="w-full border rounded px-3 py-2"
          />
          {errors.seedName && (
            <p className="text-red-500 text-sm">{errors.seedName.message}</p>
          )}
        </div>

        {/* Species */}
        <div>
          <label className="block text-sm font-medium mb-1">Species</label>
          <input
            {...register("species")}
            placeholder="e.g. Triticum aestivum"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Crop Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Crop Type *</label>
          <select
            {...register("cropType", { required: "Crop type is required" })}
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
            {...register("plantingSeason", { required: "Season is required" })}
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
            {...register("soilType")}
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
            {...register("waterRequirement")}
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
            {...register("growthDurationDays")}
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
            {...register("yieldPerAcre")}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Seed Image (centered) */}
        <div className="md:col-span-2 flex flex-col items-center">
          <label className="text-sm font-medium mb-2">Seed Image *</label>
          <input
            type="file"
            accept="image/*"
            {...register(
              "image"
              // , { required: "Seed image is required" }
            )}
            className="border rounded px-3 py-2 w-full max-w-md"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            {isSubmitting ? "Saving..." : "Save Seed Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Products;
