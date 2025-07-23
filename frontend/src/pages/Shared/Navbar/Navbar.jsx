import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CampusNest
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-500 font-medium">
            Home
          </Link>
          <Link to="/colleges" className="hover:text-blue-500 font-medium">
            Colleges
          </Link>
          <Link to="/admission" className="hover:text-blue-500 font-medium">
            Admission
          </Link>
          <Link to="/my-college" className="hover:text-blue-500 font-medium">
            My College
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <Link to="/profile" className="flex items-center space-x-2 group">
                <img
                  src={
                    user.photoURL ||
                    "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                  }
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-500 hidden md:inline">
                  {user.displayName}
                </span>
              </Link>

              {/* Mobile Menu Icon (next to user) */}
              <div className="md:hidden">
                <button onClick={toggleMenu}>
                <Menu className="w-6 h-6" />
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/signin"
              className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
             {isMenuOpen && (
  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
    <Link
      to="/"
      onClick={() => setIsMenuOpen(false)}
      className="block px-4 py-2 text-sm hover:bg-gray-100"
    >
      Home
    </Link>
    <Link
      to="/colleges"
      onClick={() => setIsMenuOpen(false)}
      className="block px-4 py-2 text-sm hover:bg-gray-100"
    >
      Colleges
    </Link>
    <Link
      to="/admission"
      onClick={() => setIsMenuOpen(false)}
      className="block px-4 py-2 text-sm hover:bg-gray-100"
    >
      Admission
    </Link>
    <Link
      to="/my-college"
      onClick={() => setIsMenuOpen(false)}
      className="block px-4 py-2 text-sm hover:bg-gray-100"
    >
      My College
    </Link>
  </div>
)}

    </nav>
  );
};

export default Navbar;
