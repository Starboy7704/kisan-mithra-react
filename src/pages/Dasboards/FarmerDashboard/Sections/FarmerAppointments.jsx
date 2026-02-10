import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import ScheduledCard from "@/src/components/ScheduledCard";
import Chat from "../../../../pages/Dasboards/DoctorDashboard/Sections/Chat";
import { Skeleton } from "@/components/ui/skeleton";
import { APPWRITE_APPOINTMENTS_TABLE_ID } from "@/src/Utils/Appwrite/constants";
import useAuthStore from "@/store/authStore";
import { Query } from "appwrite";
import { useEffect, useState } from "react";

const FarmerAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChatUserId, setActiveChatUserId] = useState(null);

  const currentUser = useAuthStore((s) => s.currentUser);
  const appwriteTablesDB = new AppwriteTablesDB();

  useEffect(() => {
    if (!currentUser) return;

    async function fetchAppointments() {
      try {
        const res = await appwriteTablesDB.listRows(
          APPWRITE_APPOINTMENTS_TABLE_ID,
          [
            Query.equal("farmerId", currentUser.$id),
            Query.equal("status", "accepted"),
          ]
        );

        setAppointments(res.rows);
      } catch (err) {
        console.error("Fetch farmer appointments failed", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [currentUser]);

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-4 text-center">📅My Appointments</h2>

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
      ) : appointments.length === 0 ? (
        <p className="text-gray-500 text-center">No accepted appointments yet.</p>
      ) : (
        appointments.map((appointment) => (
          <ScheduledCard
            key={appointment.$id}
            farmerName="You"
            issue={appointment.issue}
            appointmentDate={appointment.appointmentDate}
            imageIds={appointment.imageIds}
            onChat={() => setActiveChatUserId(appointment.doctorId)}
          />
        ))
      )}

      {/* 💬 CHAT POPUP */}
      {activeChatUserId && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg relative">
            <button
              onClick={() => setActiveChatUserId(null)}
              className="absolute top-2 right-2"
            >
              ✕
            </button>

            <Chat otherUserId={activeChatUserId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerAppointments;
