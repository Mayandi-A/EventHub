import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/UserProvider'

export default function Signin() {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const {user,addUser,logout}=useUserContext()
    
    const [formData,setFormData]=useState({username:"",email:"",password:""})
    const handleInputChange=(e)=>{
        e.preventDefault()
        setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const navigate=useNavigate()
    const [focusedField, setFocusedField] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:4000/users/login', {
            email: formData.email,
            password: formData.password,
          });
          addUser(res.data.user, res.data.token); // Save both to context/localStorage
          setShouldRedirect(true);
        } catch (err) {
          console.error('Error response:', err.response);
          alert(err.response?.data?.message || "Invalid credentials or server error");
        }

};



    useEffect(() => {
    if (shouldRedirect && user?.username) {
        navigate('/');
    }
    }, [shouldRedirect, user]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-purple-50 to-blue-50 flex items-center justify-center p-6">
      {/* Main Container */}
      <div className="w-full max-w-lg">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Form Card */}
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Header Section */}
          <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                <p className="text-indigo-100 mt-1">Sign in to your account</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            <div className="space-y-6">
              {/* Email Field */}
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

              {/* Password Field */}
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                  <span className="ml-2 text-gray-600">Remember me</span>
                </div>
                <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200">
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}