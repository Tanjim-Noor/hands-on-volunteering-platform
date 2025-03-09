import { useEffect, useState } from 'react';
import { CommunityRequest, getCommunityRequests } from '../utils/communityRequests';
import { Link } from 'react-router-dom';

const CommunityHelpRequests = () => {
  const [requests, setRequests] = useState<CommunityRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getCommunityRequests();
        setRequests(data);
      } catch (error: unknown) {
        console.error(error);
        setError('Error fetching community help requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Community Help Requests</h1>
          <p className="text-lg text-gray-600">
            Browse current requests for help and offer your assistance
          </p>
        </header>
        <div className="flex justify-center mb-6">
          <Link
            to="/community-requests/create"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          >
            Create New Request
          </Link>
        </div>
        {loading && (
          <div className="text-center text-gray-700 text-lg">Loading help requests...</div>
        )}
        {error && (
          <div className="text-center text-red-600 font-semibold">{error}</div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests.map(request => (
              <div key={request.id} className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{request.title}</h2>
                <p className="text-gray-700 mb-3">
                  {request.description ? request.description : 'No detailed description provided.'}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Urgency:</span> {request.urgency}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-semibold">Posted by:</span> {request.createdBy.name || request.createdBy.email}
                </p>
                <Link
                  to={`/community-requests/${request.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Details &amp; Comments
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default CommunityHelpRequests;