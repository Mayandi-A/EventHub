import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/UserProvider';
import html2canvas from 'html2canvas';

const MyTickets = () => {
  const { user } = useUserContext();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/Booked?username=${user?.id}`);
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching tickets", error);
      }
    };

    if (user?.id) fetchBookings();
  }, [user]);

  const handleDownload = async (id) => {
    const card = document.getElementById(`ticket-${id}`);
    if (!card) return;

    const canvas = await html2canvas(card);
    const link = document.createElement('a');
    link.download = `Ticket-${id}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookings.map((ticket) => (
        <div
          key={ticket.id}
          id={`ticket-${ticket.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500  group"
        >
          <div className="relative overflow-hidden">
            <img
              src="https://placehold.co/600x300"
              alt="Event"
              className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-100">
              Ticket
            </div>
          </div>


          <div className="p-6 relative">
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition duration-300 mb-2">
              {ticket.event}
            </h3>
            <p className="text-sm text-gray-600 mb-1"><strong>Ticket ID:</strong> {ticket.id}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Name:</strong> {ticket.name}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {ticket.email}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Phone:</strong> {ticket.phone}</p>
            <p className="text-sm text-gray-600 mb-4"><strong>Meal:</strong> {ticket.mealPreference}</p>


            <button
              onClick={() => handleDownload(ticket.id)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group/register"
            >
              <span className="relative z-10">Download Ticket</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-600 translate-x-full group-hover/register:translate-x-0 transition-transform duration-300"></div>
            </button>


            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 transform translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-700 transform -translate-x-8 translate-y-8"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyTickets;
