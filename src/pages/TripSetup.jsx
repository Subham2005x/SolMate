import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TripFlowLayout from '../components/TripFlowLayout'
import './TripSetup.css'

function TripSetup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    tripType: 'solo' // 'solo' or 'group'
  })
  const [showInviteLink, setShowInviteLink] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleContinue = () => {
    if (formData.tripType === 'group') {
      setShowInviteLink(true)
      // Generate mock invite link
      setTimeout(() => {
        navigate('/trip/budget', { state: { tripData: formData } })
      }, 2000)
    } else {
      navigate('/trip/budget', { state: { tripData: formData } })
    }
  }

  const isFormValid = formData.destination && formData.startDate && formData.endDate

  return (
    <TripFlowLayout currentStep={1}>
      <div className="flow-screen">
        <div className="flow-screen-header">
          <h1 className="flow-screen-title">Plan Your Journey</h1>
          <p className="flow-screen-description">
            Let's start with the basics. Where are you headed?
          </p>
        </div>

        <div className="flow-screen-body">
          {/* Destination Input */}
          <div className="flow-form-group">
            <label className="flow-form-label" htmlFor="destination">
              Destination
            </label>
            <input
              id="destination"
              type="text"
              className="flow-input"
              placeholder="e.g., Tokyo, Japan"
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
            />
          </div>

          {/* Date Range */}
          <div className="date-range-group">
            <div className="flow-form-group">
              <label className="flow-form-label" htmlFor="startDate">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                className="flow-input"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>

            <div className="flow-form-group">
              <label className="flow-form-label" htmlFor="endDate">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                className="flow-input"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                min={formData.startDate}
              />
            </div>
          </div>

          {/* Trip Type Toggle */}
          <div className="flow-form-group">
            <label className="flow-form-label">
              Travel Type
            </label>
            <div className="trip-type-toggle">
              <button
                className={`trip-type-option ${formData.tripType === 'solo' ? 'active' : ''}`}
                onClick={() => handleInputChange('tripType', 'solo')}
              >
                <span className="trip-type-icon">🎒</span>
                <div className="trip-type-text">
                  <div className="trip-type-title">Solo</div>
                  <div className="trip-type-subtitle">Just me</div>
                </div>
              </button>

              <button
                className={`trip-type-option ${formData.tripType === 'group' ? 'active' : ''}`}
                onClick={() => handleInputChange('tripType', 'group')}
              >
                <span className="trip-type-icon">👥</span>
                <div className="trip-type-text">
                  <div className="trip-type-title">Group</div>
                  <div className="trip-type-subtitle">With friends</div>
                </div>
              </button>
            </div>
          </div>

          {/* Invite Link Modal */}
          {showInviteLink && (
            <motion.div
              className="invite-link-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="invite-link-header">
                <span className="invite-link-icon">🔗</span>
                <h3>Invite Your Travel Buddies</h3>
              </div>
              <p className="invite-link-description">
                Share this link with your group members
              </p>
              <div className="invite-link-box">
                <code>solmate.app/join/abc123xyz</code>
                <button className="invite-copy-button">Copy</button>
              </div>
              <p className="invite-link-note">
                Redirecting to next step...
              </p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flow-button-group">
            <button 
              className="flow-button flow-button-secondary"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button 
              className="flow-button flow-button-primary"
              onClick={handleContinue}
              disabled={!isFormValid}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </TripFlowLayout>
  )
}

export default TripSetup
