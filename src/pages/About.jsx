import React, { useState } from 'react';
import { User, Mail, Shield, LogOut, CheckCircle } from 'lucide-react';
import { useUserContext } from '../context/UserProvider';

const About = () => {
    const {user,logout} = useUserContext()
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const handleLogout = () => {
      setIsLoggingOut(true);
      setTimeout(() => {
        setIsLoggingOut(false);
        logout()
      }, 2000);
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full transform hover:scale-105 transition-transform duration-300">
        
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <User className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center">Account Information</h1>
        </div>

        
        <div className="p-6 space-y-4">
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="bg-indigo-100 p-2 rounded-full">
              <User className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Username</p>
              <p className="text-gray-800 font-semibold">{user.username}</p>
            </div>
          </div>

          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="bg-blue-100 p-2 rounded-full">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Email</p>
              <p className="text-gray-800 font-semibold">{user.email}</p>
            </div>
          </div>

          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="bg-purple-100 p-2 rounded-full">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Role</p>
              <p className="text-gray-800 font-semibold capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        
        <div className="p-6 pt-0">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
              isLoggingOut 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700 hover:shadow-lg'
            }`}
          >
            {isLoggingOut ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Logging out...</span>
              </>
            ) : (
              <>
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </>
            )}
          </button>
        </div>

        
        <div className="bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-600">
            Make sure to save your work before logging out
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;