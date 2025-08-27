import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");
  };
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-6 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-blue-600">TaskManager</h1>
      <nav className="space-x-6">
        <Link to="/features" className="text-gray-700 hover:text-blue-600">
          Features
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600">
          About
        </Link>
        {user ? (
          <>
            <span className="font-medium">Hello, {user.username}</span>
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
    </header>
  );
}
