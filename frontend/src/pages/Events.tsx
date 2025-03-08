import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVolunteerEvents, VolunteerEvent } from '../utils/volunteerEvents';

const Events = () => {
  const [events, setEvents] = useState<VolunteerEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    try {
      const eventsData = await getVolunteerEvents();
      setEvents(eventsData);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">Volunteer Events</h1>
        {loading && <p>Loading events...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event.id} className="card">
              <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
              <p className="mb-2">{event.description}</p>
              <p className="text-sm text-gray-600">
                Date: {new Date(event.date).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Location: {event.location}</p>
              <p className="text-sm text-gray-600">Category: {event.category}</p>
              <div className="mt-4">
                {localStorage.getItem('token') ? (
                  <button className="btn btn-primary" onClick={() => alert('Joining event functionality will be implemented soon!')}>
                    Join Event
                  </button>
                ) : (
                  <Link to="/login" className="btn btn-secondary">
                    Login to Join
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Events;