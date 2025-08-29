import React, { useState, useEffect } from 'react';
import ViewAttendees from '../components/ViewAttendees';
import CreateEventForm from '../components/CreateEventForm';
import axios from 'axios';
import { useUserContext } from '../context/UserProvider';
import { Edit, Trash2 } from "lucide-react";

export default function MyEvents() {
  const [showViewAttendees, setShowViewAttendees] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const { user, token } = useUserContext();
  const [myEvents, setMyEvents] = useState([]);
  const [isDeleting, setIsDeleting] = useState(null);

  // Format date (YYYY-MM-DD)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  // Check if event is finished
  const isEventFinished = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  // Fetch events for the logged-in user
  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await axios.get('http://localhost:4000/events/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyEvents(res.data);
      } catch (error) {
        console.error('Error fetching my events', error);
      }
    };

    if (user?.id) fetchMyEvents();
  }, [user, token ,editingEvent ]);

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setShowCreateForm(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowCreateForm(true);
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(eventId);

    setTimeout(async () => {
      try {
        await axios.delete(`http://localhost:4000/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMyEvents((prev) => prev.filter((event) => event._id !== eventId));
      } catch (error) {
        console.error("Error deleting event:", error);
        alert(error.response?.data?.message || "Failed to delete event.");
      } finally {
        setIsDeleting(null);
      }
    }, 2500); // 👈 delay in ms
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
    setEditingEvent(null);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      if (editingEvent) {
        // Update existing event
        const response = await axios.put(
          `http://localhost:4000/events/${editingEvent._id}`,
          eventData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMyEvents((prev) =>
          prev.map((event) =>
            event._id === editingEvent._id ? response.data : event
          )
        );
      } else {
        // Create new event
        const response = await axios.post(
          'http://localhost:4000/events',
          eventData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMyEvents((prev) => [...prev, response.data]);
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          `Failed to ${editingEvent ? 'update' : 'create'} event.`
      );
    }
  };

  const handleViewAttendees = (event) => {
    setSelectedEvent(event);
    setShowViewAttendees(true);
  };

  const handleCloseAttendees = () => {
    setShowViewAttendees(false);
    setSelectedEvent(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Events</h1>
          <p className="text-gray-600 mt-2">Manage your created events</p>
        </div>

        <button
          onClick={handleCreateEvent}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group/create"
        >
          <span className="relative z-10">Create Event</span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-600 translate-x-full group-hover/create:translate-x-0 transition-transform duration-300"></div>
        </button>
      </div>

      {/* Event Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {myEvents.length > 0 ? (
          myEvents.map((event, index) => (
            <div
              key={event._id || `event-${index}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 transform group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image || 'https://placehold.co/600x300'}
                  alt={event.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Edit */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditEvent(event);
                    }}
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                    title="Edit Event"
                  >
                    <Edit size={16} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteEvent(event._id);
                    }}
                    disabled={isDeleting === event._id}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete Event"
                  >
                    {isDeleting === event._id ? (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>

                {/* Featured Badge */}
                {event.isFeatured && (
                  <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Featured
                  </div>
                )}

                {/* Finished Badge */}
                {isEventFinished(event.date) && (
                  <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ended
                  </div>
                )}
              </div>

              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                    {event.title}
                  </h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded transform scale-95 group-hover:scale-100 transition-transform duration-300">
                    {event.price || 'Free'}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-700 transition-colors duration-300">
                  {event.description}
                </p>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span className="mr-2">📅</span>
                  <span className="group-hover:text-gray-700 transition-colors duration-300">
                    {formatDate(event.date)}
                  </span>
                  <span className="ml-4 mr-2">🕐</span>
                  <span className="group-hover:text-gray-700 transition-colors duration-300">
                    {event.time}
                  </span>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-6">
                  <span className="mr-2">📍</span>
                  <span className="group-hover:text-gray-700 transition-colors duration-300">
                    {event.location}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleViewAttendees(event)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group/attendees flex-1"
                  >
                    View Attendees
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditEvent(event);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex-shrink-0"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteEvent(event._id);
                    }}
                    disabled={isDeleting === event._id}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting === event._id ? (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Empty state
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No events created yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first event to get started!
            </p>
            <button
              onClick={handleCreateEvent}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Create Your First Event
            </button>
          </div>
        )}
      </div>

      {/* Create/Edit Event Form */}
      <CreateEventForm
        isOpen={showCreateForm}
        onClose={handleCloseCreateForm}
        onSave={handleSaveEvent}
        editingEvent={editingEvent}
      />

      {/* View Attendees Modal */}
      {selectedEvent && (
        <ViewAttendees
          isOpen={showViewAttendees}
          onClose={handleCloseAttendees}
          event={selectedEvent}
        />
      )}
    </div>
  );
}
