// import React, { useState } from "react";
// import useAuthStore from "@/store/authStore";
// import AppwriteStorage from "@/src/Appwrite/Storage.Services";
// import { APPWRITE_APPOINTMENTS_IMAGES_BUCKET_ID, APPWRITE_APPOINTMENTS_TABLE_ID } from "@/src/Utils/Appwrite/constants";
// import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";

// const BookDoctor = () => {
//   const currentUser = useAuthStore((state) => state.currentUser);

//   const [doctorId, setDoctorId] = useState("");
//   const [issue, setIssue] = useState("");
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
  
//   const appwriteTablesDb = new AppwriteTablesDB();
//   // const appwriteStorage = new AppwriteStorage();
//   const handleImageChange = (e) => {
//     setImages(Array.from(e.target.files));
//   };

//   const handleAppointmentSubmit = async (e) => {
//     e.preventDefault();
//     if (!currentUser) return;

//     try {
//       setLoading(true);

//       // 1️⃣ Upload images to storage
//       const imageIds = [];

//       for (const file of images) {
//         const uploaded = await AppwriteStorage.uploadFile(
//           APPWRITE_APPOINTMENTS_IMAGES_BUCKET_ID,
//           file
//         );
//         imageIds.push(uploaded.$id);
//       }

//       // 2️⃣ Create appointment record
//       const appointmentPayload = {
//         farmerId: currentUser.$id,
//         // doctorId,
//         issue,
//         appointmentDate,
//         imageIds,
//         status: "pending",
//       };

//       const result = await appwriteTablesDb.createRow(
//         APPWRITE_APPOINTMENTS_TABLE_ID,
//         appointmentPayload
//       );
//       console.log("request record : ",result);

//       alert("Appointment requested successfully ✅");

//       // Reset form
//       setDoctorId("");
//       setIssue("");
//       setAppointmentDate("");
//       setImages([]);

//     } catch (error) {
//       console.error(error);
//       alert("Failed to request appointment ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
//       <h2 className="text-2xl font-semibold mb-6">
//         Book Doctor Appointment
//       </h2>

//       <form onSubmit={handleAppointmentSubmit} className="space-y-4">
//         {/* Doctor */}
//         <select
//           value={doctorId}
//           onChange={(e) => setDoctorId(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Doctor</option>
//           <option value="doc_1">Dr. Ramesh</option>
//           <option value="doc_2">Dr. Suresh</option>
//         </select>

//         {/* Issue */}
//         <textarea
//           value={issue}
//           onChange={(e) => setIssue(e.target.value)}
//           required
//           rows={4}
//           placeholder="Describe crop issue..."
//           className="w-full border p-2 rounded"
//         />

//         {/* Date */}
//         <input
//           type="date"
//           value={appointmentDate}
//           onChange={(e) => setAppointmentDate(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         />

//         {/* Images */}
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={handleImageChange}
//           className="w-full border p-2 rounded"
//         />

//         <button
//           disabled={loading}
//           className="w-full bg-emerald-600 text-white py-3 rounded"
//         >
//           {loading ? "Submitting..." : "Request Appointment"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookDoctor;


import React, { useEffect, useState } from "react";
import DoctorCard from "@/src/components/seeds/DoctorCard";
import BookDoctor from "@/src/components/seeds/BookDoctor";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import { APPWRITE_USERPROFILES_TABLE_ID } from "@/src/Utils/Appwrite/constants";
import { Query } from "appwrite";

const FarmerDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const appwriteTablesDb = new AppwriteTablesDB();

  useEffect(() => {
    async function fetchDoctors() {
      const res = await appwriteTablesDb.listRows(APPWRITE_USERPROFILES_TABLE_ID,[Query.equal("role", "AGRI_EXPERT")]);
      console.log(res);
      setDoctors(res.rows);
    }
    fetchDoctors();
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.userId}
            doctor={doctor}
            onBook={setSelectedDoctorId}
          />
        ))}
      </div>

      {/* Booking Form */}
      {selectedDoctorId && (
        <BookDoctor
          doctorId={selectedDoctorId}
          onClose={() => setSelectedDoctorId(null)}
        />
      )}
    </div>
  );
};

export default FarmerDashboard;
