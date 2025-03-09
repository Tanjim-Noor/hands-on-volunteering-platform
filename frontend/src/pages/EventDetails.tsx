import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VolunteerEvent, getVolunteerEventDetail } from '../utils/volunteerEvents';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<VolunteerEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const eventData = await getVolunteerEventDetail(parseInt(id));
          setEvent(eventData);
        } catch (err: unknown) {
          console.error('Error fetching event details:', err);
          setError('Failed to fetch event details.');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4 text-gray-800">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4 text-red-500">{error}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">Back</button>
        {event && (
          <div className="bg-white p-6 rounded shadow-md text-gray-800">
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            <p className="mb-2">{event.description || 'No description available.'}</p>
            <p className="text-sm text-gray-600 mb-2">Date: {new Date(event.date).toLocaleString()}</p>
            <p className="text-sm text-gray-600 mb-2">Location: {event.location}</p>
            <p className="text-sm text-gray-600 mb-4">Category: {event.category}</p>
            <h2 className="text-2xl font-semibold mb-2">Attendees:</h2>
            {event.attendees && event.attendees.length > 0 ? (
              <ul className="list-disc pl-6">
                {event.attendees.map((attendee) => (
                  <li key={attendee.id} className="mb-1">
                    <span className="font-bold">{attendee.name || 'N/A'}</span> ({attendee.email})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No attendees yet.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default EventDetails;