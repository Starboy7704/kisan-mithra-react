import React from "react";

const Overview = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Overview</h2>
      <p className="text-gray-600">Quick stats and system health will appear here.</p>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded shadow-sm">Users: <strong>—</strong></div>
        <div className="p-4 bg-blue-50 rounded shadow-sm">Active Orders: <strong>—</strong></div>
        <div className="p-4 bg-blue-50 rounded shadow-sm">Revenue: <strong>—</strong></div>
      </div>
    </div>
  );
};

export default Overview;