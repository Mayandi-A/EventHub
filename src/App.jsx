import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './Auth/Siginup'
import Signin from './Auth/Signin'
import NavBar from './components/NavBar'
import { useUserContext } from './context/UserProvider'
import PrivateRoute from './Auth/PrivateRoute'
import MyTickets from './pages/MyTickets'
import About from './pages/About'
import MyEvents from './pages/MyEvents'
function App() {
  const{user}=useUserContext()
  return (
    <div className="bg-gray-50">
      {user?.username && <NavBar role={user.role} />}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-tickets"
          element={
            <PrivateRoute>
              <MyTickets />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <PrivateRoute>
              <MyEvents/>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
