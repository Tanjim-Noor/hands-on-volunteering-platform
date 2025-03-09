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

  // Handler to view detailed attendee info for a created event.
  const handleViewAttendees = (eventId: number) => {
    // Navigate to a details page (to be implemented) to show attendee information.
    navigate(`/event-details/${eventId}`);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {showSuccess && (
          <div className="mb-4 p-4 bg-green-200 border border-green-400 text-green-800 rounded flex justify-between items-center">
            <span className="text-gray-800">Successfully logged in!</span>
            <button
              onClick={() => setShowSuccess(false)}
              aria-label="Dismiss success message"
              className="text-green-800 font-bold"
            >
              ×
            </button>
          </div>
        )}

        <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>

        {loadingUser ? (
          <p className="text-gray-800">Loading your profile...</p>
        ) : userError ? (
          <p className="text-red-500">{userError}</p>
        ) : user ? (
          <>
            {/* Personal Information Section */}
            <div className="mb-8 p-4 border rounded shadow-md bg-white text-gray-800">
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

            {/* Section - Your Created Events */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Created Events</h2>
              {user.volunteerEvents && user.volunteerEvents.length > 0 ? (
                <ul className="space-y-4">
                  {user.volunteerEvents.map((event) => (
                    <li key={event.id} className="border p-4 rounded bg-white text-gray-800">
                      <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                      <p>{event.description || 'No description provided.'}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        Date: {new Date(event.date).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Location: {event.location} | Category: {event.category}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        Attendees: {event.attendees ? event.attendees.length : 0}
                      </p>
                      <button
                        onClick={() => handleViewAttendees(event.id)}
                        className="btn btn-secondary"
                      >
                        View Attendees
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-800">You have not created any events yet.</p>
              )}
            </div>

            {/* Section - Events Attending */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Events Attending</h2>
              {user.attendedEvents && user.attendedEvents.length > 0 ? (
                <ul className="space-y-4">
                  {user.attendedEvents.map((event) => (
                    <li key={event.id} className="border p-4 rounded bg-white text-gray-800">
                      <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                      <p>{event.description || 'No description provided.'}</p>
                      <p className="text-sm text-gray-600">
                        Date: {new Date(event.date).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Location: {event.location} | Category: {event.category}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-800">You have not joined any events yet.</p>
              )}
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
};

export default Dashboard;