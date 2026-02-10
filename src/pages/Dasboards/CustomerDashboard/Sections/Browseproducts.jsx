import { useEffect, useState } from "react";
import AppwriteTablesDB from "../../../../Appwrite/TableDB.services.js";
import {
  APPWRITE_VEGETABLES_TABLE_ID,
  APPWRITE_PURCHASES_TABLE_ID,
} from "../../../../Utils/Appwrite/constants.js";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import VegetableCard from "@/src/components/VegetableCard";
import { Account } from "appwrite";
import appwriteClient from "@/src/Appwrite";
import toast from "react-hot-toast";

const Browseproducts = () => {
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ create once
  const tablesDB = new AppwriteTablesDB();
  const account = new Account(appwriteClient);

  useEffect(() => {
    const fetchVegetables = async () => {
      try {
        const result = await tablesDB.listRows(
          APPWRITE_VEGETABLES_TABLE_ID
        );
        setVegetables(result.rows || []);
      } catch (error) {
        console.error("Failed to fetch vegetables", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVegetables();
  }, []);

  // 🛒 ADD TO CART
  const handleAddToCart = async (veg) => {
    try {
      const user = await account.get();
      const price = Number(veg.pricePerUnit);
      await tablesDB.createRow(APPWRITE_PURCHASES_TABLE_ID, {
        userId: user.$id,
        productId: veg.$id,
        productType: "vegetable",
        productName: veg.name || veg.vegetableName,
        quantity: 1,
        unit: veg.unit || "kg",
        pricePerUnit: price,
        totalPrice: price,
        status: "cart",
        imageId:veg.imageId
      });
      toast.success("Added Vegetable to Cart");
    } catch (error) {
      console.error("Add vegetable to cart failed:", error);
      toast.error("❌ Failed to add vegetable to cart");
    }
  };

  // 📦 BUY NOW
  const handleBuyNow = async (veg) => {
    try {
      const user = await account.get();
      const price = Number(veg.pricePerUnit);

      if (Number.isNaN(price)) {
        toast.error("❌ Invalid vegetable price");
        return;
      }
      await tablesDB.createRow(APPWRITE_PURCHASES_TABLE_ID, {
        userId: user.$id,
        productId: veg.$id,
        productType: "vegetable",
        productName: veg.name || veg.vegetableName,
        quantity: 1,
        unit: veg.unit || "kg",
        pricePerUnit: price,
        totalPrice: price,
        imageId:veg.imageId,
        status: "ordered",
      });
      toast.success("📦 Vegetable order placed successfully");
    } catch (error) {
      console.error("Buy vegetable failed:", error);
      toast.error("❌ Failed to place vegetable order");
    }
  };

  if (loading) {
    return (
 <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border bg-white p-4 shadow-sm space-y-4"
        >
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />

          <div className="flex gap-3 pt-2">
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </div>
      ))}
    </section>
    );
  }

  if (vegetables.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No vegetables available right now.
      </p>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {vegetables.map((veg) => (
        <VegetableCard
          key={veg.$id}
          vegetable={veg}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      ))}
    </section>
  );
};

export default Browseproducts;
