import React from "react";

const Overview = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">📊 Overview</h2>
        <p className="text-gray-600">
          Quick stats and system health
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="p-5 bg-white rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">—</p>
        </div>

        {/* Farmers */}
        <div className="p-5 bg-white rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">Farmers</p>
          <p className="text-3xl font-bold text-green-600 mt-2">—</p>
        </div>

        {/* Agri Experts */}
        <div className="p-5 bg-white rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">Agri Experts</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">—</p>
        </div>

        {/* Appointments */}
        <div className="p-5 bg-white rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">Appointments</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">—</p>
        </div>
      </div>

      {/* System Status / Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <div className="p-5 bg-white rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-3">⚙️ System Health</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>✅ Database: Operational</li>
            <li>✅ Storage: Available</li>
            <li>✅ Authentication: Active</li>
          </ul>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="p-5 bg-white rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-3">🕒 Recent Activity</h3>
          <p className="text-sm text-gray-500">
            Recent user registrations, appointments, and updates will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
