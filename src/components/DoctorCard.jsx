import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AppwriteStorage from "../Appwrite/Storage.Services";
import { APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID } from "../Utils/Appwrite/constants.js";

const DoctorCard = ({ doctor, onBook }) => {
  return (
    <Card className="h-full flex flex-col
                     rounded-2xl border border-emerald-200 bg-white
                     shadow-md hover:shadow-xl hover:-translate-y-1
                     transition-all duration-300">

      {/* HEADER */}
      <CardHeader className="flex flex-col items-center text-center pt-6 pb-3">

        {doctor.imageId && (
          <img
            src={AppwriteStorage.getFileView(
              APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
              doctor.imageId
            )}
            alt={doctor.fullName}
            className="w-24 h-24 rounded-full object-cover
                       ring-4 ring-emerald-100 shadow mb-3"
          />
        )}

        <CardTitle className="text-lg font-bold text-emerald-800">
          {doctor.fullName}
        </CardTitle>
      </CardHeader>

      {/* BODY — grows */}
      <CardContent className="flex-1 px-6 py-3">
        <div className="space-y-2 text-sm text-gray-700">

          <p><span className="font-semibold">Qualification:</span> {doctor.qualification}</p>
          <p><span className="font-semibold">Specialization:</span> {doctor.specialization}</p>
          <p><span className="font-semibold">Experience:</span> {doctor.experience} years</p>

        </div>
      </CardContent>

      {/* FOOTER — sticks bottom */}
      <CardFooter className="px-6 pb-6 pt-2 mt-auto">
        <Button
          className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700
                     text-white font-semibold shadow-md transition"
          onClick={() => onBook(doctor.userId)}
        >
          Book Appointment
        </Button>
      </CardFooter>

    </Card>
  );
};

export default DoctorCard;
