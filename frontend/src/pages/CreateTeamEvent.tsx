import { useState, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createTeamEvent } from '../utils/teams';

const CreateTeamEvent = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!title || !date || !location || !category) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      await createTeamEvent(Number(id), { title, description, date, location, category });
      navigate(`/teams/${id}/dashboard`);
    } catch (err: unknown) {
      console.error(err);
      const errorObj = err as { response?: { data?: { message?: string } } };
      setError(errorObj.response?.data?.message || 'Failed to create team event.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Create Team Event
        </h1>
        {error && (
          <div className="mb-4 p-3 bg-red-200 border border-red-400 text-red-900 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded px-8 py-6">
          <div className="mb-4">
            <label htmlFor="eventTitle" className="block text-gray-900 mb-2">
              Event Title
            </label>
            <input
              id="eventTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventDescription" className="block text-gray-900 mb-2">
              Event Description
            </label>
            <textarea
              id="eventDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
              rows={3}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="eventDate" className="block text-gray-900 mb-2">
              Date &amp; Time
            </label>
            <input
              id="eventDate"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventLocation" className="block text-gray-900 mb-2">
              Location
            </label>
            <input
              id="eventLocation"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="eventCategory" className="block text-gray-900 mb-2">
              Category
            </label>
            <input
              id="eventCategory"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateTeamEvent;