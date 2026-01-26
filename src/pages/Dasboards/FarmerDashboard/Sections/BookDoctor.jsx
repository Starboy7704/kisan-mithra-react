import React, { useEffect, useState } from "react";
import DoctorCard from "@/src/components/DoctorCard";
import AppointmentRequest from "@/src/components/seeds/AppointmentRequest.jsx";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import { APPWRITE_USERPROFILES_TABLE_ID } from "@/src/Utils/Appwrite/constants";
import { Query } from "appwrite";
import Spinner from "@/components/ui/spinner";
import PleaseWait from "@/src/pleasewait";

const FarmerDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [loading,setLoading]=useState(true)

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
      {loading? (
        <div className="flex items-center justify-center min-h-screen bg-green-100">
   <div className="flex items-center gap-3 scale-100 border border-green-400 rounded-lg px-4 py-2 bg-white/70 shadow-sm">
  <Spinner />
  <PleaseWait/>

</div>

  </div>
      ):(
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
        <AppointmentRequest
          doctorId={selectedDoctorId}
          onClose={() => setSelectedDoctorId(null)}
        />
      )}
    </div>
  );
};

export default FarmerDashboard;
