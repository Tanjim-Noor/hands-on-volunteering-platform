import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as auth from '../utils/auth';

interface AxiosError {
  response?: { data: unknown };
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated } = useAuth();

  const registrationSuccess = location.state?.registrationSuccess;
  const loginAlert = location.state?.alert; // Check for alert message passed via PrivateRoute

  const [touched, setTouched] = useState({ email: false, password: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await auth.login(email, password);
      setIsAuthenticated(true);
      navigate('/dashboard', { state: { loginSuccess: true } });
    } catch (error: unknown) {
      const err = error as AxiosError;
      console.error('Login error:', err.response || error);
      setErrorMsg('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <main className="flex items-center justify-center py-12 px-4 min-h-[calc(100vh-64px)] bg-gray-100">
      <section className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        {loginAlert && (
          <div className="mb-4 p-3 bg-yellow-200 border border-yellow-400 text-yellow-800 rounded flex justify-between items-center">
            <span>{loginAlert}</span>
          </div>
        )}
        {registrationSuccess && (
          <div className="mb-4 p-3 bg-green-200 border border-green-400 text-green-800 rounded flex justify-between items-center">
            <span>Registration successful! Please login.</span>
            <button
              onClick={() => {}}
              aria-label="Dismiss notification"
              className="text-green-800 font-bold"
            >
              ×
            </button>
          </div>
        )}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-200 border border-red-400 text-red-800 rounded">
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
              onChange={(e) => setEmail(e.target.value)}
              className={`border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900 ${
                touched.email && !email ? 'border-red-500' : ''
              }`}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
              onChange={(e) => setPassword(e.target.value)}
              className={`border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900 ${
                touched.password && !password ? 'border-red-500' : ''
              }`}
              required
            />
          </div>
          <button className="btn btn-secondary w-full" type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;