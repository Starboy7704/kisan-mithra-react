import React, { useState } from "react";
import Sidebar from "./Sections/Sidebar";
import AppointmentRequests from "./Sections/AppointmentRequests";
import MyAppointments from "./Sections/MyAppointments";
import Chat from "./Sections/Chat";
import VideoConsultation from "./Sections/VideoConsultation";
import Payments from "./Sections/Payments";
import UserProfile from "../../UserProfile";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("Requests");

  const renderContent = () => {
    switch (activeTab) {
      case "Requests":
        return <AppointmentRequests />;

      case "Appointments":
        return <MyAppointments />;

      // case "DoctorProfile":
      //   return <DoctorProfile />;

      case "Chat":
        return <Chat />;

      case "VideoConsultation":
        return <VideoConsultation />;

      case "Payments":
        return <Payments />;

      case "UserProfile":
        return <UserProfile/>;

      default:
        return <AppointmentRequests />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className=" ml-60 flex-1 p-6 bg-white">
        <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">
          Doctor Dashboard 🩺
        </h1>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
