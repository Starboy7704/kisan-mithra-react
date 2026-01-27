import AppwriteStorage from "@/src/Appwrite/Storage.Services";
import { APPWRITE_APPOINTMENTS_IMAGES_BUCKET_ID } from "@/src/Utils/Appwrite/constants";

const ScheduledCard = ({
  farmerName,
  issue,
  appointmentDate,
  imageIds = [],
}) => {
  return (
    <div className="mt-4 p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          👨‍🌾 {farmerName || "Farmer"}
        </h3>

        <span className="text-sm text-gray-500">
          📅 {appointmentDate
            ? new Date(appointmentDate).toLocaleDateString()
            : "Date not set"}
        </span>
      </div>

      {/* Issue */}
      <p className="mt-2 text-gray-700">
        <strong>Issue:</strong> {issue}
      </p>

      {/* Images */}
      {imageIds.length > 0 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {imageIds.map((fileId) => (
            <img
              key={fileId}
              src={AppwriteStorage.getFileView(
                APPWRITE_APPOINTMENTS_IMAGES_BUCKET_ID,
                fileId
              )}
              alt="Crop issue"
              className="h-20 w-20 object-cover rounded-lg border"
            />
          ))}
        </div>
      )}

      {/* Status */}
      <div className="mt-4">
        <span className="inline-block px-3 py-1 text-sm rounded-full bg-emerald-100 text-emerald-700">
          Accepted
        </span>
      </div>
    </div>
  );
};

export default ScheduledCard;
