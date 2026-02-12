import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import Logout from "./Logout";
import { Skeleton } from "@/components/ui/skeleton";
import { APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID, APPWRITE_USERPROFILES_TABLE_ID } from "../Utils/Appwrite/constants";
import AppwriteStorage from "../Appwrite/Storage.Services";
import AppwriteTablesDB from "../Appwrite/TableDB.services";
import { Query } from "appwrite";

const UserProfile = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [profileImageId, setProfileImageId] = useState(null);

  const tablesDB = new AppwriteTablesDB();

  // 🔥 Fetch profile image from UserProfiles table
  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;

      try {
        const result = await tablesDB.listRows(
          APPWRITE_USERPROFILES_TABLE_ID,
          [Query.equal("userId", currentUser.$id)]
        );

        if (result.rows.length > 0) {
          setProfileImageId(result.rows[0].imageId);
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, [currentUser]);

  // ⏳ Loading skeleton
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-7 space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>

          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  const { name, email, prefs, $id } = currentUser;
  const role = prefs?.role || "User";

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white shadow-xl p-4">

        {/* PROFILE HEADER */}
        <div className="flex flex-col items-center text-center space-y-3">

          {/* 🔥 IMAGE OR FALLBACK */}
          {profileImageId ? (
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-emerald-600">
              <img
                src={AppwriteStorage.getFileView(
                  APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
                  profileImageId
                )}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-16 w-16 rounded-full bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold">
              {name?.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {name}
            </h2>
            <p className="text-sm text-gray-500">{email}</p>
          </div>

          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
            {role.toUpperCase()}
          </span>
        </div>

        {/* DETAILS */}
        <div className="mt-6 space-y-4 text-sm">
          <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-gray-800 truncate max-w-[180px]">
              {email}
            </span>
          </div>

          <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-gray-500">User ID</span>
            <span className="font-medium text-gray-800 truncate max-w-[160px]">
              {$id}
            </span>
          </div>

          <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-gray-500">Account Status</span>
            <span className="font-semibold text-emerald-600">
              Active
            </span>
          </div>
        </div>

        <div className="border-t mt-1">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
