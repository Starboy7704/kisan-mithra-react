import { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import { APPWRITE_USERPROFILES_TABLE_ID } from "@/src/Utils/Appwrite/constants";
import { Query } from "appwrite";
import { Skeleton } from "@/components/ui/skeleton";

const roles = ["ALL", "FARMER", "AGRI_EXPERT", "CUSTOMER"];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [activeRole, setActiveRole] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const appwriteTablesDB = new AppwriteTablesDB();

  useEffect(() => {
    fetchUsers();
  }, [activeRole]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const queries =
        activeRole === "ALL"
          ? []
          : [Query.equal("role", activeRole)];

      const result = await appwriteTablesDB.listRows(
        APPWRITE_USERPROFILES_TABLE_ID,
        queries
      );

      setUsers(result.rows);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">👥 Manage Users</h2>
        <p className="text-gray-600">
          View and manage farmers, customers, and agri experts
        </p>
      </div>

      {/* Role Filters */}
      <div className="flex gap-2">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            className={`px-4 py-2 rounded-full text-sm border
              ${
                activeRole === role
                  ? "bg-emerald-600 text-white"
                  : "bg-white hover:bg-emerald-50"
              }`}
          >
            {role.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="p-6 space-y-6">
      {/* Page Title */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-50">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Table Rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-4 px-6 py-4 border-t"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto bg-white border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.$id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">
                    {user.fullName}
                  </td>
                  <td className="p-3 text-gray-600">
                    {user.email}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded text-xs bg-emerald-100 text-emerald-700">
                      {user.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="text-emerald-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
