import API from './api';

export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  author: {
    id: number;
    name?: string;
    email: string;
  }
}

export interface CommunityRequest {
  id: number;
  title: string;
  description?: string;
  urgency: string;
  createdBy: {
    id: number;
    name?: string;
    email: string;
  };
  comments: Comment[];
}

export const getCommunityRequests = async (): Promise<CommunityRequest[]> => {
  const response = await API.get<CommunityRequest[]>('/community-requests');
  return response.data;
};

export const getCommunityRequestDetail = async (id: number): Promise<CommunityRequest> => {
  const response = await API.get<CommunityRequest>(`/community-requests/${id}`);
  return response.data;
};

export const createCommunityRequest = async (data: {
  title: string;
  description?: string;
  urgency: string;
}): Promise<CommunityRequest> => {
  const response = await API.post<CommunityRequest>('/community-requests', data);
  return response.data;
};