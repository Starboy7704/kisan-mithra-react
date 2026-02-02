import { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import {
  APPWRITE_PESTICIDES_TABLE_ID,
  APPWRITE_PURCHASES_TABLE_ID,
} from "@/src/Utils/Appwrite/constants";
import PesticidesCard from "@/src/components/PesticidesCard";
import PleaseWait from "@/src/pleasewait";
import Spinner from "@/components/ui/spinner";
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
        const result = await tablesDB.listRows(
          APPWRITE_PESTICIDES_TABLE_ID
        );
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
      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <div className="flex items-center gap-3 border border-green-400 rounded-lg px-4 py-2 bg-white/70 shadow-sm">
          <Spinner />
          <PleaseWait />
        </div>
      </div>
    );
  }

  return (
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
  );
};

export default BuyPesticides;
