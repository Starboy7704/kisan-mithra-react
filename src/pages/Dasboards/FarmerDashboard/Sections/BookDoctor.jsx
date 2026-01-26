import React, { useEffect, useState } from "react";
import DoctorCard from "@/src/components/DoctorCard";
import AppointmentCard from "@/src/components/seeds/AppointmentCard.jsx";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import { APPWRITE_USERPROFILES_TABLE_ID } from "@/src/Utils/Appwrite/constants";
import { Query } from "appwrite";
import Spinner from "@/components/ui/spinner";

const FarmerDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [loading, setLoading] = useState(true);

  const appwriteTablesDb = new AppwriteTablesDB();

  useEffect(() => {
    async function fetchDoctors() {
      const res = await appwriteTablesDb.listRows(
        APPWRITE_USERPROFILES_TABLE_ID,
        [Query.equal("role", "AGRI_EXPERT")],
      );
      setLoading(false);
      console.log(res);
      setDoctors(res.rows);
    }
    fetchDoctors();
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Doctor Cards */}
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-green-50 to-emerald-100">
          <Spinner className="size-10 text-emerald-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.userId}
              doctor={doctor}
              onBook={setSelectedDoctorId}
            />
          ))}
        </div>
      )}

      {/* Booking Form */}
      {selectedDoctorId && (
        <AppointmentCard
          doctorId={selectedDoctorId}
          onClose={() => setSelectedDoctorId(null)}
        />
      )}
    </div>
  );
};

export default FarmerDashboard;
