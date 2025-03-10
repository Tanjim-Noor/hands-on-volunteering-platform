import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeamDashboard, updateTeamInvites } from '../utils/teams';
import { Team, TeamMember, TeamEvent } from '../utils/teams';

type TeamData = Team;

const TeamDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<TeamData | null>(null);
  const [error, setError] = useState<string>('');
  const [inviteEmails, setInviteEmails] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const navigate = useNavigate();

  const fetchTeamDashboard = useCallback(async () => {
    try {
      const data: TeamData = await getTeamDashboard(Number(id));
      setTeam(data);
    } catch (err: unknown) {
      console.error(err);
      const errorObj = err as { response?: { data?: { message?: string } } };
      setError(errorObj.response?.data?.message || 'Failed to fetch team dashboard.');
    }
  }, [id]);

  useEffect(() => {
    fetchTeamDashboard();
  }, [fetchTeamDashboard]);

  const handleInviteUpdate = async () => {
    try {
      const invites: string[] = inviteEmails
        .split(',')
        .map((email) => email.trim())
        .filter((email) => email !== '');
      await updateTeamInvites(Number(id), invites);
      setSuccessMessage('Invite list updated successfully.');
      setInviteEmails('');
      fetchTeamDashboard();
    } catch (err: unknown) {
      console.error(err);
      const errorObj = err as { response?: { data?: { message?: string } } };
      setError(errorObj.response?.data?.message || 'Failed to update invites');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        {error && (
          <div className="mb-4 p-3 bg-red-200 border border-red-400 text-red-900 rounded">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-200 border border-green-400 text-green-900 rounded">
            {successMessage}
          </div>
        )}
        {team && (
          <>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">{team.name}</h1>
            <p className="mb-4 text-gray-900">{team.description}</p>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Members</h2>
            <ul className="mb-6">
              {team.members.map((member: TeamMember) => (
                <li key={member.id} className="border p-2 rounded mb-2 text-gray-900">
                  {member.name || 'Unnamed User'} - {member.email}
                </li>
              ))}
            </ul>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Team Events</h2>
            <ul className="mb-6">
              {team.events.map((event: TeamEvent) => (
                <li key={event.id} className="border p-2 rounded mb-2 text-gray-900">
                  <h3 className="font-bold">{event.title}</h3>
                  <p>{event.description}</p>
                  <p>Date: {new Date(event.date).toLocaleString()}</p>
                  <p>Location: {event.location} | Category: {event.category}</p>
                </li>
              ))}
            </ul>
            {team.isPrivate && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                  Update Invite List
                </h2>
                <p className="mb-2 text-sm text-gray-900">
                  Enter comma separated emails of invitees.
                </p>
                <input
                  type="text"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2 text-gray-900"
                  placeholder="invite1@example.com, invite2@example.com"
                />
                <button onClick={handleInviteUpdate} className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded">
                  Update Invites
                </button>
              </div>
            )}
            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/teams/${team.id}/events/create`)}
                className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded"
              >
                Create Team Event
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default TeamDashboard;