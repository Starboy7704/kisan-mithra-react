import Spinner from "@/components/ui/spinner";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import ScheduledCard from "@/src/components/ScheduledCard";
import Chat from "../../../../pages/Dasboards/DoctorDashboard/Sections/Chat";

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
      <h2 className="text-2xl font-bold mb-4">📅 My Appointments</h2>

      {loading ? (
        <Spinner />
      ) : appointments.length === 0 ? (
        <p className="text-gray-500">No accepted appointments yet.</p>
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
