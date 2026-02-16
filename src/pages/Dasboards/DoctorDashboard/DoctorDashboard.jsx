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
  <div
    className="
      relative flex min-h-screen overflow-hidden
      bg-gradient-to-br from-emerald-50 via-white to-emerald-100
    "
  >

    {/* Mobile Menu Button */}
    <button
      className="
        md:hidden fixed top-4 left-4 z-50 p-2
        bg-emerald-700 text-white rounded-xl shadow-xl
        hover:scale-105 active:scale-95 transition
      "
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
    </button>

    {/* Sidebar */}
    <div
      className={`
        fixed inset-y-0 left-0 z-40
        w-72 sm:w-64
        bg-white border-r border-emerald-100
        shadow-xl
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

    {/* Overlay */}
    {sidebarOpen && (
      <div
        className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
        onClick={() => setSidebarOpen(false)}
      />
    )}

    {/* Main Content */}
    <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-8 lg:p-10">

      {/* Header Card */}
      <div
        className="
          bg-white/90 backdrop-blur-lg
          rounded-2xl
          shadow-lg
          border border-emerald-200
          p-4 sm:p-6
          mb-6 sm:mb-8
          text-center
        "
      >
        <h1
          className="
            text-xl sm:text-2xl md:text-3xl lg:text-4xl
            font-extrabold
            bg-gradient-to-r from-green-700 via-emerald-600 to-green-800
            bg-clip-text
            text-center
          "
        >
          Doctor Dashboard 🩺
        </h1>

        <p className="text-emerald-600 mt-2 text-xs sm:text-sm md:text-base">
          Manage consultations, appointments & payments efficiently
        </p>
      </div>

      {/* Content Container */}
      <div
        className="
          bg-white
          p-4 sm:p-6 md:p-8
          rounded-2xl sm:rounded-3xl
          border border-emerald-100
          shadow-[0_15px_40px_rgba(0,0,0,0.08)]
          transition-all duration-300
          hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
        "
      >
        {renderContent()}
      </div>

    </main>
  </div>
);

};

export default DoctorDashboard;
