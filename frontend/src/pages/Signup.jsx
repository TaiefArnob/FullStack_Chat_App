import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FaUser, FaEnvelope, FaLock, FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      return toast.error("All fields are required!");
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Enter a valid email!");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters!");
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success === true) {
      signup(formData);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-100">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-center gap-2 text-3xl font-bold">
            <FaCommentDots className="text-primary text-4xl" />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Bleep
            </span>
          </div>

          <h2 className="text-xl font-semibold text-gray-700">
            Create Your Account
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full pl-10"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full pl-10"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full pl-10"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full text-lg font-semibold transition duration-300 hover:bg-blue-600"
              disabled={isSigningUp}
            >
              {isSigningUp ? "Signing Up..." : "Sign Up"}
            </button>
          </form>


          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>


      <div className="hidden lg:flex justify-center items-center relative bg-cover bg-center">

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 text-white text-center px-8">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-blue-400">Bleep!</span>
          </h2>
          <p className="text-lg text-gray-300">
            Connect, Chat, and Enjoy Seamless Conversations with Friends and
            Family!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
