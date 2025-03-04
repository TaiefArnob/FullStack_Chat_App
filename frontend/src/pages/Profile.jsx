import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FaCamera } from "react-icons/fa";
import defaultAvatar from "../assets/avatar.png";

const Profile = () => {
  const { authUser, updateProfile } = useAuthStore();
  const [avatar, setAvatar] = useState(authUser?.profilePic || defaultAvatar);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await updateProfile(formData);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl overflow-hidden p-8 relative transform transition duration-300 hover:scale-105">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-gray-300">
            <img
              src={imagePreview || avatar}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <FaCamera className="text-xl" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          {/* Uploading Indicator */}
          {isUploading && (
            <p className="text-sm text-blue-500 mt-2">
              Uploading profile picture...
            </p>
          )}{" "}
          {/* 🔹 Shows when uploading */}
          {/* Upload Prompt */}
          <p
            className="mt-2 text-gray-500 text-sm cursor-pointer hover:underline"
            onClick={() => document.querySelector("input[type=file]").click()}
          >
            Click to upload or change profile image
          </p>
          {/* User Info */}
          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            {authUser?.fullName || "User Name"}
          </h2>
          <p className="text-gray-500 text-sm">
            {authUser?.email || "email@example.com"}
          </p>
        </div>

        {/* Account Details */}
        <div className="mt-6 w-full bg-gray-100 p-5 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold text-gray-900">
            Account Information
          </h3>
          <p className="text-gray-700 mt-2">
            <span className="font-medium">Member Since:</span>{" "}
            {authUser?.memberSince
              ? new Date(authUser.memberSince).toLocaleDateString()
              : "N/A"}
          </p>

          <p className="text-gray-700">
            <span className="font-medium">Account Status:</span>{" "}
            <span
              className={`font-medium ${
                authUser?.status === "Active"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {authUser?.status || "Inactive"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
