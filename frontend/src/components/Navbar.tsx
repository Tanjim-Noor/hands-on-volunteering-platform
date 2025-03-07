import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-lg font-bold">
          <NavLink to="/">HandsOn</NavLink>
        </div>
        <div className="space-x-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'underline' : 'hover:text-gray-300'} 
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => isActive ? 'underline' : 'hover:text-gray-300'}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/login" 
            className={({ isActive }) => isActive ? 'underline' : 'hover:text-gray-300'}
          >
            Login
          </NavLink>
          <NavLink 
            to="/register" 
            className={({ isActive }) => isActive ? 'underline' : 'hover:text-gray-300'}
          >
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;