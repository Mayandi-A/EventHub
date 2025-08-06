import React, { useState } from 'react'
import { useUserContext } from '../context/UserProvider'

export default function CreateEventForm({ isOpen, onClose, onSave }) {
const {user}=useUserContext();
const [isSubmitting,setIsSubmitting]=useState(false)
  const [formData, setFormData] = useState({
    username:user?.id,
    image: '',
    isFeatured: false,
    title: '',
    price: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    aboutEvent: '',
    whatsIncluded: [''],
    schedule: [{ time: '', activity: '' }]
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleWhatsIncludedChange = (index, value) => {
    const updated = [...formData.whatsIncluded]
    updated[index] = value
    setFormData(prev => ({ ...prev, whatsIncluded: updated }))
  }

  const addWhatsIncludedItem = () => {
    setFormData(prev => ({
      ...prev,
      whatsIncluded: [...prev.whatsIncluded, '']
    }))
  }

  const removeWhatsIncludedItem = (index) => {
    setFormData(prev => ({
      ...prev,
      whatsIncluded: prev.whatsIncluded.filter((_, i) => i !== index)
    }))
  }

  const handleScheduleChange = (index, field, value) => {
    const updated = [...formData.schedule]
    updated[index][field] = value
    setFormData(prev => ({ ...prev, schedule: updated }))
  }

  const addScheduleItem = () => {
    setFormData(prev => ({
      ...prev,
      schedule: [...prev.schedule, { time: '', activity: '' }]
    }))
  }

  const removeScheduleItem = (index) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.time) newErrors.time = 'Time is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.capacity) newErrors.capacity = 'Capacity is required'
    if (!formData.aboutEvent.trim()) newErrors.aboutEvent = 'About Event is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      
      try {
        await onSave({
          ...formData,
          image: formData.image || 'https://placehold.co/600x300',
          whatsIncluded: formData.whatsIncluded.filter(item => item.trim()),
          schedule: formData.schedule.filter(item => item.time.trim() && item.activity.trim())
        })
        
        // Reset form after successful submission
        handleReset()
        onClose()
      } catch (error) {
        console.error('Error saving event:', error)
        // Form stays open so user can retry
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleReset = () => {
    setFormData({
      username:user?.id,
      image: '',
      isFeatured: false,
      title: '',
      price: '',
      description: '',
      date: '',
      time: '',
      location: '',
      capacity: '',
      aboutEvent: '',
      whatsIncluded: [''],
      schedule: [{ time: '', activity: '' }]
    })
    setErrors({})
  }

  if (!isOpen) return null

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

      
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Create New Event</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter event title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Free, $50, $25"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter venue location"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity *
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.capacity ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Max attendees"
              />
              {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://example.com/image.jpg (optional - defaults to placeholder)"
            />
          </div>

          {/* Featured Event */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleInputChange}
              className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-700">
              Mark as Featured Event
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Brief description for the event card"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* About Event */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About This Event *
            </label>
            <textarea
              name="aboutEvent"
              value={formData.aboutEvent}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.aboutEvent ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Detailed description of the event"
            />
            {errors.aboutEvent && <p className="text-red-500 text-sm mt-1">{errors.aboutEvent}</p>}
          </div>

          {/* What's Included */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's Included
            </label>
            {formData.whatsIncluded.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleWhatsIncludedChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Welcome refreshments and networking session"
                />
                {formData.whatsIncluded.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeWhatsIncludedItem(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addWhatsIncludedItem}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              + Add Item
            </button>
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule Overview
            </label>
            {formData.schedule.map((item, index) => (
              <div key={index} className="flex items-center mb-2 gap-2">
                <input
                  type="text"
                  value={item.time}
                  onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                  className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="9:00 AM - 9:30 AM"
                />
                <input
                  type="text"
                  value={item.activity}
                  onChange={(e) => handleScheduleChange(index, 'activity', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Registration & Welcome Coffee"
                />
                {formData.schedule.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeScheduleItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addScheduleItem}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              + Add Schedule Item
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group/submit ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="relative z-10">
                {isSubmitting ? 'Creating...' : 'Create Event'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-600 translate-x-full group-hover/submit:translate-x-0 transition-transform duration-300"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}