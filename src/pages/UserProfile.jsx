import useAuthStore from "@/store/authStore";
import Logout from "./Logout";
import Spinner from "@/components/ui/spinner";

const UserProfile = () => {
  const currentUser = useAuthStore((state) => state.currentUser);

  // Guard: user not loaded yet
  if (!currentUser) {
    return (
      <div className="p-4 text-center text-gray-500">
        <Spinner/>
      </div>
    );
  }

  const {
    name,
    email,
    prefs,
    $id,
  } = currentUser;

  return (
    <div className="max-w-sm mx-auto rounded-xl border bg-white shadow p-5 space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">
        User Profile
      </h2>

      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium">Name:</span> {name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {email}
        </p>
        <p>
          <span className="font-medium">Role:</span> {prefs.role }
        </p>
        <p className="text-xs text-gray-400">
          User ID: {$id}
        </p>
      </div>

      <div className="pt-2">
        <Logout />
      </div>
    </div>
  );
};

export default UserProfile;
