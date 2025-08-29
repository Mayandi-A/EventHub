# 🎟️ EventHub

EventHub is a full-stack **event management platform** where organizers can create and manage events, and attendees can register, view, and download tickets.  
Built with **React (Vite) + TailwindCSS** on the frontend and **Express + MongoDB** on the backend.

---

## ✨ Features

### 👨‍💼 Organizers
- Create, edit, and delete events
- Mark events as **featured**
- View registered attendees
- See whether events are **upcoming** or **ended**

### 👥 Attendees
- Browse and register for events
- View all registered tickets
- Download beautiful **ticket images** (with event details & QR placeholder)
- Delete tickets

### ⚙️ General
- JWT authentication with auto-logout on expiry
- Role-based access (Organizer vs Attendee)
- Global Axios interceptors for token handling
- TailwindCSS UI with hover effects, badges (Featured, Ended), and animations

---

## 🛠 Tech Stack

- **Frontend**: React 19, Vite 7, TailwindCSS 4, Axios, React Router DOM  
- **Backend**: Express, Mongoose, JWT, Bcrypt, CORS  
- **Database**: MongoDB

---

## 📂 Project Structure

EventHub/
├── backend/
│ ├── models/ # User, Event, Ticket
│ ├── routes/ # Auth, Events, Tickets
│ ├── middleware/ # Auth JWT middleware
│ ├── seedEvents.js # Populate sample events
│ └── server.js # Express app entry
│
├── src/ # Frontend (React + Vite)
│ ├── pages/ # Home, MyEvents, MyTickets, etc.
│ ├── components/ # EventCard, CreateEventForm, ViewAttendees
│ ├── context/ # UserProvider (auth state)
│ ├── Auth/ # Login, Register, PrivateRoute
│ ├── axiosConfig.js # Axios interceptors
│ └── main.jsx / App.jsx

yaml
Copy code

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/eventhub.git
cd eventhub
2. Backend Setup
bash
Copy code
cd backend
npm install
# Create .env file
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=4000
# Run server
npm run dev
3. Frontend Setup
bash
Copy code
cd ../
npm install
npm run dev
Visit 👉 http://localhost:5173

🔐 Authentication
Users register/login to receive a JWT

Axios interceptor attaches token to every request

If token expires, user is automatically logged out and redirected to login

Organizer role can create events; Attendees can only register

🎟 Tickets
Tickets are generated when a user registers for an event

Stored in DB with event + user details

Users can download tickets as PNG (styled with Canvas)

Option to delete tickets from MyTickets page

🖼 Screenshots
Event Cards
Hover effects

Featured badge

Ended badge

Ticket Download
Gradient background

Event details

QR placeholder

🤝 Contributing
Fork the repo

Create a branch (feature/new-feature)

Commit changes

Push branch and open PR

📜 License
MIT License © 2025 [Your Name]

pgsql
Copy code

Do you want me to also add **screenshots placeholders** (like `![screenshot](path)`) so you can drop in images later?
