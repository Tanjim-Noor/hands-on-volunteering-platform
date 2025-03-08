import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVolunteerEvents, joinVolunteerEvent, VolunteerEvent } from '../utils/volunteerEvents';

const Events = () => {
  const [events, setEvents] = useState<VolunteerEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    startDate: '',
    endDate: ''
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const eventsData = await getVolunteerEvents(filters);
      setEvents(eventsData);
    } catch (fetchError) {
      console.error("Error fetching events", fetchError);
      setError("Failed to fetch events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = async () => {
    await fetchEvents();
  };

  const handleJoinEvent = async (eventId: number) => {
    try {
      await joinVolunteerEvent(eventId);
      alert('You have successfully joined the event!');
      // Refresh events to show updated attendee lists if needed.
      fetchEvents();
    } catch (joinError) {
      console.error("Error joining event:", joinError);
      alert('Failed to join the event. You might have already joined or an error occurred.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">Volunteer Events</h1>

        {/* Filter Controls */}
        <div className="mb-4 flex flex-wrap gap-4">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={filters.category}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <button className="btn btn-primary" onClick={applyFilters}>Apply Filters</button>
        </div>

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
                  <button className="btn btn-primary" onClick={() => handleJoinEvent(event.id)}>
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