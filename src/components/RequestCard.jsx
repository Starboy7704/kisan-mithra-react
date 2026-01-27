import AppwriteStorage from "@/src/Appwrite/Storage.Services";
import { APPWRITE_APPOINTMENTS_IMAGES_BUCKET_ID } from "../Utils/Appwrite/constants";

const RequestCard = ({ farmerId, farmerName, issue, imageIds, onAccept, onReject }) => {
  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <p>
        <strong>Farmer:</strong> {farmerName}
      </p>

      <p>
        <strong>Farmer ID:</strong> {farmerId}
      </p>

      <p className="mt-1">
        <strong>Issue:</strong> {issue}
      </p>

      {/* Images */}
      {imageIds?.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {imageIds.map((fileId) => (
            <img
              key={fileId}
              src={AppwriteStorage.getFileView(
                APPWRITE_APPOINTMENTS_IMAGES_BUCKET_ID,
                fileId,
              )}
              alt="Crop issue"
              className="h-24 w-full object-cover rounded"
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={onAccept}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Accept
        </button>
        <button
          onClick={onReject}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
