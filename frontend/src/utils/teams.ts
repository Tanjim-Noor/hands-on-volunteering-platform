import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust if needed

// Helper function: set auth headers from localStorage token
const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
});

export interface TeamMember {
  id: number;
  name?: string;
  email: string;
}

export interface TeamEvent {
  id: number;
  title: string;
  description?: string;
  date: string;
  location: string;
  category: string;
}

export interface TeamInvite {
  id: number;
  email: string;
}

export interface Team {
  id: number;
  name: string;
  description?: string;
  isPrivate: boolean;
  createdAt: string;
  members: TeamMember[];
  events: TeamEvent[];
  invites: TeamInvite[];
}

export interface TeamEventData {
  title: string;
  description?: string;
  date: string;
  location: string;
  category: string;
}

// Create a team
export const createTeam = async (data: {
  name: string;
  description: string;
  isPrivate: boolean;
  invites?: string[];
}): Promise<Team> => {
  const response: AxiosResponse<Team> = await axios.post(`${API_URL}/teams`, data, authHeader());
  return response.data;
};

// Update team invites
export const updateTeamInvites = async (teamId: number, invites: string[]): Promise<{ message: string }> => {
  const response: AxiosResponse<{ message: string }> = await axios.put(
    `${API_URL}/teams/${teamId}/invites`,
    { invites },
    authHeader()
  );
  return response.data;
};

// Join a team
export const joinTeam = async (teamId: number): Promise<{ message: string }> => {
  const response: AxiosResponse<{ message: string }> = await axios.post(
    `${API_URL}/teams/${teamId}/join`,
    {},
    authHeader()
  );
  return response.data;
};

// Get team dashboard
export const getTeamDashboard = async (teamId: number): Promise<Team> => {
  const response: AxiosResponse<Team> = await axios.get(`${API_URL}/teams/${teamId}/dashboard`, authHeader());
  return response.data;
};

// Get teams that the current user is a member of
export const getMyTeams = async (): Promise<Team[]> => {
  const response: AxiosResponse<Team[]> = await axios.get(`${API_URL}/teams/my`, authHeader());
  return response.data;
};

// Get teams available for joining (teams where the user is NOT a member)
export const getAvailableTeams = async (): Promise<Team[]> => {
    const response: AxiosResponse<Team[]> = await axios.get(`${API_URL}/teams/available`, authHeader());
    return response.data;
  };

// Create an event for a team
export const createTeamEvent = async (teamId: number, eventData: TeamEventData): Promise<TeamEvent> => {
  const response: AxiosResponse<TeamEvent> = await axios.post(
    `${API_URL}/teams/${teamId}/events`,
    eventData,
    authHeader()
  );
  return response.data;
};