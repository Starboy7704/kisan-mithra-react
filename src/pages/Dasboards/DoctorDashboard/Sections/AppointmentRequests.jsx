import Spinner from "@/components/ui/spinner";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import RequestCard from "@/src/components/RequestCard";
import { APPWRITE_APPOINTMENTS_TABLE_ID } from "@/src/Utils/Appwrite/constants";
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";
import { Query } from "appwrite";
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
      <h2 className="text-2xl font-bold mb-4">📋 Appointment Requests</h2>

      <p className="text-gray-600 mb-4">
        Farmers appointment requests will appear here.
      </p>

      {loading ? (
        <div className="min-h-75 flex items-center justify-center">
          <Spinner className="size-10 text-emerald-600 animate-spin" />
        </div>
      ) : requests.length === 0 ? (
        <p className="text-gray-500">No Requests yet.</p>
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
