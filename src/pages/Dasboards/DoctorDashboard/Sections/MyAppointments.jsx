const MyAppointments = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        📅 My Appointments
      </h2>

      <p className="text-gray-600">
        Your confirmed appointments will show here.
      </p>

      <ul className="mt-4 space-y-3">
        <li className="p-4 border rounded-lg bg-gray-50">
          Farmer: Suresh <br />
          Date: 10 Jan 2026
        </li>
      </ul>
    </div>
  );
};

export default MyAppointments;
