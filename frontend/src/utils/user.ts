import API from './api';

export interface User {
  id: number;
  email: string;
  name?: string;
  skills?: string;
  causes?: string;
  createdAt: string;
  updatedAt: string;
  attendedEvents: Array<{
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
  }>;
}

export const getCurrentUser = async (): Promise<User> => {
  const response = await API.get<User>('/users/me');
  return response.data;
};