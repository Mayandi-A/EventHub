import React from 'react';

const ViewDetails = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl z-10"
        >
          ×
        </button>

        {/* Event Image */}
        <div className="relative h-48 sm:h-64">
          <img
            src={event.image || 'https://placehold.co/800x400'}
            alt={event.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          {event.isFeatured && (
            <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800 pr-4">{event.title}</h2>
            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded font-medium">
              {event.price || 'Free'}
            </span>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {event.description}
          </p>

          {/* Event Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Detail icon="📅" label="Date" value={event.date} />
            <Detail icon="🕐" label="Time" value={event.time} />
            <Detail icon="📍" label="Location" value={event.location} />
            <Detail icon="👥" label="Capacity" value={event.capacity || '200 attendees'} />
          </div>

          {/* About This Event */}
          {event.aboutEvent && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">About This Event</h3>
              <p className="text-gray-600 leading-relaxed">{event.aboutEvent}</p>
            </div>
          )}

          {/* What's Included */}
          {event.whatsIncluded?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What's Included</h3>
              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                {event.whatsIncluded.map((item, i) => (
                  <li key={i}> {item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Schedule Overview */}
          {event.schedule?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Schedule Overview</h3>
              <div className="text-gray-600 space-y-2">
                {event.schedule.map((item, i) => (
                  <div className="flex justify-between" key={i}>
                    <span>{item.time}</span>
                    <span>{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="text-indigo-600 hover:text-indigo-800 font-medium relative overflow-hidden group/btn transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">Close</span>
              <div className="absolute inset-0 bg-indigo-50 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

            <button
              onClick={onClose}
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

// Subcomponent for icon + label + value
const Detail = ({ icon, label, value }) => (
  <div className="flex items-center text-gray-700">
    <span className="mr-3 text-lg">{icon}</span>
    <div>
      <span className="font-medium">{label}:</span>
      <span className="ml-2">{value}</span>
    </div>
  </div>
);

export default ViewDetails;
