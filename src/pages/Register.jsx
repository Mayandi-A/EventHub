import React, { useState } from 'react';
import { useUserContext } from '../context/UserProvider';
import axios from 'axios';

const Register = ({ isOpen, onClose, eventTitle }) => {
const {user} =useUserContext()
  const [formData, setFormData] = useState({
    event:eventTitle,
    username:user?.id,
    name: '',
    email: '',
    phone: '',
    mealPreference: 'vegetarian'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async() => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    await axios.post('http://localhost:3000/Booked',formData).then(
        res=> console.log('success')
    )
    setFormData({
        event:eventTitle,
        username: user?.id || '',
        name: '',
        email: '',
        phone: '',
        mealPreference: 'vegetarian'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0"
        onClick={onClose}
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(6px)'
        }}
      ></div>
      
      {/* Form Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 transform transition-all">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Register for Event</h2>
        <p className="text-gray-600 mb-6">{eventTitle}</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meal Preference
            </label>
            <select
              name="mealPreference"
              value={formData.mealPreference}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-Free</option>
              <option value="no-preference">No Preference</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="text-indigo-600 hover:text-indigo-800 font-medium relative overflow-hidden group/btn transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">Close</span>
              <div className="absolute inset-0 bg-indigo-50 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group/register"
            >
              <span className="relative z-10">Register Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-600 translate-x-full group-hover/register:translate-x-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;