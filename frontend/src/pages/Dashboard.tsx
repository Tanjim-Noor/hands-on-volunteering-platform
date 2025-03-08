import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(!!location.state?.loginSuccess);
  
  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {showSuccess && (
          <div className="mb-4 p-4 bg-green-200 border border-green-400 text-green-800 rounded flex justify-between items-center">
            <span>Successfully logged in!</span>
            <button
              onClick={() => setShowSuccess(false)}
              aria-label="Dismiss success message"
              className="text-green-800 font-bold"
            >
              ×
            </button>
          </div>
        )}
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <section className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Your Events</h2>
            <p className="mb-4">No upcoming events yet.</p>
            <button className="btn btn-secondary">
              Find Events
            </button>
          </div>
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Impact Summary</h2>
            <p className="mb-4">You haven't logged any volunteer hours yet.</p>
            <button className="btn btn-secondary">
              Log Hours
            </button>
            <div className="mt-4 text-6xl">
              {/* Example illustration icon */}
              <span role="img" aria-label="empty state">📭</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;