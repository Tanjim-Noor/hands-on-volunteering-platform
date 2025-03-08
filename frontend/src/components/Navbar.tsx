import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Common navigation items
  const navItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "underline text-white" : "text-gray-300 hover:text-white"
        }
        end
      >
        Home
      </NavLink>
      {isAuthenticated ? (
        <>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "underline text-white" : "text-gray-300 hover:text-white"
            }
          >
            Dashboard
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "underline text-white" : "text-gray-300 hover:text-white"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "underline text-white" : "text-gray-300 hover:text-white"
            }
          >
            Register
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="bg-gray-900 bg-opacity-90 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-extrabold text-white drop-shadow-md">
          <NavLink to="/">HandsOn</NavLink>
        </div>
        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-lg" aria-label="Main navigation">
          {navItems}
        </nav>
        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-300 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {/* Simple Hamburger icon */}
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden px-6 pb-4 pt-2 space-y-2 text-lg" aria-label="Mobile navigation">
          {navItems}
        </nav>
      )}
    </header>
  );
};

export default Navbar;