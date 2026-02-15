// DoctorDashboard.jsx

import React, { useState } from "react";
import Sidebar from "./Sections/Sidebar";
import AppointmentRequests from "./Sections/AppointmentRequests";
import MyAppointments from "./Sections/MyAppointments";
import Chat from "./Sections/Chat";
import VideoConsultation from "./Sections/VideoConsultation";
import Payments from "./Sections/Payments";
import UserProfile from "../../UserProfile";
import { Menu, X } from "lucide-react";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("Requests");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "Requests":
        return <AppointmentRequests />;
      case "Appointments":
        return <MyAppointments />;
      case "Chat":
        return <Chat />;
      case "VideoConsultation":
        return <VideoConsultation />;
      case "Payments":
        return <Payments />;
      case "UserProfile":
        return <UserProfile />;
      default:
        return <AppointmentRequests />;
    }
  };

  return (
    <div className="relative flex h-screen bg-gray-100 overflow-hidden">
      
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-green-700 text-white rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-60 bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Overlay (Mobile Only) */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto p-4 md:p-6 bg-white md:ml-60">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 text-center pt-12 md:pt-0">
          Doctor Dashboard 🩺
        </h1>

        <div className="bg-gray-50 p-4 md:p-6 rounded-xl shadow-sm">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
