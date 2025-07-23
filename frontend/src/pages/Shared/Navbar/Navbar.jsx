import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user} = useAuth();
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CampusNest
        </Link>

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

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Show user's profile photo */}
              {user && (
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 group"
                >
                  <img
                    src={
                      user.photoURL ||
                      "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                    }
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border"
                    // title={user.displayName}
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-500">
                    {user.displayName}
                  </span>
                </Link>
              )}

              {/* <button
                onClick={handleSignOut}
                className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600"
              >
                Sign Out
              </button> */}
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
    </nav>
  );
};

export default Navbar;
