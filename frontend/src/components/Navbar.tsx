import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-lg font-bold">
          <NavLink to="/">HandsOn</NavLink>
        </div>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "underline" : "hover:text-gray-300")}
            end
          >
            Home
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "underline" : "hover:text-gray-300")}
              >
                Dashboard
              </NavLink>
              <button onClick={handleLogout} className="hover:underline text-white ml-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "underline" : "hover:text-gray-300")}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "underline" : "hover:text-gray-300")}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;