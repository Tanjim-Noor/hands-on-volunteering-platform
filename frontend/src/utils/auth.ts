import API from './api';

// The login endpoint returns a token.
export interface AuthResponse {
  token: string;
}

// The user object returned by the register endpoint.
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
  
  localStorage.removeItem('token');
};