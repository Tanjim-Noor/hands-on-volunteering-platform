import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const loginSuccess = location.state?.loginSuccess;
  
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8">
        {loginSuccess && (
          <div className="mb-4 p-4 bg-green-200 border border-green-400 text-green-800 rounded">
            Successfully logged in!
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome back! Here you can view your upcoming events, track your volunteer hours, and see your impact.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">Your Events</h2>
            <p>No upcoming events yet. Join events from the home page!</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">Impact Summary</h2>
            <p>You haven't logged any volunteer hours yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;