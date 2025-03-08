import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, User } from '../utils/user';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(!!location.state?.loginSuccess);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [userError, setUserError] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err: unknown) {
        console.error(err);
        setUserError('Failed to fetch user data.');
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

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

        {/* Personal Information Section */}
        {loadingUser ? (
          <p>Loading your profile...</p>
        ) : userError ? (
          <p className="text-red-500">{userError}</p>
        ) : user ? (
          <div className="mb-8 p-4 border rounded shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <p>
              <span className="font-bold">Name:</span> {user.name || 'N/A'}
            </p>
            <p>
              <span className="font-bold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-bold">Skills:</span> {user.skills || 'N/A'}
            </p>
            <p>
              <span className="font-bold">Causes:</span> {user.causes || 'N/A'}
            </p>
          </div>
        ) : null}

        <section className="grid md:grid-cols-2 gap-8">
          {/* Your Events Card */}
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Your Events</h2>
            {loadingUser ? (
              <p>Loading events...</p>
            ) : user && user.attendedEvents && user.attendedEvents.length > 0 ? (
              <ul>
                {user.attendedEvents.map((event) => (
                  <li key={event.id} className="mb-2 border p-4 rounded">
                    <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                    <p>{event.description || 'No description'}</p>
                    <p className="text-sm text-gray-600">
                      Date: {new Date(event.date).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Location: {event.location}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className="mb-4">You have not joined any events yet.</p>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => navigate('/events')}
                >
                  Find Events
                </button>
              </>
            )}
          </div>

          {/* Impact Summary Card */}
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Impact Summary</h2>
            <p className="mb-4">You haven't logged any volunteer hours yet.</p>
            <button className="btn btn-secondary">
              Log Hours
            </button>
            <div className="mt-4 text-6xl">
              <span role="img" aria-label="empty state">📭</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;