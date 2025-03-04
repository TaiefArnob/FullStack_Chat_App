import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router-dom";
import { FaLock, FaTrash } from "react-icons/fa";

const Settings = () => {
  const { authUser, updatePassword, deleteAccount } = useAuthStore();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      alert("Please fill in all fields.");
      return;
    }
  
    await updatePassword({
      email: authUser?.email,
      oldPassword,
      newPassword,
    });
  
    setOldPassword("");
    setNewPassword("");
  };
  

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      await deleteAccount(authUser?.email);
    }
  };

  if (!authUser) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Update Password</h2>

        {/* Update Password Form */}
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-600">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-600">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-500 hover:shadow-xl transition transform hover:-translate-y-1 duration-300 ease-in-out"
          >
            <FaLock /> Update Password
          </button>
        </form>

        {/* Delete Account */}
        <button
          onClick={handleDeleteAccount}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-lg shadow-lg hover:from-red-700 hover:to-red-500 hover:shadow-xl transition transform hover:-translate-y-1 duration-300 ease-in-out"
        >
          <FaTrash /> Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
