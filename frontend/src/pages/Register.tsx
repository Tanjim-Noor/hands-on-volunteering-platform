import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

interface AxiosError {
  response?: {
    data: unknown;
  };
}

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [causes, setCauses] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const response = await API.post('/auth/register', { email, password, name, skills, causes });
      console.log('User registered:', response.data.user);
      // Redirect to the login page with a success state
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (error: unknown) {
      const err = error as AxiosError;
      if (err.response) {
        console.error('Registration error:', err.response.data);
      } else if (error instanceof Error) {
        console.error('Registration error:', error.message);
      } else {
        console.error('Registration error:', error);
      }
      setErrorMsg('Registration failed. Please ensure the email is not already in use.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col space-y-4 p-6 bg-white border rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>
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
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Causes (comma separated)"
          value={causes}
          onChange={(e) => setCauses(e.target.value)}
        />
        <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;