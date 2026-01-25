import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const DoctorCard = ({ doctor, onBook }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{doctor.fullName}</CardTitle>
      </CardHeader>

      <CardContent className="text-sm text-gray-600 space-y-1">
        <p><b>Specialization:</b> {doctor.specialization}</p>
        <p><b>Experience:</b> {doctor.experience} years</p>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          onClick={() => onBook(doctor.userId)}
        >
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
