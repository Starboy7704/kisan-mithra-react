import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import RequestCard from "@/src/components/RequestCard";
import { APPWRITE_APPOINTMENTS_TABLE_ID } from "@/src/Utils/Appwrite/constants";
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";
import { Query } from "appwrite";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

const AppointmentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const appwriteTablesDB = new AppwriteTablesDB();

  const currentUser = useAuthStore((state) => state.currentUser);

  const updateAppointmentStatus = async (rowId, status) => {
    try {
      await appwriteTablesDB.updateRow(APPWRITE_APPOINTMENTS_TABLE_ID, rowId, {
        status,
      });
      setRequests((prev) => prev.filter((req) => req.$id !== rowId));

      toast.success(
        status === "accepted"
          ? "Appointment accepted ✅"
          : "Appointment rejected ❌",
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    const fetchRequests = async () => {
      try {
        const result = await appwriteTablesDB.listRows(
          APPWRITE_APPOINTMENTS_TABLE_ID,
          [
            Query.equal("doctorId", currentUser.$id),
            Query.equal("status", "pending"),
          ],
        );

        setRequests(result.rows);
      } catch (error) {
        console.error("listRows error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">📋 Appointment Requests</h2>

      <p className="text-gray-600 mb-4 text-center">
        Farmers appointment requests will appear here.
      </p>

      {loading ? (
         <div className="p-6 space-y-6">
      {/* Page Title */}
      <Skeleton className="h-8 w-48 mx-auto mb-6" />

      {/* Order Cards */}
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border shadow-sm p-6 space-y-4"
        >
          {/* Order Header */}
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Product Card */}
          <div className="border rounded-lg p-4 flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>

            <div className="space-y-2 text-right">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        </div>
      ))}
    </div>
      ) : requests.length === 0 ? (
        <p className="text-gray-500 text-center">No Requests yet.</p>
      ) : (
        <>
          {requests.map((request) => (
            <RequestCard
              key={request.$id}
              farmerId={request.farmerId}
              farmerName={request.farmerName}
              issue={request.issue}
              imageIds={request.imageIds}
              onAccept={() => updateAppointmentStatus(request.$id, "accepted")}
              onReject={() => updateAppointmentStatus(request.$id, "rejected")}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default AppointmentRequests;
