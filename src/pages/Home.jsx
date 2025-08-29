import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import axios from "axios";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [isSearch, setSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/events")
      .then((res) => {
        const now = new Date();
        const eventsWithStatus = res.data.map((event) => ({
          ...event,
          isFinished: new Date(event.date) < now
        }));
        setEvents(eventsWithStatus);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSearch(true);
  };

  // Filter events for search
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hide finished events from main display
  const activeEvents = events.filter((event) => !event.isFinished);
  const activeFilteredEvents = filteredEvents.filter((event) => !event.isFinished);

  return (
    <div className="p-6">
      {/* Search box */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSearch(false);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Event Grid */}
      <div className="mt-8 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(isSearch ? activeFilteredEvents : activeEvents).map((event) => (
            <EventCard event={event} key={event._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
