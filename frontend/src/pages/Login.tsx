import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../utils/api';

interface AxiosError {
  response?: {
    data: unknown;
  };
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const registrationSuccess = location.state?.registrationSuccess;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const response = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      // Navigate with a flag that login was successful
      navigate('/dashboard', { state: { loginSuccess: true } });
    } catch (error: unknown) {
      const err = error as AxiosError;
      if (err.response) {
        console.error('Login error:', err.response.data);
      } else if (error instanceof Error) {
        console.error('Login error:', error.message);
      } else {
        console.error('Login error:', error);
      }
      setErrorMsg('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col space-y-4 p-6 bg-white border rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {registrationSuccess && (
          <div className="text-green-600 text-center">
            Registration successful! Please login.
          </div>
        )}
        {errorMsg && <div className="text-red-500 text-center">{errorMsg}</div>}
        <input 
          className="border p-2 rounded" 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          className="border p-2 rounded" 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;