import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import TripFlowLayout from '../components/TripFlowLayout'
import './Suggestions.css'

function Suggestions() {
  const navigate = useNavigate()
  const location = useLocation()
  const tripData = location.state?.tripData || {}

  const suggestions = [
    {
      icon: '🌤️',
      title: 'Best Time to Visit',
      content: `For ${tripData.destination || 'your destination'}, the weather is typically pleasant during spring and fall. Expect moderate temperatures and fewer crowds during these months.`,
      color: 'blue'
    },
    {
      icon: '🛡️',
      title: 'Safety & Health',
      content: 'Check travel advisories before departure. Ensure your vaccinations are up to date. Keep emergency contacts saved. Travel insurance is recommended for international trips.',
      color: 'green'
    },
    {
      icon: '💡',
      title: 'Local Tips',
      content: 'Learn a few basic phrases in the local language. Carry some local currency for small purchases. Public transportation is often the most efficient way to get around.',
      color: 'orange'
    },
    {
      icon: '📱',
      title: 'Stay Connected',
      content: 'Consider getting a local SIM card or international data plan. Download offline maps. Save important addresses and contacts before you go.',
      color: 'purple'
    }
  ]

  const handleContinue = () => {
    navigate('/trip/itinerary', { state: { tripData } })
  }

  const handleBack = () => {
    navigate('/trip/budget', { state: { tripData } })
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
    <TripFlowLayout currentStep={3}>
      <div className="flow-screen">
        <div className="flow-screen-header">
          <h1 className="flow-screen-title">Helpful Insights</h1>
          <p className="flow-screen-description">
            Here are some things to keep in mind as you plan your journey.
          </p>
        </div>

        <div className="flow-screen-body">
          {/* Suggestion Cards */}
          <div className="suggestions-grid">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                className={`suggestion-card color-${suggestion.color}`}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="suggestion-icon">{suggestion.icon}</div>
                <div className="suggestion-content">
                  <h3 className="suggestion-title">{suggestion.title}</h3>
                  <p className="suggestion-text">{suggestion.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info Banner */}
          <div className="suggestions-banner">
            <div className="banner-icon">✨</div>
            <div className="banner-content">
              <h4>Personalized recommendations coming soon</h4>
              <p>
                We're working on AI-powered suggestions tailored to your destination and preferences.
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
              Continue to Itinerary
            </button>
          </div>
        </div>
      </div>
    </TripFlowLayout>
  )
}

export default Suggestions
