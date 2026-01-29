import { Button } from "@/components/ui/button";
import React from "react";
import AppwriteStorage from "@/src/Appwrite/Storage.Services";
import { useForm } from "react-hook-form";
import AppwriteTablesDB from "../../../../Appwrite/TableDB.services.js";
import {
  APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
  APPWRITE_VEGETABLES_TABLE_ID,
} from "../../../../Utils/Appwrite/constants.js";
import toast from "react-hot-toast";

const SellVegetables = () => {
  const appwriteTablesDb = new AppwriteTablesDB();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      unit: "Kg",
    },
  });

  async function onSubmit(data) {
    // ✅ Get selected file from react-hook-form
    const imageFile = data.image?.[0];

    // ❌ Prevent submit if no image selected
    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }

    try {
      // ✅ Upload image to Appwrite Storage (bucket)
      const uploaded = await AppwriteStorage.uploadFile(
        APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID, // MUST be bucket ID
        imageFile // File object
      );

      // ✅ Get uploaded image file ID
      const imageId = uploaded.$id;

      // ✅ Prepare DB payload (store imageId, NOT file)
      const vegetableData = {
        vegetableName: data.vegetableName,
        quantity: Number(data.quantity),
        unit: data.unit,
        pricePerUnit: Number(data.pricePerUnit),
        location: data.location,
        description: data.description || "",
        status: "available",
        imageId, // ✅ correct
      };

      // ❌ Safety check: table ID must exist
      if (!APPWRITE_VEGETABLES_TABLE_ID) {
        toast.error("Vegetables table ID is missing");
        return;
      }

      // ✅ Save vegetable record in Appwrite Database
      await appwriteTablesDb.createRow(
        APPWRITE_VEGETABLES_TABLE_ID,
        vegetableData
      );

      toast.success("Vegetable listed successfully");
      reset(); // ✅ Reset form after success
    } catch (error) {
      // ✅ Log real error for debugging
      console.error("UPLOAD / DB ERROR:", error);
      toast.error(error.message || "Failed to list vegetable");
    }
  }

  return (
   <div
  className="max-w-5xl mx-auto p-8 bg-white/90 backdrop-blur
             rounded-2xl shadow-xl border border-gray-100"
>
  <h2
    className="text-4xl font-bold mb-8 text-center
               text-green-700 tracking-tight"
  >
    Sell Vegetables
  </h2>

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="grid grid-cols-1 md:grid-cols-2 gap-6"
  >
    {/* Vegetable Name */}
    <div>
      <label className="block text-sm font-medium mb-1">
        Vegetable Name *
      </label>
      <input
        {...register("vegetableName", {
          required: "Vegetable name is required",
        })}
        placeholder="e.g. Tomato"
        className="w-full rounded-xl border border-gray-300
                   px-4 py-3 text-sm
                   focus:outline-none focus:ring-2 focus:ring-green-500
                   focus:border-green-500
                   transition duration-200"
      />
      {errors.vegetableName && (
        <p className="text-red-500 text-sm mt-1">
          {errors.vegetableName.message}
        </p>
      )}
    </div>

    {/* Quantity */}
    <div>
      <label className="block text-sm font-medium mb-1">
        Quantity *
      </label>
      <input
        type="number"
        {...register("quantity", {
          required: "Quantity is required",
          min: { value: 1, message: "Must be at least 1" },
        })}
        placeholder="e.g. 50"
        className="w-full rounded-xl border border-gray-300
                   px-4 py-3 text-sm
                   focus:outline-none focus:ring-2 focus:ring-green-500
                   focus:border-green-500
                   transition duration-200"
      />
    </div>

    {/* Unit */}
    <div>
      <label className="block text-sm font-medium mb-1">
        Unit
      </label>
      <select
        {...register("unit")}
        className="w-full rounded-xl border border-gray-300
                   px-4 py-3 text-sm bg-white
                   focus:outline-none focus:ring-2 focus:ring-green-500
                   focus:border-green-500"
      >
        <option value="Kg">Kg</option>
        <option value="Quintal">Quintal</option>
        <option value="Ton">Ton</option>
      </select>
    </div>

    {/* Price */}
    <div>
      <label className="block text-sm font-medium mb-1">
        Price per Unit *
      </label>
      <input
        type="number"
        {...register("pricePerUnit", {
          required: "Price is required",
        })}
        placeholder="e.g. ₹30"
        className="w-full rounded-xl border border-gray-300
                   px-4 py-3 text-sm
                   focus:outline-none focus:ring-2 focus:ring-green-500
                   focus:border-green-500
                   transition duration-200"
      />
    </div>

    {/* Location */}
    <div>
      <label className="block text-sm font-medium mb-1">
        Location *
      </label>
      <input
        {...register("location", { required: "Location is required" })}
        placeholder="Village / Market name"
        className="w-full rounded-xl border border-gray-300
                   px-4 py-3 text-sm
                   focus:outline-none focus:ring-2 focus:ring-green-500
                   focus:border-green-500
                   transition duration-200"
      />
    </div>

    {/* Description */}
    <div>
      <label className="block text-sm font-medium mb-1">
        Description (optional)
      </label>
      <textarea
        {...register("description")}
        rows="3"
        placeholder="Any extra details..."
        className="w-full rounded-xl border border-gray-300
                   px-4 py-3 text-sm resize-none
                   focus:outline-none focus:ring-2 focus:ring-green-500
                   focus:border-green-500"
      />
    </div>

    {/* Image Upload */}
    <div className="md:col-span-2">
      <label className="block text-sm font-medium mb-2 text-center">
        Vegetable Image *
      </label>

      <div className="flex justify-center">
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          className="block w-72 text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-green-100 file:text-green-700
                     hover:file:bg-green-200 cursor-pointer"
        />
      </div>
    </div>

    {/* Submit */}
    <div className="md:col-span-2">
      <Button
        type="submit"
        className="w-full py-3 text-lg font-semibold rounded-xl
                   bg-gradient-to-r from-green-600 to-green-700
                   hover:from-green-700 hover:to-green-800
                   transition-all duration-200 shadow-md"
      >
        Sell Vegetable
      </Button>
    </div>
  </form>
</div>

  );
};

export default SellVegetables;
