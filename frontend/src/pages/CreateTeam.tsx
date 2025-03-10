import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTeam } from '../utils/teams';

const CreateTeam = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [inviteEmails, setInviteEmails] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      // Split inviteEmails by comma and trim, only if team is private
      let invites: string[] | undefined = undefined;
      if (isPrivate && inviteEmails.trim() !== '') {
        invites = inviteEmails.split(',').map((email) => email.trim());
      }
      const team = await createTeam({ name, description, isPrivate, invites });
      // Navigate to team dashboard after creation
      navigate(`/teams/${team.id}/dashboard`);
    } catch (err: unknown) {
      console.error(err);
      const errorObj = err as { response?: { data?: { message?: string } } };
      setError(errorObj.response?.data?.message || 'Failed to create team.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Create Team
        </h1>
        {error && (
          <div className="mb-4 p-3 bg-red-200 border border-red-400 text-red-800 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded px-8 py-6">
          <div className="mb-4">
            <label htmlFor="teamName" className="block text-gray-900 mb-2">
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-900 mb-2">
              Team Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
              rows={3}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-900 mb-2">Team Type</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center text-gray-900">
                <input
                  type="radio"
                  name="teamType"
                  checked={!isPrivate}
                  onChange={() => setIsPrivate(false)}
                />
                <span className="ml-2">Public</span>
              </label>
              <label className="flex items-center text-gray-900">
                <input
                  type="radio"
                  name="teamType"
                  checked={isPrivate}
                  onChange={() => setIsPrivate(true)}
                />
                <span className="ml-2">Private</span>
              </label>
            </div>
          </div>
          {isPrivate && (
            <div className="mb-4">
              <label htmlFor="inviteEmails" className="block text-gray-900 mb-2">
                Invite Emails (comma separated)
              </label>
              <input
                id="inviteEmails"
                type="text"
                value={inviteEmails}
                onChange={(e) => setInviteEmails(e.target.value)}
                placeholder="example1@mail.com, example2@mail.com"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
              />
            </div>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
            >
              Create Team
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateTeam;