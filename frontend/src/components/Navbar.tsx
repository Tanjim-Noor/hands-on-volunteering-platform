import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-gray-800 text-white w-full">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          HandsOn
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'text-blue-400' : 'hover:text-blue-300')}
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) => (isActive ? 'text-blue-400' : 'hover:text-blue-300')}
          >
            Events
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? 'text-blue-400' : 'hover:text-blue-300')}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/create-event"
                className={({ isActive }) => (isActive ? 'text-blue-400' : 'hover:text-blue-300')}
              >
                Create Event
              </NavLink>
              <button onClick={handleLogout} className="hover:text-blue-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'text-blue-400' : 'hover:text-blue-300')}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? 'text-blue-400' : 'hover:text-blue-300')}
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 px-2 pt-2 pb-4 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'block text-blue-400' : 'block hover:text-blue-300')}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) => (isActive ? 'block text-blue-400' : 'block hover:text-blue-300')}
            onClick={() => setIsMenuOpen(false)}
          >
            Events
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? 'block text-blue-400' : 'block hover:text-blue-300')}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/create-event"
                className={({ isActive }) => (isActive ? 'block text-blue-400' : 'block hover:text-blue-300')}
                onClick={() => setIsMenuOpen(false)}
              >
                Create Event
              </NavLink>
              <button onClick={handleLogout} className="block hover:text-blue-300 w-full text-left">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'block text-blue-400' : 'block hover:text-blue-300')}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? 'block text-blue-400' : 'block hover:text-blue-300')}
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;