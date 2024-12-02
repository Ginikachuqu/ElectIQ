import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const ElectionLoginForm = () => {
  const [email, setEmail] = useState('');
  const [matriculationNumber, setMatriculationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !matriculationNumber || !password) {
      setError('All fields are required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Matriculation number validation (assuming it's numeric and 8 digits)
    const matriculationRegex = /^\d{8}$/;
    if (!matriculationRegex.test(matriculationNumber)) {
      setError('Matriculation number must be 8 digits');
      return;
    }

    // Password strength validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // If all validations pass, you would typically send this to your backend
    console.log('Login attempt', { email, matriculationNumber });
    // Reset form or handle successful login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Election Webapp Login
        </h2>
        
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center">
            <AlertCircle className="mr-3 text-red-500" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="email" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@university.edu"
              required
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="matriculation" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Matriculation Number
            </label>
            <input
              type="text"
              id="matriculation"
              value={matriculationNumber}
              onChange={(e) => setMatriculationNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="12345678"
              required
            />
          </div>

          <div className="mb-6">
            <label 
              htmlFor="password" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default ElectionLoginForm;
