import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCommunityRequest } from '../utils/communityRequests';

const CreateCommunityRequest = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('low');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !urgency) {
      setError('Both title and urgency are required.');
      return;
    }

    try {
      await createCommunityRequest({ title, description, urgency });
      navigate('/community-requests');
    } catch (error: unknown) {
      console.error(error);
      setError('Error creating the community help request. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 max-w-lg">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Create Community Help Request</h1>
          <p className="text-gray-600 mt-2">Fill in the details below to ask for help from the community.</p>
        </header>
        {error && (
          <div className="mb-6 p-4 bg-red-200 border border-red-400 text-red-800 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded px-8 py-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title*</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
              placeholder="Enter request title"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
              placeholder="Provide additional details (optional)"
              rows={4}
            ></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="urgency" className="block text-gray-700 font-semibold mb-2">Urgency*</label>
            <select
              id="urgency"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
              required
            >
              <option className="text-gray-900" value="low">Low</option>
              <option className="text-gray-900" value="medium">Medium</option>
              <option className="text-gray-900" value="urgent">Urgent</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateCommunityRequest;