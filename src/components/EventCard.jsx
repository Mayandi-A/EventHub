import React from 'react';
import { useState } from 'react';
import Register from '../pages/Register'
import ViewDetails from '../pages/ViewDetails';
import { useUserContext } from '../context/UserProvider';
const EventCard = ({event}) => {
  const {user}=useUserContext()
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showViewDetails, setShowViewDetails] = useState(false);

  const handleRegisterClick = () => {
    setShowRegistrationForm(true);
    // console.log(user)
  };

  const handleViewDetailsClick = () => {
    setShowViewDetails(true);
  };

  const handleCloseForm = () => {
    setShowRegistrationForm(false);
  };

  const handleCloseDetails = () => {
    setShowViewDetails(false);
  };
  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 transform group cursor-pointer">
        <div className="relative overflow-hidden">
          <img
            src="https://placehold.co/600x300"
            alt="Tech conference with stage and audience listening to speaker presentation"
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-100">
            {event.isFeatured ? "Featured" : ""}
          </div>
        </div>
        
        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
              {event.title}
            </h3>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded transform scale-95 group-hover:scale-100 transition-transform duration-300">
              {event.price}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-700 transition-colors duration-300">
            {event.description}
          </p>
          
          <div className="flex items-center text-gray-500 text-sm mb-4 transform translate-x-1 duration-300 delay-75">
            <span className="mr-2 transform duration-300">📅</span>
            <span className="group-hover:text-gray-700 transition-colors duration-300">{event.date}</span>
            <span className="ml-4 mr-2 transform duration-300">🕐</span>
            <span className="group-hover:text-gray-700 transition-colors duration-300">{event.time}</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm mb-6 transform translate-x-1 duration-300 delay-100">
            <span className="mr-2 transform duration-300">📍</span>
            <span className="group-hover:text-gray-700 transition-colors duration-300">{event.location}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={handleViewDetailsClick}
              className="text-indigo-600 hover:text-indigo-800 font-medium relative overflow-hidden group/btn transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">View Details</span>
              <div className="absolute inset-0 bg-indigo-50 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button
              onClick={handleRegisterClick}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group/register"
            >
              <span className="relative z-10">Register Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-600 translate-x-full group-hover/register:translate-x-0 transition-transform duration-300"></div>
            </button>
          </div>
          {/* hover:-translate-y-2 hover:scale-105  
          group-hover:scale-110 transition-transform
          group-hover:scale-110 transition-transform
          group-hover:scale-110 transition-transform

          group-hover:translate-x-0 transition-transform
          group-hover:translate-x-0 transition-transform
          */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 transform translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-700 transform -translate-x-8 translate-y-8"></div>
        </div>
      </div>
      
      <ViewDetails 
        isOpen={showViewDetails}
        onClose={handleCloseDetails}
        event={event}
      />
      <Register
        isOpen={showRegistrationForm}
        onClose={handleCloseForm}
        eventTitle={event.title}
      />
    </>
  );
};

export default EventCard;
