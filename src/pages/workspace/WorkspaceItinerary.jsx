import { useState } from 'react'
import { motion } from 'framer-motion'
import './WorkspaceItinerary.css'

function WorkspaceItinerary({ tripData }) {
  // TODO: Fetch actual itinerary data from backend
  const [itineraryDays, setItineraryDays] = useState([
    {
      id: 1,
      date: '2024-03-15',
      activities: [
        { id: 'a1', time: '09:00', title: 'Arrive at Tokyo Haneda Airport', location: 'Haneda Airport', type: 'transport', duration: '2h' },
        { id: 'a2', time: '12:00', title: 'Check-in at Hotel', location: 'Shibuya Grand Hotel', type: 'accommodation', duration: '1h' },
        { id: 'a3', time: '15:00', title: 'Explore Shibuya Crossing', location: 'Shibuya', type: 'activity', duration: '3h' }
      ]
    },
    {
      id: 2,
      date: '2024-03-16',
      activities: [
        { id: 'a4', time: '08:00', title: 'Visit Senso-ji Temple', location: 'Asakusa', type: 'activity', duration: '2h' },
        { id: 'a5', time: '12:00', title: 'Lunch at Tsukiji Market', location: 'Tsukiji', type: 'food', duration: '1.5h' },
        { id: 'a6', time: '16:00', title: 'Tokyo Skytree', location: 'Sumida', type: 'activity', duration: '2h' }
      ]
    }
  ])

  const [selectedDay, setSelectedDay] = useState(1)
  const [showAddActivity, setShowAddActivity] = useState(false)

  const activityTypes = {
    transport: { icon: '✈️', color: '#3B82F6', label: 'Transport' },
    accommodation: { icon: '🏨', color: '#8B5CF6', label: 'Accommodation' },
    activity: { icon: '🎯', color: '#10B981', label: 'Activity' },
    food: { icon: '🍽️', color: '#F59E0B', label: 'Food' },
    shopping: { icon: '🛍️', color: '#EC4899', label: 'Shopping' }
  }

  const handleAddDay = () => {
    // TODO: Backend API call to add new day
    const newDay = {
      id: itineraryDays.length + 1,
      date: new Date(new Date(itineraryDays[itineraryDays.length - 1].date).getTime() + 86400000)
        .toISOString().split('T')[0],
      activities: []
    }
    setItineraryDays([...itineraryDays, newDay])
    setSelectedDay(newDay.id)
  }

  const handleAddActivity = (dayId) => {
    // TODO: Backend API call to add activity
    setShowAddActivity(true)
    console.log('Add activity to day', dayId)
  }

  const handleDeleteActivity = (dayId, activityId) => {
    // TODO: Backend API call to delete activity
    setItineraryDays(itineraryDays.map(day =>
      day.id === dayId
        ? { ...day, activities: day.activities.filter(a => a.id !== activityId) }
        : day
    ))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const selectedDayData = itineraryDays.find(day => day.id === selectedDay)

  return (
    <div className="workspace-itinerary">
      <div className="itinerary-header">
        <div className="header-left">
          <h1>Trip Itinerary</h1>
          <p className="header-subtitle">Plan your perfect journey day by day</p>
        </div>
        <button className="add-day-button" onClick={handleAddDay}>
          <span>+ Add Day</span>
        </button>
      </div>

      <div className="itinerary-content">
        {/* Day Tabs */}
        <div className="day-tabs">
          <div className="day-tabs-scroll">
            {itineraryDays.map((day, index) => (
              <button
                key={day.id}
                className={`day-tab ${selectedDay === day.id ? 'active' : ''}`}
                onClick={() => setSelectedDay(day.id)}
              >
                <div className="day-tab-number">Day {index + 1}</div>
                <div className="day-tab-date">{formatDate(day.date)}</div>
                <div className="day-tab-count">{day.activities.length} activities</div>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        {selectedDayData && (
          <motion.div
            key={selectedDay}
            className="timeline-container"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="timeline-header">
              <h2>Day {selectedDay} - {formatDate(selectedDayData.date)}</h2>
              <button
                className="add-activity-button"
                onClick={() => handleAddActivity(selectedDay)}
              >
                + Add Activity
              </button>
            </div>

            {selectedDayData.activities.length === 0 ? (
              <div className="empty-day">
                <div className="empty-icon">📅</div>
                <h3>No activities planned yet</h3>
                <p>Start planning your day by adding activities</p>
                <button
                  className="empty-add-button"
                  onClick={() => handleAddActivity(selectedDay)}
                >
                  + Add First Activity
                </button>
              </div>
            ) : (
              <div className="timeline">
                {selectedDayData.activities.map((activity, index) => {
                  const typeConfig = activityTypes[activity.type]
                  return (
                    <motion.div
                      key={activity.id}
                      className="timeline-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="timeline-marker">
                        <div
                          className="timeline-dot"
                          style={{ backgroundColor: typeConfig.color }}
                        >
                          <span>{typeConfig.icon}</span>
                        </div>
                        {index < selectedDayData.activities.length - 1 && (
                          <div className="timeline-line" />
                        )}
                      </div>

                      <div className="timeline-content">
                        <div className="activity-card">
                          <div className="activity-header">
                            <div className="activity-time">{activity.time}</div>
                            <div
                              className="activity-type-badge"
                              style={{ backgroundColor: `${typeConfig.color}20`, color: typeConfig.color }}
                            >
                              {typeConfig.icon} {typeConfig.label}
                            </div>
                          </div>

                          <h3 className="activity-title">{activity.title}</h3>

                          <div className="activity-details">
                            <div className="activity-detail">
                              <span className="detail-icon">📍</span>
                              <span className="detail-text">{activity.location}</span>
                            </div>
                            <div className="activity-detail">
                              <span className="detail-icon">⏱️</span>
                              <span className="detail-text">{activity.duration}</span>
                            </div>
                          </div>

                          <div className="activity-actions">
                            <button className="action-button edit">
                              <span>✏️</span> Edit
                            </button>
                            <button
                              className="action-button delete"
                              onClick={() => handleDeleteActivity(selectedDay, activity.id)}
                            >
                              <span>🗑️</span> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Add Activity Modal Placeholder */}
      {showAddActivity && (
        <div className="modal-overlay" onClick={() => setShowAddActivity(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Activity</h2>
              <button className="modal-close" onClick={() => setShowAddActivity(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              {/* TODO: Implement full activity form with backend integration */}
              <p className="modal-placeholder">
                Activity form will be connected to backend here.
                <br />
                Fields: Time, Title, Location, Type, Duration, Notes
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkspaceItinerary
