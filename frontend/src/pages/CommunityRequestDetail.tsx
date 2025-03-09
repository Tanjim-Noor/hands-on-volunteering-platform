import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CommunityRequest, getCommunityRequestDetail, createComment } from '../utils/communityRequests';

const CommunityRequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<CommunityRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');

  const fetchRequestDetail = async () => {
    try {
      if (id) {
        const data = await getCommunityRequestDetail(parseInt(id));
        setRequest(data);
      }
    } catch (error: unknown) {
      console.error(error);
      setError('Failed to fetch the community request details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestDetail();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommentError('');
    if (!commentText.trim() || !id) return;
    try {
      const newComment = await createComment(parseInt(id), commentText);
      // Append new comment to existing comments if request exists
      if (request) {
        setRequest({ ...request, comments: [...request.comments, newComment] });
      }
      setCommentText('');
    } catch (error: unknown) {
      console.error(error);
      setCommentError('Failed to add comment.');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-800">Loading request details...</p>
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
          <p className="text-gray-800">No community request found.</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{request.title}</h1>
          <p className="text-gray-800 mb-4">{request.description || 'No description provided.'}</p>
          <p className="mb-2">
            <span className="font-semibold text-gray-900">Urgency:</span> <span className="text-gray-900">{request.urgency}</span>
          </p>
          <p className="mb-4">
            <span className="font-semibold text-gray-900">Posted by:</span> <span className="text-gray-900">{request.createdBy.name || request.createdBy.email}</span>
          </p>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h2>
            {request.comments.length === 0 ? (
              <p className="text-gray-700">No comments yet.</p>
            ) : (
              <ul className="space-y-4">
                {request.comments.map((comment) => (
                  <li key={comment.id} className="border p-4 rounded bg-gray-50">
                    <p className="text-gray-800 mb-2">{comment.text}</p>
                    <p className="text-sm text-gray-700">
                      - {comment.author.name || comment.author.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <form onSubmit={handleCommentSubmit} className="mt-6">
              <label htmlFor="comment" className="block text-gray-900 font-semibold mb-2">
                Add a Comment
              </label>
              <textarea
                id="comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
                rows={3}
                placeholder="Write your comment here..."
                required
              ></textarea>
              {commentError && (
                <p className="text-red-600 mt-2">{commentError}</p>
              )}
              <div className="flex justify-center mt-4">
                <button type="submit" className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors">
                  Submit Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CommunityRequestDetail;