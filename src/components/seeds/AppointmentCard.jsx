import useAuthStore from "@/store/authStore";
import { useState } from "react";
import AppwriteStorage from "@/src/Appwrite/Storage.Services"
import { APPWRITE_APPOINTMENTS_IMAGES_BUCKET_ID, APPWRITE_APPOINTMENTS_TABLE_ID } from "@/src/Utils/Appwrite/constants";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import toast from "react-hot-toast";

const AppointmentCard = ({ doctorId, onClose }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  // console.log("HELLO",currentUser);

  const [issue, setIssue] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const appwriteTablesDB = new AppwriteTablesDB();

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setLoading(true);

      const imageIds = [];

      for (const file of images) {
        const uploaded = await AppwriteStorage.uploadFile(
          APPWRITE_APPOINTMENTS_IMAGES_BUCKET_ID,
          file
        );
        imageIds.push(uploaded.$id);
      }

      await appwriteTablesDB.createRow(
        APPWRITE_APPOINTMENTS_TABLE_ID,
        {
          farmerId: currentUser.$id,
          farmerName: currentUser.name,
          doctorId,
          issue,
          appointmentDate,
          imageIds,
          status: "pending",
        }
      );

      toast.success('Appointment requested successfully')
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to request appointment ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">
        Book Doctor Appointment
      </h2>

      <form onSubmit={handleAppointmentSubmit} className="space-y-4">
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          required
          rows={4}
          placeholder="Describe crop issue..."
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-3">
          <button
            disabled={loading}
            className="flex-1 bg-emerald-600 text-white py-3 rounded"
          >
            {loading ? "Submitting..." : "Confirm Booking"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 border rounded py-3"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentCard;
