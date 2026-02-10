import React, { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import {
  APPWRITE_USERPROFILES_TABLE_ID,
  APPWRITE_APPOINTMENTS_TABLE_ID,
} from "@/src/Utils/Appwrite/constants";
import { Query } from "appwrite";
import { Skeleton } from "@/components/ui/skeleton";
import StatCard from "@/src/components/StatCard";
import UsersOverviewChart from "@/src/components/UsersOverviewChart";

const Overview = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 0,
    farmers: 0,
    experts: 0,
    appointments: 0,
  });

  const appwriteTablesDB = new AppwriteTablesDB();

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    async function fetchOverviewData() {
      try {
        // ✅ Fetch counts in parallel (FAST)
        const [
          usersRes,
          farmersRes,
          expertsRes,
          appointmentsRes,
          recentAppointmentsRes,
        ] = await Promise.all([
          appwriteTablesDB.listRows(APPWRITE_USERPROFILES_TABLE_ID),
          appwriteTablesDB.listRows(APPWRITE_USERPROFILES_TABLE_ID, [
            Query.equal("role", "FARMER"),
          ]),
          appwriteTablesDB.listRows(APPWRITE_USERPROFILES_TABLE_ID, [
            Query.equal("role", "AGRI_EXPERT"),
          ]),
          appwriteTablesDB.listRows(APPWRITE_APPOINTMENTS_TABLE_ID),
          appwriteTablesDB.listRows(APPWRITE_APPOINTMENTS_TABLE_ID, [
            Query.orderDesc("$createdAt"),
            Query.limit(5),
          ]),
        ]);

        setStats({
          totalUsers: usersRes.total,
          farmers: farmersRes.total,
          experts: expertsRes.total,
          appointments: appointmentsRes.total,
        });

        setRecentActivity(recentAppointmentsRes.rows);
      } catch (error) {
        console.error("Failed to load overview data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOverviewData();
  }, []);

  if (loading) {
    return (
       <div className="p-6 space-y-8">
      {/* Page Title */}
      <Skeleton className="h-8 w-56 mx-auto" />

      {/* Overview Header */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-56" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border shadow-sm p-6 space-y-3"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Skeleton */}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>

        {/* Recent Activity Skeleton */}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <Skeleton className="h-5 w-40" />

          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="space-y-2">
                <Skeleton className="h-4 w-56" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">📊 Overview</h2>
        <p className="text-gray-600">Quick stats and system health</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          color="text-emerald-600"
        />
        <StatCard
          title="Farmers"
          value={stats.farmers}
          color="text-green-600"
        />
        <StatCard
          title="Agri Experts"
          value={stats.experts}
          color="text-blue-600"
        />
        <StatCard
          title="Appointments"
          value={stats.appointments}
          color="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* users pie chart */}
        <UsersOverviewChart 
        // theme={isDark ? "dark" : "light"} 
        stats={stats} />

        {/* Recent Activity */}
        <div className="p-5 bg-white rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-3">🕒 Recent Activity</h3>

          {recentActivity.length === 0 ? (
            <p className="text-sm text-gray-500">No recent activity</p>
          ) : (
            <ul className="space-y-3 text-sm">
              {recentActivity.map((item) => (
                <li
                  key={item.$id}
                  className="flex justify-between text-gray-700"
                >
                  <span>
                    📅 Appointment requested by{" "}
                    <strong>{item.farmerName || "Farmer"}</strong>
                  </span>
                  <span className="text-gray-400">
                    {new Date(item.$createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
