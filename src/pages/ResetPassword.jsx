import { useSearchParams, useNavigate } from "react-router";
import { useState } from "react";
import AppwriteAccount from "../Appwrite/Account.Services";
import toast from "react-hot-toast";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const appwriteAccount = new AppwriteAccount();

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  const [password, setPassword] = useState("");

  async function handleReset() {
    try {
      await appwriteAccount.updatePasswordRecovery(
        userId,
        secret,
        password
      );

      toast.success("Password updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Reset failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-400 via-white to-emerald-50 px-4">
  <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-emerald-200 p-8">

    {/* Title */}
    <h2 className="text-2xl font-bold text-center text-emerald-700 mb-2">
      Reset Your Password 🔐
    </h2>

    <p className="text-center text-sm text-gray-500 mb-6">
      Enter a new secure password below
    </p>

    {/* Form */}
    <div className="space-y-5">

      {/* New Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <input
          type="password"
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 
                     focus:outline-none focus:ring-2 
                     focus:ring-emerald-500 focus:border-emerald-500
                     transition"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 
                     focus:outline-none focus:ring-2 
                     focus:ring-emerald-500 focus:border-emerald-500
                     transition"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleReset}
        className="w-full py-3 rounded-xl 
                   bg-emerald-600 hover:bg-emerald-700 
                   text-white font-semibold 
                   shadow-md transition active:scale-95"
      >
        Reset Password
      </button>

    </div>
  </div>
</div>

  );
}

export default ResetPassword;
