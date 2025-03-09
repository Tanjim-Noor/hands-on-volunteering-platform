import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVolunteerEvent } from '../utils/volunteerEvents';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!title || !date || !location || !category) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      await createVolunteerEvent({ title, description, date, location, category });
      // On success, navigate to the Events page
      navigate('/events');
    } catch (err: unknown) {
      let errorMessage = 'An error occurred while creating the event. Please try again.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.error('Error creating event:', err);
      setError(errorMessage);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-lg">
        <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
        {error && (
          <div className="mb-4 p-3 bg-red-200 border border-red-400 text-red-800 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="title">
              Title*
            </label>
            <input
              id="title"
              type="text"
              className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="date">
              Date & Time*
            </label>
            <input
              id="date"
              type="datetime-local"
              className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="location">
              Location*
            </label>
            <input
              id="location"
              type="text"
              className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1" htmlFor="category">
              Category*
            </label>
            <input
              id="category"
              type="text"
              className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Create Event
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateEvent;