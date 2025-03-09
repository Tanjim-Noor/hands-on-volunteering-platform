import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CommunityRequest, getCommunityRequestDetail } from '../utils/communityRequests';

const CommunityRequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<CommunityRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchRequest = async () => {
        try {
          const data = await getCommunityRequestDetail(parseInt(id));
          setRequest(data);
        } catch (error: unknown) {
          console.error(error);
          setError('Failed to fetch the community request details.');
        } finally {
          setLoading(false);
        }
      };
      fetchRequest();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700">Loading request details...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">{error}</p>
          <Link to="/community-requests" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Community Requests
          </Link>
        </div>
      </main>
    );
  }

  if (!request) {
    return (
      <main className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700">No community request found.</p>
          <Link to="/community-requests" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Community Requests
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="mb-6">
          <Link to="/community-requests" className="text-blue-600 hover:underline">
            ← Back to Community Requests
          </Link>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{request.title}</h1>
          <p className="text-gray-700 mb-4">{request.description || 'No description provided.'}</p>
          <p className="mb-2">
            <span className="font-semibold">Urgency:</span> <span className="text-gray-800">{request.urgency}</span>
          </p>
          <p className="mb-4">
            <span className="font-semibold">Posted by:</span> {request.createdBy.name || request.createdBy.email}
          </p>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
            {request.comments.length === 0 ? (
              <p className="text-gray-600">No comments yet.</p>
            ) : (
              <ul className="space-y-4">
                {request.comments.map((comment) => (
                  <li key={comment.id} className="border p-4 rounded bg-gray-50">
                    <p className="text-gray-700 mb-2">{comment.text}</p>
                    <p className="text-sm text-gray-600">
                      - {comment.author.name || comment.author.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CommunityRequestDetail;