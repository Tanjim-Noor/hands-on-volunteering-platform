import API from './api';

// The login endpoint returns a token.
export interface AuthResponse {
  token: string;
}

// The user object returned by the register endpoint.
// Based on your Prisma User model, we expect properties such as:
// id, email, name, skills, causes, createdAt, and updatedAt.
// (Relationships like volunteerEvents, etc., are omitted for simplicity.)
export interface UserResponse {
  id: number;
  email: string;
  name?: string;
  skills?: string;
  causes?: string;
  createdAt: string;
  updatedAt: string;
}

// The register endpoint returns an object containing the new user.
export interface RegisterResponse {
  user: UserResponse;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>('/auth/login', { email, password });
  // Store token in localStorage (side effect)
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const register = async (userData: {
  email: string;
  password: string;
  name?: string;
  skills?: string;
  causes?: string;
}): Promise<RegisterResponse> => {
  const response = await API.post<RegisterResponse>('/auth/register', userData);
  return response.data;
};

export const logout = async (): Promise<void> => {
  // In the future, you can add an API call here to invalidate the session if needed.
  localStorage.removeItem('token');
};