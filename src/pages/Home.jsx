import React from 'react'
import EventCard from '../components/EventCard'
import { useState } from 'react'
import axios from 'axios'
export default function Home() {
    const [events,setEvents]=useState([])
    const [isSearch,setSearch]=useState(false)
    const [searchTerm,setSearchTerm]=useState('')
    axios.get("http://localhost:3000/events").then(
      res=>{
        setEvents(res.data)
      }
    ).catch(
      err=>console.log(err)
    )
    const handleSearchInputChange=(e)=>{
      setSearchTerm(e.target.value)
      setSearch(true)
    }
  return (<div className="p-6">
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
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
      {isSearch && (
        <div className="mt-8 px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events
              .filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(event => (
                <EventCard event={event} key={event.id} />
              ))}
          </div>
        </div>
      )}

    {isSearch ?<></>:<div className="mt-8 px-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {events.map((event)=><EventCard event={event} key={event.id}></EventCard>)}
    </div>
    </div>}</div>
  )
}
