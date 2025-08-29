import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/UserProvider';

export default function ViewAttendees({ isOpen, onClose, event }) {
  const { token } = useUserContext();
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && event) fetchAttendees();
  }, [isOpen, event]);

  const fetchAttendees = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`http://localhost:4000/events/${event._id}/attendees`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendees(res.data);
    } catch (err) {
      setError('Failed to load attendees');
      console.error('Error fetching attendees:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMealPreferenceColor = (preference) => {
    switch (preference?.toLowerCase()) {
      case 'vegetarian': return 'bg-green-100 text-green-800';
      case 'vegan': return 'bg-emerald-100 text-emerald-800';
      case 'non-vegetarian': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0"
        onClick={onClose}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(6px)'
        }}
      ></div>

      <div className="relative bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden z-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Event Attendees</h2>
            <p className="text-indigo-100 mt-1">{event?.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold transform hover:scale-110 transition-all duration-200"
          >
            ×
          </button>
        </div>

        {/* Count */}
        <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{attendees.length}</span> attendees registered
            {event?.capacity && (
              <span className="ml-2">
                / <span className="font-semibold">{event.capacity}</span> capacity
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <span className="ml-4 text-gray-600">Loading attendees...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 text-xl mb-4">⚠️</div>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchAttendees}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : attendees.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No attendees yet</h3>
              <p className="text-gray-500">Attendees will appear here once they register for the event.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendees.map((attendee, index) => (
                    <tr key={attendee._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{attendee.username}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{attendee.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{attendee.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
