import React, { useEffect, useState } from "react";
import DoctorCard from "@/src/components/DoctorCard";
import AppointmentCard from "@/src/components/seeds/AppointmentCard.jsx";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import { APPWRITE_USERPROFILES_TABLE_ID } from "@/src/Utils/Appwrite/constants";
import { Query } from "appwrite";
import Spinner from "@/components/ui/spinner";
import PleaseWait from "@/src/pleasewait";

import { AnimatePresence, motion } from "framer-motion";

const BookDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [loading, setLoading] = useState(true);

  const appwriteTablesDb = new AppwriteTablesDB();

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await appwriteTablesDb.listRows(
          APPWRITE_USERPROFILES_TABLE_ID,
          [Query.equal("role", "AGRI_EXPERT")]
        );
        setDoctors(res.rows);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  return (
    <div className="p-6 space-y-8 relative">
      {/* Doctor Cards */}
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-green-100">
          <div className="flex items-center gap-3 border border-green-400 rounded-lg px-4 py-2 bg-white/70 shadow-sm">
            <Spinner />
            <PleaseWait />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.userId}
              doctor={doctor}
              onBook={(id) => setSelectedDoctorId(id)}
            />
          ))}
        </div>
      )}

      {/* 🔥 Animated Booking Popup */}
      <AnimatePresence>
        {selectedDoctorId && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 h-screen bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoctorId(null)}
            />

            {/* Modal */}
            <motion.div
              key="modal"
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
                {/* Close button */}
                <button
                  onClick={() => setSelectedDoctorId(null)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                  ✕
                </button>

                <AppointmentCard
                  doctorId={selectedDoctorId}
                  onClose={() => setSelectedDoctorId(null)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookDoctor;
