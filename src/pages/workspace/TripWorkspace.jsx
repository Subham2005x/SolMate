import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import TripOverview from './TripOverview'
import WorkspaceItinerary from './WorkspaceItinerary'
import WorkspaceBudget from './WorkspaceBudget'
import AIAssistant from './AIAssistant'
import WorkspaceGroup from './WorkspaceGroup'
import WorkspaceCommunity from './WorkspaceCommunity'
import WorkspaceDiscover from './WorkspaceDiscover'
import WorkspaceSafety from './WorkspaceSafety'
import WorkspaceMemories from './WorkspaceMemories'
import WorkspaceTranslator from './WorkspaceTranslator'
import WorkspacePlanBook from './WorkspacePlanBook'
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
      { 
        id: 'user-1', 
        userId: 'user-1',
        name: 'Subham Nabik', 
        email: 'subham@example.com',
        avatar: '👤', 
        role: 'admin',
        isCreator: true,
        online: true,
        status: 'active',
        joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        stats: { activities: 8, messages: 42, expenses: 12 }
      },
      { 
        id: 'user-2', 
        userId: 'user-2',
        name: 'Sarah Kim', 
        email: 'sarah@example.com',
        avatar: '👤', 
        role: 'admin',
        isCreator: false,
        online: true,
        status: 'active',
        joinedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        stats: { activities: 5, messages: 28, expenses: 7 }
      },
      { 
        id: 'user-3', 
        userId: 'user-3',
        name: 'Alex Park', 
        email: 'alex@example.com',
        avatar: '👤', 
        role: 'member',
        isCreator: false,
        online: false,
        status: 'active',
        joinedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        stats: { activities: 3, messages: 15, expenses: 4 }
      },
      { 
        id: 'user-4', 
        userId: 'user-4',
        name: 'Maria Lee', 
        email: 'maria@example.com',
        avatar: '👤', 
        role: 'member',
        isCreator: false,
        online: false,
        status: 'pending',
        joinedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        stats: { activities: 0, messages: 2, expenses: 0 }
      }
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
      { 
        id: 'user-1', 
        userId: 'user-1',
        name: 'Subham Nabik', 
        email: 'subham@example.com',
        avatar: '👤', 
        role: 'admin',
        isCreator: true,
        online: true,
        status: 'active',
        joinedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        stats: { activities: 6, messages: 35, expenses: 9 }
      },
      { 
        id: 'user-2', 
        userId: 'user-2',
        name: 'John Doe', 
        email: 'john@example.com',
        avatar: '👤', 
        role: 'admin',
        isCreator: false,
        online: true,
        status: 'active',
        joinedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
        stats: { activities: 4, messages: 22, expenses: 5 }
      },
      { 
        id: 'user-3', 
        userId: 'user-3',
        name: 'Jane Smith', 
        email: 'jane@example.com',
        avatar: '👤', 
        role: 'member',
        isCreator: false,
        online: true,
        status: 'active',
        joinedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
        stats: { activities: 5, messages: 30, expenses: 8 }
      }
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
      { 
        id: 'user-1', 
        userId: 'user-1',
        name: 'Subham Nabik', 
        email: 'subham@example.com',
        avatar: '👤', 
        role: 'admin',
        isCreator: true,
        online: true,
        status: 'active',
        joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        stats: { activities: 12, messages: 0, expenses: 15 }
      }
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
        // Convert string dates to Date objects
        const tripWithDates = {
          ...trip,
          startDate: new Date(trip.startDate),
          endDate: new Date(trip.endDate)
        }
        setTripData(tripWithDates)
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
    } else if (['itinerary', 'budget', 'assistant', 'group', 'community', 'discover', 'safety', 'memories', 'translator', 'planbook', 'accommodations', 'transportation', 'documents'].includes(path)) {
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

  // Dynamic navigation items based on trip type
  const getNavigationItems = () => {
    const baseItems = [
      { id: 'overview', label: 'Overview', icon: '🏠', path: '' },
      { id: 'assistant', label: 'AI Assistant', icon: '🤖', path: 'assistant' },
      { id: 'itinerary', label: 'Itinerary', icon: '📅', path: 'itinerary' },
      { id: 'planbook', label: 'Plan & Book', icon: '🎫', path: 'planbook' },
      { id: 'budget', label: 'Budget', icon: '💰', path: 'budget' }
    ]

    // Add type-specific navigation items
    if (tripData?.type === 'group') {
      baseItems.push(
        { id: 'group', label: 'Group', icon: '👥', path: 'group', badge: tripData.members?.length || 0 }
      )
    } else if (tripData?.type === 'solo') {
      baseItems.push(
        { id: 'community', label: 'Community', icon: '🌍', path: 'community' }
      )
    }

    // Add common items
    baseItems.push(
      { id: 'discover', label: 'Discover', icon: '🔍', path: 'discover' },
      { id: 'safety', label: 'Safety', icon: '🛡️', path: 'safety' },
      { id: 'memories', label: 'Memories', icon: '📸', path: 'memories' }
    )

    return baseItems
  }

  const navigationItems = getNavigationItems()

  const handleNavClick = (item) => {
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
          <div className="countdown-widget-navbar">
            <div className="countdown-number">{calculateCountdown()}</div>
            <div className="countdown-label">days to go</div>
          </div>
        </div>
        
        <div className="app-bar-right">
          
          <button 
            className="workspace-icon-button translator-nav-btn"
            onClick={() => handleNavClick({ id: 'translator', path: 'translator' })}
            aria-label="Translator"
            title="Language Translator"
          >
            Translate 🌐
          </button>
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
              <Route path="planbook" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <WorkspacePlanBook tripData={tripData} />
                </motion.div>
              } />
              {/* Phase 2 Features */}
              
              {/* Group tab - only for group trips */}
              <Route path="group" element={
                tripData?.type === 'group' ? (
                  <motion.div
                    key="group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <WorkspaceGroup tripData={tripData} />
                  </motion.div>
                ) : (
                  <Navigate to={`/workspace/${tripId}/community`} replace />
                )
              } />

              {/* Community tab - only for solo trips */}
              <Route path="community" element={
                tripData?.type === 'solo' ? (
                  <motion.div
                    key="community"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <WorkspaceCommunity tripData={tripData} />
                  </motion.div>
                ) : (
                  <Navigate to={`/workspace/${tripId}/group`} replace />
                )
              } />

              <Route path="translator" element={
                <motion.div
                  key="translator"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <WorkspaceTranslator tripData={tripData} />
                </motion.div>
              } />

              <Route path="discover" element={
                <motion.div
                  key="discover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <WorkspaceDiscover tripData={tripData} />
                </motion.div>
              } />
              <Route path="safety" element={
                <motion.div
                  key="safety"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <WorkspaceSafety tripData={tripData} />
                </motion.div>
              } />
              <Route path="memories" element={
                <motion.div
                  key="memories"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <WorkspaceMemories tripData={tripData} />
                </motion.div>
              } />
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

export default TripWorkspace
