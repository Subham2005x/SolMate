import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import TripOverview from './TripOverview'
import WorkspaceItinerary from './WorkspaceItinerary'
import WorkspaceBudget from './WorkspaceBudget'
import AIAssistant from './AIAssistant'
import './TripWorkspace.css'

// MOCK DATA - Replace with backend API call
const MOCK_TRIPS = {
  'tokyo-2024': {
    id: 'tokyo-2024',
    title: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    startDate: '2024-03-15',
    endDate: '2024-03-27',
    duration: 12,
    status: 'planning',
    type: 'group',
    budget: 9000,
    travelers: 4,
    weather: {
      temp: '8-15°C',
      condition: 'Partly Cloudy'
    },
    members: [
      { id: 1, name: 'Subham Nabik', avatar: '👤', role: 'organizer' },
      { id: 2, name: 'Sarah Kim', avatar: '👤', role: 'member' },
      { id: 3, name: 'Alex Park', avatar: '👤', role: 'member' },
      { id: 4, name: 'Maria Lee', avatar: '👤', role: 'pending' }
    ]
  },
  'barcelona-2024': {
    id: 'barcelona-2024',
    title: 'Barcelona Escape',
    destination: 'Barcelona, Spain',
    startDate: '2024-06-08',
    endDate: '2024-06-15',
    duration: 7,
    status: 'planning',
    type: 'group',
    budget: 5000,
    travelers: 3,
    weather: {
      temp: '20-28°C',
      condition: 'Sunny'
    },
    members: [
      { id: 1, name: 'Subham Nabik', avatar: '👤', role: 'organizer' },
      { id: 2, name: 'John Doe', avatar: '👤', role: 'member' },
      { id: 3, name: 'Jane Smith', avatar: '👤', role: 'member' }
    ]
  },
  'paris-2024': {
    id: 'paris-2024',
    title: 'Paris Solo Adventure',
    destination: 'Paris, France',
    startDate: '2024-09-10',
    endDate: '2024-09-17',
    duration: 7,
    status: 'planning',
    type: 'solo',
    budget: 3000,
    travelers: 1,
    weather: {
      temp: '15-22°C',
      condition: 'Clear'
    },
    members: [
      { id: 1, name: 'Subham Nabik', avatar: '👤', role: 'organizer' }
    ]
  }
}

function TripWorkspace() {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('overview')
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [showAIChat, setShowAIChat] = useState(false)
  const [tripData, setTripData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO: Replace with actual API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const trip = MOCK_TRIPS[tripId]
      if (trip) {
        setTripData(trip)
      } else {
        setError('Trip not found')
      }
      setLoading(false)
    }, 500)
  }, [tripId])

  // Sync activeSection with current route
  useEffect(() => {
    const path = location.pathname.split('/').pop()
    if (path === tripId || path === '') {
      setActiveSection('overview')
    } else if (['itinerary', 'budget', 'assistant', 'accommodations', 'transportation', 'documents'].includes(path)) {
      setActiveSection(path)
    }
  }, [location.pathname, tripId])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: '🏠', path: '' },
    { id: 'assistant', label: 'AI Assistant', icon: '🤖', path: 'assistant' },
    { id: 'itinerary', label: 'Itinerary', icon: '📅', path: 'itinerary' },
    { id: 'budget', label: 'Budget', icon: '💰', path: 'budget' },
    { id: 'group', label: 'Group', icon: '👥', path: 'group', badge: 3 },
    { id: 'discover', label: 'Discover', icon: '🔍', path: 'discover', soon: true },
    { id: 'safety', label: 'Safety', icon: '🛡️', path: 'safety', soon: true },
    { id: 'memories', label: 'Memories', icon: '📸', path: 'memories', soon: true }
  ]

  const handleNavClick = (item) => {
    if (item.soon) return
    setActiveSection(item.id)
    if (item.path) {
      navigate(`/workspace/${tripId}/${item.path}`)
    } else {
      navigate(`/workspace/${tripId}`)
    }
  }

  const calculateCountdown = () => {
    if (!tripData) return 0
    const start = new Date(tripData.startDate)
    const today = new Date()
    const diff = Math.ceil((start - today) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }

  if (loading) {
    return (
      <div className="workspace-loading">
        <div className="loading-spinner"></div>
        <p>Loading trip workspace...</p>
      </div>
    )
  }

  if (error || !tripData) {
    return (
      <div className="workspace-error">
        <h2>{error || 'Trip not found'}</h2>
        <p>The trip you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    )
  }

  return (
    <div className="trip-workspace">
      {/* App Bar */}
      <header className="workspace-app-bar">
        <div className="app-bar-left">
          <button 
            className="back-button"
            onClick={() => navigate('/dashboard')}
            aria-label="Back to dashboard"
          >
            ←
          </button>
          <div className="workspace-logo">
            <div className="logo-icon">✈️</div>
            <span className="logo-text">SolMate</span>
          </div>
        </div>
        
        <div className="app-bar-right">
          <div className="countdown-widget-navbar">
            <div className="countdown-number">{calculateCountdown()}</div>
            <div className="countdown-label">days to go</div>
          </div>
          <button 
            className="workspace-icon-button"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button className="workspace-icon-button" aria-label="Settings">
            ⚙️
          </button>
          <div className="user-avatar">JS</div>
        </div>
      </header>

      <div className="workspace-container">
        {/* Sidebar Navigation */}
        <aside className="workspace-sidebar">
          <nav className="workspace-nav">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''} ${item.soon ? 'soon' : ''}`}
                onClick={() => handleNavClick(item)}
                disabled={item.soon}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
                {item.soon && <span className="nav-soon-tag">Soon</span>}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="workspace-main">
          <div className="workspace-content">
            <Routes>
              <Route index element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TripOverview tripData={tripData} />
                </motion.div>
              } />
              <Route path="assistant" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AIAssistant tripData={tripData} />
                </motion.div>
              } />
              <Route path="itinerary" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <WorkspaceItinerary tripData={tripData} />
                </motion.div>
              } />
              <Route path="budget" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <WorkspaceBudget tripData={tripData} />
                </motion.div>
              } />
              {/* Placeholder routes for Phase 2 & 3 */}
              <Route path="group" element={<ComingSoon feature="Group Collaboration" />} />
              <Route path="discover" element={<ComingSoon feature="Discover Places" />} />
              <Route path="safety" element={<ComingSoon feature="Safety & SOS" />} />
              <Route path="memories" element={<ComingSoon feature="Trip Memories" />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Floating AI Assistant Button */}
      <button 
        className="floating-ai-button"
        onClick={() => setShowAIChat(!showAIChat)}
        aria-label="Toggle AI Assistant"
      >
        🤖 Ask AI
      </button>

      {/* AI Chat Overlay - TODO: Implement full chat */}
      {showAIChat && (
        <motion.div
          className="ai-chat-overlay"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <div className="ai-chat-header">
            <h3>AI Travel Assistant</h3>
            <button onClick={() => setShowAIChat(false)}>✕</button>
          </div>
          <div className="ai-chat-placeholder">
            {/* TODO: Implement AI chat interface here */}
            <p>AI Assistant coming soon!</p>
            <p className="placeholder-note">Backend integration required</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Placeholder component for upcoming features
function ComingSoon({ feature }) {
  return (
    <div className="coming-soon-screen">
      <div className="coming-soon-content">
        <div className="coming-soon-icon">🚀</div>
        <h2>{feature}</h2>
        <p>This feature is coming in Phase 2!</p>
        <p className="coming-soon-note">We're building something amazing for you.</p>
      </div>
    </div>
  )
}

export default TripWorkspace
