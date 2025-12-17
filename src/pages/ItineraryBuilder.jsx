import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import TripFlowLayout from '../components/TripFlowLayout'
import './ItineraryBuilder.css'

function ItineraryBuilder() {
  const navigate = useNavigate()
  const location = useLocation()
  const tripData = location.state?.tripData || {}

  const [days, setDays] = useState([
    { id: 1, title: '', activities: '' }
  ])

  const addDay = () => {
    setDays([...days, { id: days.length + 1, title: '', activities: '' }])
  }

  const removeDay = (id) => {
    if (days.length > 1) {
      setDays(days.filter(day => day.id !== id))
    }
  }

  const updateDay = (id, field, value) => {
    setDays(days.map(day => 
      day.id === id ? { ...day, [field]: value } : day
    ))
  }

  const handleContinue = () => {
    navigate('/trip/expenses', { 
      state: { 
        tripData: { ...tripData, itinerary: days } 
      } 
    })
  }

  const handleBack = () => {
    navigate('/trip/suggestions', { state: { tripData } })
  }

  return (
    <TripFlowLayout currentStep={4}>
      <div className="flow-screen">
        <div className="flow-screen-header">
          <h1 className="flow-screen-title">Build Your Itinerary</h1>
          <p className="flow-screen-description">
            Plan your days. Keep it simple—you can always adjust later.
          </p>
        </div>

        <div className="flow-screen-body">
          {/* Day Cards */}
          <div className="itinerary-days">
            <AnimatePresence>
              {days.map((day, index) => (
                <motion.div
                  key={day.id}
                  className="day-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="day-card-header">
                    <div className="day-number">Day {index + 1}</div>
                    {days.length > 1 && (
                      <button
                        className="remove-day-button"
                        onClick={() => removeDay(day.id)}
                        aria-label="Remove day"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="day-card-body">
                    <div className="flow-form-group">
                      <input
                        type="text"
                        className="flow-input day-title-input"
                        placeholder="Day title (optional, e.g., 'Exploring Downtown')"
                        value={day.title}
                        onChange={(e) => updateDay(day.id, 'title', e.target.value)}
                      />
                    </div>

                    <div className="flow-form-group">
                      <textarea
                        className="flow-input day-activities-input"
                        placeholder="What are you planning? (e.g., morning hike, lunch at café, museum visit)"
                        rows="4"
                        value={day.activities}
                        onChange={(e) => updateDay(day.id, 'activities', e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Day Button */}
          <button className="add-day-button" onClick={addDay}>
            <span className="add-day-icon">+</span>
            <span>Add Another Day</span>
          </button>

          {/* Helper Card */}
          <div className="itinerary-helper-card">
            <div className="helper-icon">💡</div>
            <div className="helper-content">
              <h4>Planning tip</h4>
              <p>
                Don't over-plan. Leave room for spontaneity and rest. 
                The best travel memories often come from unexpected moments.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flow-button-group">
            <button 
              className="flow-button flow-button-secondary"
              onClick={handleBack}
            >
              Back
            </button>
            <button 
              className="flow-button flow-button-primary"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </TripFlowLayout>
  )
}

export default ItineraryBuilder
