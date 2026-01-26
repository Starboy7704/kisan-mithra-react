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
   <div className="flex h-screen bg-gray-100">
  {/* ✅ Fixed Sidebar */}
  <div className="w-60 fixed top-0 left-0 h-screen">
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
  </div>

  {/* ✅ Main Content Scroll */}
  <main className="ml-64 flex-1 h-screen overflow-y-auto p-6 bg-white">
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
