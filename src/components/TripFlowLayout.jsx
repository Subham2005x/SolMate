import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './TripFlowLayout.css'

const FLOW_STEPS = [
  { path: '/trip/setup', label: 'Setup', number: 1 },
  { path: '/trip/budget', label: 'Budget', number: 2 },
  { path: '/trip/suggestions', label: 'Suggestions', number: 3 },
  { path: '/trip/itinerary', label: 'Itinerary', number: 4 },
  { path: '/trip/expenses', label: 'Expenses', number: 5 },
  { path: '/trip/buddy', label: 'Buddy', number: 6 }
]

function TripFlowLayout({ children, currentStep = 1 }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const getCurrentStepInfo = () => {
    return FLOW_STEPS.find(step => step.path === location.pathname) || FLOW_STEPS[0]
  }

  const currentStepInfo = getCurrentStepInfo()

  return (
    <div className="trip-flow-app">
      {/* Top App Bar */}
      <header className="flow-app-bar">
        <div className="flow-app-bar-left">
          <button 
            className="flow-back-button"
            onClick={() => navigate('/dashboard')}
            aria-label="Back to dashboard"
          >
            <span>←</span>
          </button>
          <div className="flow-app-logo">
            <span className="flow-logo-icon">✈️</span>
            <span className="flow-logo-text">SolMate</span>
          </div>
        </div>

        <div className="flow-app-bar-center">
          <div className="flow-progress-indicator">
            {FLOW_STEPS.map((step, index) => (
              <div 
                key={step.path}
                className={`progress-step ${
                  step.number < currentStepInfo.number ? 'completed' : 
                  step.number === currentStepInfo.number ? 'active' : 
                  'upcoming'
                }`}
              >
                <div className="progress-step-circle">
                  {step.number < currentStepInfo.number ? '✓' : step.number}
                </div>
                {index < FLOW_STEPS.length - 1 && (
                  <div className="progress-step-line"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flow-app-bar-right">
          <button 
            className="flow-icon-button flow-theme-toggle" 
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span>{darkMode ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flow-content">
        <motion.div
          className="flow-content-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}

export default TripFlowLayout
