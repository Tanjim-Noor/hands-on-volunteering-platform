import API from './api';

export interface VolunteerEvent {
  id: number;
  title: string;
  description: string | null;
  date: string;
  location: string;
  category: string;
  createdBy: {
    id: number;
    name: string | null;
    email: string;
  };
  attendees: Array<{
    id: number;
    name: string | null;
    email: string;
  }>;
}

// Fetch all volunteer events (public)
export const getVolunteerEvents = async (): Promise<VolunteerEvent[]> => {
  const response = await API.get<VolunteerEvent[]>('/events');
  return response.data;
};