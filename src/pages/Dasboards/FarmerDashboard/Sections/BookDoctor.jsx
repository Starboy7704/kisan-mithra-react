import React, { useState } from "react";
import useAuthStore from "@/store/authStore";
import StorageService from "@/Services/Appwrite/Storage.services";
import TablesDB from "@/Services/Appwrite/TableDB.services";
import {
  APPOINTMENTS_TABLE_ID,
  APPOINTMENT_IMAGES_BUCKET_ID,
} from "@/Utils/Appwrite/constants";
import Spinner from "@/components/ui/spinner";

const BookDoctor = () => {
  const currentUser = useAuthStore((state) => state.currentUser);

  const [doctorId, setDoctorId] = useState("");
  const [issue, setIssue] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setLoading(true);

      // 1️⃣ Upload images to storage
      const imageIds = [];

      for (const file of images) {
        const uploaded = await StorageService.uploadFile(
          APPOINTMENT_IMAGES_BUCKET_ID,
          file
        );
        imageIds.push(uploaded.$id);
      }

      // 2️⃣ Create appointment record
      const appointmentPayload = {
        farmerId: currentUser.$id,
        doctorId,
        issue,
        appointmentDate,
        imageIds,
        status: "pending",
      };

      await TablesDB.createRow(
        APPOINTMENTS_TABLE_ID,
        appointmentPayload
      );

      alert("Appointment requested successfully ✅");

      // Reset form
      setDoctorId("");
      setIssue("");
      setAppointmentDate("");
      setImages([]);

    } catch (error) {
      console.error(error);
      alert("Failed to request appointment ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">
        Book Doctor Appointment
      </h2>

      <form onSubmit={handleAppointmentSubmit} className="space-y-4">
        {/* Doctor */}
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Doctor</option>
          <option value="doc_1">Dr. Ramesh</option>
          <option value="doc_2">Dr. Suresh</option>
        </select>

        {/* Issue */}
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          required
          rows={4}
          placeholder="Describe crop issue..."
          className="w-full border p-2 rounded"
        />

        {/* Date */}
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        {/* Images */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />

        <button
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-3 rounded"
        >
          {loading ? <Spinner/> : "Request Appointment"}
        </button>
      </form>
    </div>
  );
};

export default BookDoctor;
