import React, { useEffect, useState, useCallback, FC } from "react";
import { Link } from "react-router-dom";
import { getMyTeams, getAvailableTeams, joinTeam } from "../utils/teams";
import { Team } from "../utils/teams";
import { useAuth } from "../context/AuthContext";

const TeamsOverview: FC = () => {
  const { isAuthenticated } = useAuth();
  const [myTeams, setMyTeams] = useState<Team[]>([]);
  const [availableTeams, setAvailableTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const fetchMyTeams = useCallback(async () => {
    if (!isAuthenticated) {
      setMyTeams([]);
      return;
    }
    try {
      const teams: Team[] = await getMyTeams();
      setMyTeams(teams);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to fetch your teams.");
    }
  }, [isAuthenticated]);

  const fetchAvailableTeams = useCallback(async () => {
    if (!isAuthenticated) {
      setAvailableTeams([]);
      return;
    }
    try {
      const teams: Team[] = await getAvailableTeams();
      setAvailableTeams(teams);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to fetch available teams.");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyTeams();
      fetchAvailableTeams();
    } else {
      setMyTeams([]);
      setAvailableTeams([]);
    }
  }, [fetchMyTeams, fetchAvailableTeams, isAuthenticated]);

  const handleJoin = async (teamId: number) => {
    try {
      await joinTeam(teamId);
      setSuccessMessage("Joined team successfully.");
      setError("");
      fetchMyTeams();
      fetchAvailableTeams();
    } catch (err: unknown) {
      console.error(err);
      const errorObj = err as { response?: { data?: { message?: string } } };
      setError(
        errorObj.response?.data?.message || "Failed to join team."
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Teams Overview
        </h1>

        {!isAuthenticated && (
          <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded text-center">
            Please <Link to="/login" className="font-bold text-blue-600 hover:underline">log in</Link> to access full team details.
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-200 border border-green-400 text-green-900 rounded">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-200 border border-red-400 text-red-900 rounded">
            {error}
          </div>
        )}

        {/* Create Team Link */}
        <div className="mb-6 text-center">
          <Link
            to="/teams/create"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          >
            Create Team
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">My Teams</h2>
          {myTeams.length === 0 ? (
            <p className="text-gray-900">You are not part of any team yet.</p>
          ) : (
            <ul className="space-y-4">
              {myTeams.map((team) => (
                <li key={team.id} className="border p-4 rounded bg-white shadow">
                  <h3 className="font-bold text-lg text-gray-900">{team.name}</h3>
                  <p className="text-gray-700">{team.description}</p>
                  <div className="mt-2">
                    <Link
                      to={`/teams/${team.id}/dashboard`}
                      className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                    >
                      View Dashboard
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Available Teams
          </h2>
          {availableTeams.length === 0 ? (
            <p className="text-gray-900">No teams available to join.</p>
          ) : (
            <ul className="space-y-4">
              {availableTeams.map((team) => (
                <li
                  key={team.id}
                  className="border p-4 rounded bg-white shadow flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {team.name}
                    </h3>
                    <p className="text-gray-700">{team.description}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {team.isPrivate ? "Private Team" : "Public Team"}
                    </p>
                  </div>
                  <div className="mt-4 self-end">
                    <button
                      onClick={() => handleJoin(team.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      Join
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
};

export default TeamsOverview;