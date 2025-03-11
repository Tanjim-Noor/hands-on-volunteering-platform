// frontend/src/utils/volunteerEvents.ts

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

export const getVolunteerEvents = async (filters?: {
  category?: string;
  location?: string;
  date?: string;
}): Promise<VolunteerEvent[]> => {
  let query = '';
  if (filters) {
    const queryParams = new URLSearchParams();
    // Only add non-empty filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim()) {
        queryParams.append(key, value);
      }
    });
    query = queryParams.toString() ? `?${queryParams.toString()}` : '';
  }
  const response = await API.get<VolunteerEvent[]>(`/events${query}`);
  return response.data;
};

export const joinVolunteerEvent = async (eventId: number): Promise<VolunteerEvent> => {
  const response = await API.post<VolunteerEvent>(`/events/${eventId}/join`);
  return response.data;
};

export const createVolunteerEvent = async (eventData: {
  title: string;
  description?: string;
  date: string;
  location: string;
  category: string;
}): Promise<VolunteerEvent> => {
  const response = await API.post<VolunteerEvent>('/events', eventData);
  return response.data;
};

export const getVolunteerEventDetail = async (eventId: number): Promise<VolunteerEvent> => {
  const response = await API.get<VolunteerEvent>(`/events/${eventId}`);
  return response.data;
};