import React, { useState,useEffect } from 'react'
import ViewAttendees from '../components/ViewAttendees'
import CreateEventForm from '../components/CreateEventForm'
import axios from 'axios'
import { useUserContext } from '../context/UserProvider'

export default function MyEvents() {
  const [showViewAttendees, setShowViewAttendees] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const {user}=useUserContext()
  const [myEvents,setMyEvents] = useState([])
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/events?username=${user?.id}`);
        setMyEvents(res.data);
      } catch (error) {
        console.error("Error fetching tickets", error);
      }
    };

    if (user?.id) fetchBookings();
  }, [user]);

  const handleCreateEvent = () => {
    setShowCreateForm(true)
  }

  const handleCloseCreateForm = () => {
    setShowCreateForm(false)
  }

  const handleSaveEvent = async (newEvent) => {
    try {
      const response = await axios.post('http://localhost:3000/events', newEvent)
      setMyEvents(prev => [...prev, response.data])
      console.log('Event created successfully:', response.data)
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Failed to create event. Please try again.')
    }
  }

  const handleViewAttendees = (event) => {
    setSelectedEvent(event)
    setShowViewAttendees(true)
  }

  const handleCloseAttendees = () => {
    setShowViewAttendees(false)
    setSelectedEvent(null)
  }

  return (
    <div className="p-6">
      
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


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {myEvents.length > 0 ? (
          myEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 transform group cursor-pointer">
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
                
                <div className="flex justify-center">
                  <button
                    onClick={() => handleViewAttendees(event)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group/attendees w-full"
                  >
                    <span className="relative z-10">View Attendees</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-600 translate-x-full group-hover/attendees:translate-x-0 transition-transform duration-300"></div>
                  </button>
                </div>
                
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 transform translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-700 transform -translate-x-8 translate-y-8"></div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events created yet</h3>
            <p className="text-gray-500 mb-6">Create your first event to get started!</p>
            <button
              onClick={handleCreateEvent}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group/create-empty"
            >
              <span className="relative z-10">Create Your First Event</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-600 translate-x-full group-hover/create-empty:translate-x-0 transition-transform duration-300"></div>
            </button>
          </div>
        )}
      </div>

      <CreateEventForm 
        isOpen={showCreateForm}
        onClose={handleCloseCreateForm}
        onSave={handleSaveEvent}
      />

      {selectedEvent && (
        <ViewAttendees 
          isOpen={showViewAttendees}
          onClose={handleCloseAttendees}
          event={selectedEvent}
        />
      )}
    </div>
  )
}