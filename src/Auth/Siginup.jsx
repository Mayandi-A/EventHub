import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'attendee' // default role
  });

  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`http://localhost:3000/users?email=${formData.email}`);
      if (res.data.length > 0) {
        setError('Email already exists. Try logging in.');
        return;
      }

      await axios.post("http://localhost:3000/users", formData);
      navigate("/signin");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-purple-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Welcome</h1>
                <p className="text-indigo-100 mt-1">Create your new account</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="px-8 py-8">
            <div className="space-y-6">

              {error && <div className="text-red-500 text-sm text-center">{error}</div>}

              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Username"
                  className="w-full px-0 py-3 text-gray-800 bg-transparent border-0 border-b-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors duration-300 placeholder-gray-400"
                />
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ${focusedField === 'username' ? 'w-full' : 'w-0'}`}></div>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Email address"
                  className="w-full px-0 py-3 text-gray-800 bg-transparent border-0 border-b-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors duration-300 placeholder-gray-400"
                />
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ${focusedField === 'email' ? 'w-full' : 'w-0'}`}></div>
              </div>

              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Password"
                  className="w-full px-0 py-3 text-gray-800 bg-transparent border-0 border-b-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors duration-300 placeholder-gray-400"
                />
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ${focusedField === 'password' ? 'w-full' : 'w-0'}`}></div>
              </div>

              {/* Role Selector - Styled to match other inputs */}
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('role')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-0 py-3 text-gray-800 bg-transparent border-0 border-b-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                >
                  <option value="attendee">Attendee</option>
                  <option value="organizer">Organizer</option>
                </select>
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ${focusedField === 'role' ? 'w-full' : 'w-0'}`}></div>
                {/* Custom dropdown arrow */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Account
              </button>
            </div>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/signin" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}