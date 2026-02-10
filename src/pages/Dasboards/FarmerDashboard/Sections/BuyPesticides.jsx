import { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import {
  APPWRITE_PESTICIDES_TABLE_ID,
  APPWRITE_PURCHASES_TABLE_ID,
} from "@/src/Utils/Appwrite/constants";
import PesticidesCard from "@/src/components/PesticidesCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Account } from "appwrite";
import appwriteClient from "@/src/Appwrite";
import toast from "react-hot-toast";

const BuyPesticides = () => {
  const [pesticides, setPesticides] = useState([]);
  const [loading, setLoading] = useState(true);

  const tablesDB = new AppwriteTablesDB();
  const account = new Account(appwriteClient);

  useEffect(() => {
    const fetchPesticides = async () => {
      try {
        const result = await tablesDB.listRows(APPWRITE_PESTICIDES_TABLE_ID);
        setPesticides(result.rows || []);
      } catch (error) {
        console.error("listRows error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPesticides();
  }, []);

  // 🛒 ADD TO CART
  const handleAddToCart = async (pesticide) => {
    try {
      const user = await account.get();

      const price = Number(pesticide.pricePerUnit);

      if (Number.isNaN(price)) {
        toast.error("Invalid pesticide price");
        return;
      }

      await tablesDB.createRow(APPWRITE_PURCHASES_TABLE_ID, {
        userId: user.$id,
        productId: pesticide.$id,
        productType: "pesticide",
        productName: pesticide.pesticideName,
        quantity: 1,
        unit: pesticide.unit,
        pricePerUnit: price,
        totalPrice: price,
        imageId:pesticide.imageId,
        status: "cart",
      });

      toast.success("Pesticide added to cart");
    } catch (error) {
      console.error("Add pesticide to cart failed:", error);
      toast.error("❌ Failed to add pesticide to cart");
    }
  };

  // 📦 BUY NOW
  const handleBuyNow = async (pesticide) => {
    try {
      const user = await account.get();
      const price = Number(pesticide.pricePerUnit);

      if (Number.isNaN(price)) {
        toast.error("Invalid pesticide price");
        return;
      }

      await tablesDB.createRow(APPWRITE_PURCHASES_TABLE_ID, {
        userId: user.$id,
        productId: pesticide.$id,
        productType: "pesticide",
        productName: pesticide.pesticideName,
        quantity: 1,
        unit: pesticide.unit,
        pricePerUnit: price,
        totalPrice: price,
        imageid:pesticide.imageId,
        status: "ordered",
      });

      toast.success("Pesticide order placed successfully");
    } catch (error) {
      console.error("Buy pesticide failed:", error);
      toast.error("❌ Failed to place pesticide order");
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

  return (
    <section className="flex flex-col justifygrid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pesticides.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg font-medium">No pesticides available 🌱</p>
          <p className="text-sm mt-2">Please check back later.</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pesticides.map((pesticide) => (
            <PesticidesCard
              key={pesticide.$id}
              pesticide={pesticide}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          ))}
        </section>
      )}
      ;
    </section>
  );
};

export default BuyPesticides;
