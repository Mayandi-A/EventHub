import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import UserProvider from './context/UserProvider.jsx'
import '../src/index.css'
import "./axiosConfig";   
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <UserProvider>
    <div className="max-w-screen overflow-x-hidden">
    <App /></div>
  </UserProvider>
  </BrowserRouter>,
)
