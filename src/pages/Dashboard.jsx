import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Dashboard.css'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const userName = 'Subham' // Placeholder - would come from auth context

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

  // Mock data
  const upcomingTrips = [
    {
      id: 1,
      destination: 'Kyoto, Japan',
      dates: 'Mar 15 - Mar 22, 2026',
      status: 'planning',
      participants: 4,
      progress: 35,
      imageUrl: '🏯'
    },
    {
      id: 2,
      destination: 'Barcelona, Spain',
      dates: 'Jun 8 - Jun 15, 2026',
      status: 'upcoming',
      participants: 3,
      progress: 80,
      imageUrl: '🏛️'
    }
  ]

  const sidebarVariants = {
    hidden: { x: -280, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.1
      }
    }
  }

  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  }

  return (
    <div className="dashboard-app">
      {/* Top App Bar */}
      <header className="app-bar">
        <div className="app-bar-left">
          <div className="app-logo">
            <span className="logo-icon">✈️</span>
            <span className="logo-text">SolMate</span>
          </div>
        </div>
        
        <div className="app-bar-right">
          <button 
            className="icon-button theme-toggle" 
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span>{darkMode ? '☀️' : '🌙'}</span>
          </button>
          <button className="icon-button" aria-label="Notifications">
            <span>🔔</span>
          </button>
          <div className="user-avatar">
            <span>{userName.charAt(0)}</span>
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Left Sidebar Navigation */}
        <motion.aside 
          className="sidebar"
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
        >
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-label">Dashboard</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'trips' ? 'active' : ''}`}
              onClick={() => setActiveTab('trips')}
            >
              <span className="nav-icon">🗺️</span>
              <span className="nav-label">My Trips</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span className="nav-icon">👤</span>
              <span className="nav-label">Profile</span>
            </button>
          </nav>

          <div className="sidebar-footer">
            <button className="nav-item secondary">
              <span className="nav-icon">⚙️</span>
              <span className="nav-label">Settings</span>
            </button>
            <button className="nav-item secondary">
              <span className="nav-icon">❓</span>
              <span className="nav-label">Help</span>
            </button>
          </div>
        </motion.aside>

        {/* Main Content Workspace */}
        <main className="dashboard-main">
          <div className="content-container">
            {/* Journey Context Header */}
            <motion.section 
              className="journey-header"
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="greeting">Welcome back, {userName} 👋</h1>
              <p className="journey-message">
                Your next adventure awaits. Where will you explore?
              </p>
              <div className="travel-stats">
                <div className="stat-item">
                  <span className="stat-value">2</span>
                  <span className="stat-label">Active Trips</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-value">7</span>
                  <span className="stat-label">Travel Buddies</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-value">12</span>
                  <span className="stat-label">Countries</span>
                </div>
              </div>
            </motion.section>

            {/* Primary Action - Create Trip */}
            <motion.section 
              className="primary-action-section"
              custom={1}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <button className="create-trip-card">
                <div className="create-trip-content">
                  <div className="create-trip-icon">
                    <span className="plus-icon">+</span>
                  </div>
                  <div className="create-trip-text">
                    <h2>Create a new trip</h2>
                    <p>Start planning your next group adventure</p>
                  </div>
                </div>
                <div className="create-trip-arrow">→</div>
              </button>
            </motion.section>

            {/* Trips Workspace */}
            <motion.section 
              className="trips-workspace"
              custom={2}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="section-header">
                <h3>Your Trips</h3>
                <button className="btn-text">View all</button>
              </div>

              <div className="trips-grid">
                {upcomingTrips.map((trip, index) => (
                  <div key={trip.id} className="trip-card" data-status={trip.status}>
                    <div className="trip-visual">
                      <div className="trip-emoji">{trip.imageUrl}</div>
                      <div className={`trip-status-badge ${trip.status}`}>
                        {trip.status === 'planning' ? 'Planning' : 'Upcoming'}
                      </div>
                    </div>
                    
                    <div className="trip-details">
                      <h4 className="trip-destination">{trip.destination}</h4>
                      <p className="trip-dates">{trip.dates}</p>
                      
                      <div className="trip-meta">
                        <div className="trip-participants">
                          <span className="meta-icon">👥</span>
                          <span>{trip.participants} travelers</span>
                        </div>
                        
                        <div className="trip-progress">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${trip.progress}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">{trip.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Secondary Panels Grid */}
            <motion.section 
              className="secondary-panels"
              custom={3}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="panel-card locked">
                <div className="panel-icon">💬</div>
                <h4>Travel Buddy Finder</h4>
                <p>Connect with fellow explorers</p>
                <span className="coming-soon-badge">Coming Soon</span>
              </div>

              <div className="panel-card locked">
                <div className="panel-icon">💰</div>
                <h4>Budget Overview</h4>
                <p>Track shared expenses</p>
                <span className="locked-badge">🔒 Locked</span>
              </div>

              <div className="panel-card locked">
                <div className="panel-icon">📸</div>
                <h4>Travel Memories</h4>
                <p>Your shared photo gallery</p>
                <span className="locked-badge">🔒 Locked</span>
              </div>
            </motion.section>
          </div>
        </main>

        {/* Optional Right Contextual Panel */}
        <aside className="context-panel">
          <div className="context-card">
            <h4 className="context-title">Quick Tips</h4>
            <ul className="tips-list">
              <li>
                <span className="tip-icon">💡</span>
                <span>Invite friends early to get input on dates</span>
              </li>
              <li>
                <span className="tip-icon">🎯</span>
                <span>Set your trip budget first for better planning</span>
              </li>
              <li>
                <span className="tip-icon">✨</span>
                <span>Use polls to decide on activities together</span>
              </li>
            </ul>
          </div>

          <div className="context-card">
            <h4 className="context-title">Travel Inspiration</h4>
            <div className="inspiration-item">
              <div className="inspiration-emoji">🏔️</div>
              <div className="inspiration-text">
                <strong>Swiss Alps</strong>
                <span>Perfect for spring hiking</span>
              </div>
            </div>
            <div className="inspiration-item">
              <div className="inspiration-emoji">🏖️</div>
              <div className="inspiration-text">
                <strong>Bali</strong>
                <span>Beach & culture blend</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Dashboard
