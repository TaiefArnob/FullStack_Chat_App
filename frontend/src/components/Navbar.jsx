import { useAuthStore } from "../store/useAuthStore";
import { FaComments, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-300 fixed w-full top-0 z-40 shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaComments className="text-blue-500 text-2xl" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Bleep
          </h1>
        </div>


        <nav className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-gray-900 hover:text-blue-500 cursor-pointer" onClick={()=>navigate('/settings')}>
            <FaCog className="text-lg" />
            <span className="hidden sm:inline">Settings</span>
          </button>

          {authUser && (
            <>
              <button className="flex items-center gap-2 text-gray-900 hover:text-blue-500 cursor-pointer" onClick={()=>navigate('/profile')}>
                <FaUser className="text-lg" />
                <span className="hidden sm:inline">Profile</span>
              </button>

              <button
                onClick={()=>{
                  logout()
                  navigate('/login')
                }}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 cursor-pointer"
              >
                <FaSignOutAlt className="text-lg" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
