import React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import AppwriteTablesDB from "../../../../Appwrite/TableDB.services.js";
import AppwriteStorage from "../../../../Appwrite/Storage.Services.jsx"
import toast from "react-hot-toast"
import { APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID ,APPWRITE_PESTICIDES_TABLE_ID} from "@/src/Utils/Appwrite/constants.js";
const AddPesticide = () => {
  const TablesDB = new AppwriteTablesDB();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      unit: "ml"
    }
  });

  async function onSubmit(data) {
    const imageFile = data.image?.[0]; // 📸 uploaded image

     if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }

    try{
      const uploaded=await AppwriteStorage.uploadFile(APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,imageFile);
      const imageId=uploaded.$id;
    
    const newPesticide = {
      pesticideName: data.pesticideName,
      category: data.category,
      brand: data.brand,
      cropType: data.cropType,
      quantity: Number(data.quantity),
      unit: data.unit,
      pricePerUnit: Number(data.pricePerUnit),
      usageInstructions: data.usageInstructions || "",
      safetyPrecautions: data.safetyPrecautions || "",
      manufacturer: data.manufacturer || "",
      status: "available",
      createdBy: "admin",
      imageId,
      // image will be uploaded to storage separately
    };

    console.log("Selected image:", imageFile);

    if (!APPWRITE_PESTICIDES_TABLE_ID) {
    toast.error("APPWRITE_PESTICIDES_TABLE_ID is not set.");
      return;
    }

      await TablesDB.createRow(
        APPWRITE_PESTICIDES_TABLE_ID,
        newPesticide
      );
      toast.success("Pesticide saved successfully.");
      reset(); // 🔥 resets entire form including file input
    } catch (error) {
      console.error("Failed to create pesticide row:", error);
      toast.error("Failed to save pesticide");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-xl shadow border bg-gray-10">
      <h2 className="text-2xl font-semibold mb-6">Add Pesticide Product</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Pesticide Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Pesticide Name *
          </label>
          <input
            {...register("pesticideName", { required: "Required" })}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Corigen"
          />
          {errors.pesticideName && (
            <p className="text-red-500 text-sm">{errors.pesticideName.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <input
            {...register("category", { required: "Required" })}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Insecticide"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium mb-1">Brand</label>
          <input
            {...register("brand")}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. FMC"
          />
        </div>

        {/* Crop Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Crop Type</label>
          <input
            {...register("cropType")}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Cotton"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium mb-1">Quantity *</label>
          <input
            type="number"
            {...register("quantity", {
              required: "Required",
              min: { value: 1, message: "Must be positive" }
            })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Unit */}
        <div>
          <label className="block text-sm font-medium mb-1">Unit *</label>
          <select
            {...register("unit")}
            className="w-full border rounded px-3 py-2"
          >
            <option value="ml">ml</option>
            <option value="litre">litre</option>
            <option value="kg">kg</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Price Per Unit *
          </label>
          <input
            type="number"
            {...register("pricePerUnit", { required: "Required" })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Manufacturer */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Manufacturer
          </label>
          <input
            {...register("manufacturer")}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Usage Instructions */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Usage Instructions
          </label>
          <textarea
            {...register("usageInstructions")}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Safety Precautions */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Safety Precautions
          </label>
          <textarea
            {...register("safetyPrecautions")}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Image Upload (centered) */}
        <div className="md:col-span-2 flex flex-col items-center">
          <label className="text-sm font-medium mb-2">
            Pesticide Image *
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image"
              // , { required: "Image is required" }
            )}
            className="border rounded px-3 py-2 w-full max-w-md"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">
              {errors.image.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg"
          >
            {isSubmitting ? "Saving..." : "Save Pesticide Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPesticide;
