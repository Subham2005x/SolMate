import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import TripFlowLayout from '../components/TripFlowLayout'
import './TravelBuddy.css'

function TravelBuddy() {
  const navigate = useNavigate()
  const location = useLocation()
  const tripData = location.state?.tripData || {}

  const features = [
    {
      icon: '⚠️',
      title: 'Safety Precautions',
      description: 'Real-time safety tips and emergency contacts for your destination'
    },
    {
      icon: '🎒',
      title: 'Smart Packing List',
      description: 'Personalized checklist based on your destination, weather, and activities'
    },
    {
      icon: '🗺️',
      title: 'Local Insights',
      description: 'Hidden gems, cultural tips, and local etiquette guidance'
    },
    {
      icon: '💬',
      title: 'Instant Answers',
      description: 'Ask anything about your trip—get instant, helpful responses'
    }
  ]

  const handleBack = () => {
    navigate('/trip/expenses', { state: { tripData } })
  }

  const handleFinish = () => {
    // TODO: After creating trip via API, use the returned trip ID
    // For now, navigate to a demo workspace
    const tripId = 'tokyo-2024' // Replace with actual ID from trip creation API
    navigate(`/workspace/${tripId}`)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  }

  return (
    <TripFlowLayout currentStep={6}>
      <div className="flow-screen">
        <div className="flow-screen-header">
          <h1 className="flow-screen-title">Your Travel Buddy</h1>
          <p className="flow-screen-description">
            Coming soon: An AI companion to help you throughout your journey.
          </p>
        </div>

        <div className="flow-screen-body">
          {/* Locked Chat Interface */}
          <div className="buddy-preview-container">
            <div className="buddy-chat-preview">
              <div className="chat-messages-preview">
                <div className="chat-message-preview bot">
                  <div className="message-avatar">🤖</div>
                  <div className="message-bubble">
                    Hi! I'll be your travel companion. Ask me anything about your trip!
                  </div>
                </div>
                <div className="chat-message-preview user">
                  <div className="message-bubble">
                    What should I pack for Tokyo in March?
                  </div>
                  <div className="message-avatar">You</div>
                </div>
                <div className="chat-message-preview bot">
                  <div className="message-avatar">🤖</div>
                  <div className="message-bubble">
                    Great question! For Tokyo in March, you'll want...
                  </div>
                </div>
              </div>

              {/* Lock Overlay */}
              <div className="buddy-lock-overlay">
                <motion.div 
                  className="lock-content"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <div className="lock-icon">🔒</div>
                  <h3>Coming Soon</h3>
                  <p>We're building something special for you</p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="buddy-features-section">
            <h3 className="features-heading">What Your Buddy Will Help With</h3>
            <div className="buddy-features-grid">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="buddy-feature-card"
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-content">
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Notification Banner */}
          <div className="buddy-notification-banner">
            <div className="notification-icon">🔔</div>
            <div className="notification-content">
              <h4>Want early access?</h4>
              <p>
                Join our waitlist to be notified when Travel Buddy launches. 
                Early users get exclusive features!
              </p>
            </div>
            <button className="notification-button">
              Notify Me
            </button>
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
              onClick={handleFinish}
            >
              Finish Setup
            </button>
          </div>
        </div>
      </div>
    </TripFlowLayout>
  )
}

export default TravelBuddy
