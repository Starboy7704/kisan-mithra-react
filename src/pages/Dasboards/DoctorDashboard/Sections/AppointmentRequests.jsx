const AppointmentRequests = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        📋 Appointment Requests
      </h2>

      <p className="text-gray-600">
        Farmers appointment requests will appear here.
      </p>

      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
        <p><strong>Farmer:</strong> Ramesh</p>
        <p><strong>Issue:</strong> Crop disease</p>
        <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded">
          Accept
        </button>
      </div>
    </div>
  );
};

export default AppointmentRequests;
