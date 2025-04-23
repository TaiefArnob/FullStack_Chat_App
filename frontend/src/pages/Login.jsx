import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FaEnvelope, FaLock, FaCommentDots } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn, authUser } = useAuthStore();
  const navigate = useNavigate(); 

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return toast.error("All fields are required!");
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Enter a valid email!");
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      await login(formData);
    }
  };

  // ✅ Redirect to home page only after login
  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-100">
    {/* Left Side - Form */}
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8 text-center bg-white p-8 rounded-xl shadow-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 text-3xl font-bold">
          <FaCommentDots className="text-primary text-4xl" />
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Bleep
          </span>
        </div>

        <h2 className="text-xl font-semibold text-gray-700">
          Welcome Back!
        </h2>

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-full text-lg font-semibold transition duration-300 hover:bg-blue-600"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* No account? Signup (✅ Fixed Page Reload) */}
        <p className="text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>

    {/* Right Side - Background Image Section */}
    <div className="hidden lg:flex justify-center items-center relative bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Welcome Text */}
      <div className="relative z-10 text-white text-center px-8">
        <h2 className="text-4xl font-bold mb-4">
          Welcome Back to <span className="text-blue-400">Bleep!</span>
        </h2>
        <p className="text-lg text-gray-300">
          Continue your conversations and connect with friends seamlessly!
        </p>
      </div>
    </div>
  </div>
  );
};

export default Login;
