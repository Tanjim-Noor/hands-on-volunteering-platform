import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <h1 className="text-5xl font-bold mb-6 text-center">
        Welcome to HandsOn Volunteering Platform
      </h1>
      <p className="text-xl text-gray-700 mb-8 text-center max-w-lg">
        Connect with opportunities to make a difference in your community. Join events,
        form teams, and track your impact. Empower your community by volunteering!
      </p>
      <div className="space-x-4">
        <Link 
          to="/register" 
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;