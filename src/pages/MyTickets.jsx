import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/UserProvider';
import { Trash2 } from "lucide-react"; // add this
import { useNavigate } from 'react-router-dom';

const MyTickets = () => {
  const { user, token } = useUserContext();
  const [bookings, setBookings] = useState([]);
  const [isDeleting, setIsDeleting] = useState(null); // add this
  const navigate = useNavigate();
  // Delete ticket
  const handleDeleteTicket = async (ticketId) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;

    setIsDeleting(ticketId);
    try {
      await axios.delete(`http://localhost:4000/tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setBookings((prev) => prev.filter((t) => t._id !== ticketId));
    } catch (error) {
      console.error("Error deleting ticket", error);
      alert(error.response?.data?.message || "Failed to delete ticket.");
    } finally {
      setIsDeleting(null);
    }
  };


  // Fetch user tickets
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:4000/tickets/my", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching tickets", error);
      }
    };

    if (user?.id) fetchBookings();
  }, [user, token]);

 // Updated handleDownload function with canvas-based ticket generation
const handleDownload = (id) => {
  const ticketData = bookings.find(ticket => ticket._id === id);
  if (!ticketData) return;

  // Create canvas for ticket
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas dimensions
  canvas.width = 800;
  canvas.height = 400;
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  
  // Fill background
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add rounded corners effect (fill corners with white to simulate border-radius)
  ctx.globalCompositeOperation = 'destination-out';
  const radius = 20;
  
  // Top-left corner
  ctx.beginPath();
  ctx.arc(radius, radius, radius, Math.PI, 1.5 * Math.PI);
  ctx.arc(radius, radius, radius, 1.5 * Math.PI, 0);
  ctx.rect(0, 0, radius, radius);
  ctx.fill();
  
  // Top-right corner
  ctx.beginPath();
  ctx.arc(canvas.width - radius, radius, radius, 1.5 * Math.PI, 0);
  ctx.arc(canvas.width - radius, radius, radius, 0, 0.5 * Math.PI);
  ctx.rect(canvas.width - radius, 0, radius, radius);
  ctx.fill();
  
  // Bottom-right corner
  ctx.beginPath();
  ctx.arc(canvas.width - radius, canvas.height - radius, radius, 0, 0.5 * Math.PI);
  ctx.arc(canvas.width - radius, canvas.height - radius, radius, 0.5 * Math.PI, Math.PI);
  ctx.rect(canvas.width - radius, canvas.height - radius, radius, radius);
  ctx.fill();
  
  // Bottom-left corner
  ctx.beginPath();
  ctx.arc(radius, canvas.height - radius, radius, 0.5 * Math.PI, Math.PI);
  ctx.arc(radius, canvas.height - radius, radius, Math.PI, 1.5 * Math.PI);
  ctx.rect(0, canvas.height - radius, radius, radius);
  ctx.fill();
  
  // Reset composite operation
  ctx.globalCompositeOperation = 'source-over';
  
  // Set text properties
  ctx.fillStyle = 'white';
  ctx.textAlign = 'left';
  
  // Event Title
  ctx.font = 'bold 36px Arial';
  ctx.fillText(ticketData.event?.title || 'Event Ticket', 40, 80);
  
  // Subtitle
  ctx.font = '18px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillText('ADMIT ONE', 40, 110);
  
  // Dashed line separator
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.setLineDash([10, 10]);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 160);
  ctx.lineTo(canvas.width - 40, 160);
  ctx.stroke();
  ctx.setLineDash([]); // Reset line dash
  
  // Event Details
  ctx.fillStyle = 'white';
  ctx.font = '14px Arial';
  
  // Venue
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('VENUE', 40, 210);
  ctx.fillStyle = 'white';
  ctx.font = 'bold 18px Arial';
  ctx.fillText(ticketData.event?.location || 'TBA', 40, 235);
  
  // Date
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '14px Arial';
  ctx.fillText('DATE', 40, 275);
  ctx.fillStyle = 'white';
  ctx.font = 'bold 16px Arial';
  const dateText = ticketData.event?.date 
    ? new Date(ticketData.event.date).toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    : 'TBA';
  ctx.fillText(dateText, 40, 300);
  
  // Time
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '14px Arial';
  ctx.fillText('TIME', 250, 275);
  ctx.fillStyle = 'white';
  ctx.font = 'bold 16px Arial';
  ctx.fillText(ticketData.event?.time || 'TBA', 250, 300);
  
  // Vertical dashed line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.setLineDash([8, 8]);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(canvas.width - 200, 180);
  ctx.lineTo(canvas.width - 200, canvas.height - 40);
  ctx.stroke();
  ctx.setLineDash([]);
  
  // Ticket ID section
  ctx.textAlign = 'right';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '12px Arial';
  ctx.fillText('TICKET ID', canvas.width - 40, 210);
  
  // Ticket ID (split into multiple lines if too long)
  ctx.fillStyle = 'white';
  ctx.font = 'bold 12px Courier New, monospace';
  const ticketId = ticketData._id;
  const maxWidth = 140;
  const lineHeight = 20;
  let y = 235;
  
  // Split ticket ID into chunks
  for (let i = 0; i < ticketId.length; i += 8) {
    const chunk = ticketId.substr(i, 8);
    ctx.fillText(chunk, canvas.width - 40, y);
    y += lineHeight;
  }
  
  // QR Code placeholder
  ctx.fillStyle = 'white';
  ctx.fillRect(canvas.width - 120, canvas.height - 120, 80, 80);
  ctx.fillStyle = '#333';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('QR', canvas.width - 80, canvas.height - 75);
  
  // Add some decorative elements
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.beginPath();
  ctx.arc(canvas.width - 50, 50, 40, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(50, canvas.height - 50, 25, 0, 2 * Math.PI);
  ctx.fill();
  
  // Convert canvas to blob and download
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${ticketData.event?.title || 'Event'}-Ticket-${id}.png`;
    link.href = url;
    link.click();
    
    // Clean up
    URL.revokeObjectURL(url);
  }, 'image/png');
};


  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookings.length > 0 ? (
        bookings.map((ticket) => (
          <div
            key={ticket._id}
            id={`ticket-${ticket._id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 group"
          >
            {/* Event Image */}
            <div className="relative overflow-hidden">
              <img
                src="https://placehold.co/600x300"
                alt={ticket.event?.title || "Event"}
                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                Ticket
              </div>
            </div>

            {/* Ticket Details */}
            <div className="p-6 relative">
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition duration-300 mb-2">
                {ticket.event?.title || "Untitled Event"}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Location:</strong> {ticket.event?.location || "N/A"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Date:</strong>{" "}
                {ticket.event?.date
                  ? new Date(ticket.event.date).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Time:</strong> {ticket.event?.time || "N/A"}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Ticket ID:</strong> {ticket._id}
              </p>

              {/* Download Button */}
              <div className="flex gap-3">
              <button
                onClick={() => handleDownload(ticket._id)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group/attendees flex-1"
              >
                <span className="relative z-10">Download Ticket</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-600 translate-x-full group-hover/register:translate-x-0 transition-transform duration-300"></div>
              </button>
              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTicket(ticket._id);
                }}
                disabled={isDeleting === ticket._id}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting === ticket._id ? (
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <Trash2 size={16} />
                )}
              </button>
              </div>
              {/* Decorative Gradients */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 transform translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-700 transform -translate-x-8 translate-y-8"></div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🎫</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No tickets found
          </h3>
          <p className="text-gray-500 mb-6">
            Register for an event to see your tickets here!
          </p>
          <button
            onClick={() => {navigate('/')}}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Browse Events
          </button>
        </div>
      )}
    </div>
  );
};

export default MyTickets;
