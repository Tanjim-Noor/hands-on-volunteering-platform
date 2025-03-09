import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main className="flex items-center justify-center py-20 px-4 min-h-[calc(100vh-64px)]">
      <div className="w-full max-w-4xl text-center">
        {isAuthenticated ? (
          <>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Welcome Back to HandsOn!
            </h1>
            <p className="text-xl text-gray-200 mb-8 mx-auto max-w-2xl leading-relaxed">
              Glad to have you back. Explore new volunteering opportunities, create events, or check your dashboard to track your impact.
            </p>
            <div className="space-x-4">
              <Link to="/dashboard" className="btn btn-primary">
                Dashboard
              </Link>
              <Link to="/create-event" className="btn btn-secondary">
                Create Event
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Welcome to HandsOn Volunteering Platform
            </h1>
            <p className="text-xl text-gray-200 mb-8 mx-auto max-w-2xl leading-relaxed">
              Connect with opportunities to make a difference in your community.
              Join events, form teams, and track your impact. Empower your community by volunteering!
            </p>
            <div className="space-x-4">
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Home;