import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 shadow-md bg-white">
      {/* Logo */}
      {/* <h1 className="text-2xl font-bold text-blue-600">TaskManager</h1> */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        TaskManager
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/features" className="text-gray-700 hover:text-blue-600">
          Features
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600">
          About
        </Link>
        {user ? (
          <>
            <span className="font-medium">{user.username}</span>
            <button
              onClick={handleLogOut}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden flex flex-col space-y-1"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="block w-6 h-0.5 bg-gray-700"></span>
        <span className="block w-6 h-0.5 bg-gray-700"></span>
        <span className="block w-6 h-0.5 bg-gray-700"></span>
      </button>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 md:hidden">
          <Link
            to="/features"
            className="text-gray-700 hover:text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          {user ? (
            <>
              <span className="font-medium">{user.username}</span>
              <button
                onClick={() => {
                  handleLogOut();
                  setMenuOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
