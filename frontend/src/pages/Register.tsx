import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';

interface AxiosError {
  response?: { data: unknown };
}

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [causes, setCauses] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const [touched, setTouched] = useState({ email: false, password: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await auth.register({ email, password, name, skills, causes });
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (error: unknown) {
      const err = error as AxiosError;
      console.error('Registration error:', err.response || error);
      setErrorMsg('Registration failed. Please ensure the email is not already in use.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <section className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-200 border border-red-400 text-red-800 rounded">
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              className={`border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-300 ${touched.email && !email ? 'border-red-500' : ''}`}
              type="email"
              value={email}
              onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              className={`border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-300 ${touched.password && !password ? 'border-red-500' : ''}`}
              type="password"
              value={password}
              onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-300"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="skills">Skills</label>
            <input
              id="skills"
              className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-300"
              type="text"
              placeholder="Comma separated skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1" htmlFor="causes">Causes</label>
            <input
              id="causes"
              className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-300"
              type="text"
              placeholder="Comma separated causes"
              value={causes}
              onChange={(e) => setCauses(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary w-full" type="submit">
            Register
          </button>
        </form>
      </section>
    </main>
  );
};

export default Register;