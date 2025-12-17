import { useState } from 'react'
import { motion } from 'framer-motion'
import './WorkspaceCommunity.css'

function WorkspaceCommunity({ tripData, currentUser }) {
  const [activeTab, setActiveTab] = useState('discover')
  
  // Mock data for travelers
  const [travelers] = useState([
    {
      id: 'traveler-1',
      name: 'Emma Wilson',
      avatar: '👩',
      age: 28,
      location: 'San Francisco, USA',
      destination: tripData.destination,
      dates: { start: tripData.startDate, end: tripData.endDate },
      overlap: 8,
      matchScore: 92,
      trustScore: 95,
      interests: ['Photography', 'Hiking', 'Food', 'Culture'],
      languages: ['English', 'Spanish'],
      verifications: { email: true, phone: true, government: true },
      tripStyle: 'Adventure',
      budget: '$$',
      bio: 'Love exploring new cultures and trying local cuisines! Looking for travel buddies to share experiences.',
      tripCount: 12,
      connectionStatus: null
    },
    {
      id: 'traveler-2',
      name: 'David Chen',
      avatar: '👨',
      age: 32,
      location: 'Toronto, Canada',
      destination: tripData.destination,
      dates: { start: new Date(tripData.startDate.getTime() + 2 * 24 * 60 * 60 * 1000), end: new Date(tripData.endDate.getTime() + 3 * 24 * 60 * 60 * 1000) },
      overlap: 6,
      matchScore: 87,
      trustScore: 88,
      interests: ['History', 'Museums', 'Architecture', 'Coffee'],
      languages: ['English', 'Mandarin'],
      verifications: { email: true, phone: true, government: false },
      tripStyle: 'Cultural',
      budget: '$$$',
      bio: 'History buff and architecture enthusiast. Always up for museum visits and historical site explorations.',
      tripCount: 8,
      connectionStatus: 'pending'
    },
    {
      id: 'traveler-3',
      name: 'Sofia Rodriguez',
      avatar: '👩',
      age: 25,
      location: 'Barcelona, Spain',
      destination: tripData.destination,
      dates: { start: tripData.startDate, end: tripData.endDate },
      overlap: 8,
      matchScore: 95,
      trustScore: 92,
      interests: ['Art', 'Food', 'Nightlife', 'Beach'],
      languages: ['Spanish', 'English', 'Catalan'],
      verifications: { email: true, phone: true, government: true },
      tripStyle: 'Social',
      budget: '$$',
      bio: 'Social butterfly who loves meeting new people! Let\'s explore together and share amazing moments.',
      tripCount: 15,
      connectionStatus: 'connected'
    },
    {
      id: 'traveler-4',
      name: 'Alex Johnson',
      avatar: '👤',
      age: 30,
      location: 'London, UK',
      destination: tripData.destination,
      dates: { start: new Date(tripData.startDate.getTime() - 1 * 24 * 60 * 60 * 1000), end: new Date(tripData.endDate.getTime() + 1 * 24 * 60 * 60 * 1000) },
      overlap: 7,
      matchScore: 78,
      trustScore: 85,
      interests: ['Nature', 'Yoga', 'Meditation', 'Wellness'],
      languages: ['English'],
      verifications: { email: true, phone: false, government: false },
      tripStyle: 'Relaxation',
      budget: '$$',
      bio: 'Seeking peace and tranquility. Love nature walks and wellness activities.',
      tripCount: 6,
      connectionStatus: null
    }
  ])

  // Mock connection requests
  const [connectionRequests] = useState([
    {
      id: 'req-1',
      traveler: travelers.find(t => t.id === 'traveler-2'),
      type: 'received',
      message: 'Hi! I noticed we\'re visiting the same destination. Would love to connect and maybe grab coffee!',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  ])

  // Mock connected travelers
  const connectedTravelers = travelers.filter(t => t.connectionStatus === 'connected')

  // Mock overlapping activities
  const [overlappingActivities] = useState([
    {
      id: 'overlap-1',
      name: 'Tokyo Tower Visit',
      date: tripData.startDate,
      time: '10:00 AM',
      travelers: [
        { ...travelers[0], going: true },
        { ...travelers[2], going: true }
      ],
      location: 'Tokyo Tower, Minato City'
    },
    {
      id: 'overlap-2',
      name: 'Tsukiji Fish Market Tour',
      date: new Date(tripData.startDate.getTime() + 1 * 24 * 60 * 60 * 1000),
      time: '6:00 AM',
      travelers: [
        { ...travelers[0], going: true },
        { ...travelers[1], going: false },
        { ...travelers[2], going: true }
      ],
      location: 'Tsukiji Outer Market'
    }
  ])

  // Blocked users
  const [blockedUsers, setBlockedUsers] = useState([])

  // Handlers
  const handleSendConnectionRequest = (travelerId, message = '') => {
    // TODO: Backend API call
    console.log('Send connection request to:', travelerId, message)
  }

  const handleAcceptConnection = (requestId) => {
    // TODO: Backend API call
    console.log('Accept connection:', requestId)
  }

  const handleRejectConnection = (requestId) => {
    // TODO: Backend API call
    console.log('Reject connection:', requestId)
  }

  const handleBlockUser = (userId) => {
    // TODO: Backend API call
    if (confirm('Are you sure you want to block this user?')) {
      setBlockedUsers([...blockedUsers, userId])
    }
  }

  const handleUnblockUser = (userId) => {
    // TODO: Backend API call
    setBlockedUsers(blockedUsers.filter(id => id !== userId))
  }

  const handleReportUser = (userId, reason) => {
    // TODO: Backend API call
    console.log('Report user:', userId, reason)
    alert('Report submitted. Our team will review it.')
  }

  // Helper functions
  const getMatchColor = (score) => {
    if (score >= 90) return '#10B981'
    if (score >= 75) return '#57ab81'
    if (score >= 60) return '#F59E0B'
    return '#EF4444'
  }

  const getTrustScoreColor = (score) => {
    if (score >= 90) return '#10B981'
    if (score >= 75) return '#3B82F6'
    if (score >= 60) return '#F59E0B'
    return '#EF4444'
  }

  const formatDateRange = (start, end) => {
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    return `${startStr} - ${endStr}`
  }

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000)
    if (seconds < 60) return 'just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="workspace-community">
      <div className="community-header">
        <div className="header-left">
          <h1>Travel Community</h1>
          <p className="header-subtitle">Connect with fellow travelers</p>
        </div>
        <div className="header-stats">
          <div className="stat-box">
            <span className="stat-number">{travelers.length}</span>
            <span className="stat-label">Travelers</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{connectedTravelers.length}</span>
            <span className="stat-label">Connections</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="community-tabs">
        <button
          className={`tab-button ${activeTab === 'discover' ? 'active' : ''}`}
          onClick={() => setActiveTab('discover')}
        >
          <span className="tab-icon">🔍</span>
          <span>Discover</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'connections' ? 'active' : ''}`}
          onClick={() => setActiveTab('connections')}
        >
          <span className="tab-icon">🤝</span>
          <span>Connections</span>
          {connectionRequests.length > 0 && (
            <span className="tab-badge">{connectionRequests.length}</span>
          )}
        </button>
        <button
          className={`tab-button ${activeTab === 'overlapping' ? 'active' : ''}`}
          onClick={() => setActiveTab('overlapping')}
        >
          <span className="tab-icon">📍</span>
          <span>Overlapping</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'safety' ? 'active' : ''}`}
          onClick={() => setActiveTab('safety')}
        >
          <span className="tab-icon">🛡️</span>
          <span>Safety</span>
        </button>
      </div>

      {/* Discover Tab */}
      {activeTab === 'discover' && (
        <motion.div
          className="discover-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="discover-header">
            <h2>Travelers visiting {tripData.destination}</h2>
            <p className="discover-subtitle">
              Found {travelers.length} travelers with similar plans
            </p>
          </div>

          <div className="travelers-grid">
            {travelers.map((traveler, index) => (
              <motion.div
                key={traveler.id}
                className="traveler-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="traveler-header">
                  <div className="traveler-avatar-section">
                    <div className="traveler-avatar">{traveler.avatar}</div>
                    <div className="traveler-match-badge" style={{ backgroundColor: getMatchColor(traveler.matchScore) }}>
                      {traveler.matchScore}% Match
                    </div>
                  </div>
                  <div className="traveler-basic-info">
                    <h3 className="traveler-name">{traveler.name}, {traveler.age}</h3>
                    <p className="traveler-location">📍 {traveler.location}</p>
                    <div className="traveler-verifications">
                      {traveler.verifications.email && <span className="verification-badge" title="Email verified">✓ Email</span>}
                      {traveler.verifications.phone && <span className="verification-badge" title="Phone verified">✓ Phone</span>}
                      {traveler.verifications.government && <span className="verification-badge" title="ID verified">✓ ID</span>}
                    </div>
                  </div>
                </div>

                <div className="traveler-trip-info">
                  <div className="trip-detail">
                    <span className="detail-icon">📅</span>
                    <span className="detail-text">{formatDateRange(traveler.dates.start, traveler.dates.end)}</span>
                  </div>
                  <div className="trip-detail">
                    <span className="detail-icon">🔄</span>
                    <span className="detail-text">{traveler.overlap} days overlap</span>
                  </div>
                  <div className="trip-detail">
                    <span className="detail-icon">🎒</span>
                    <span className="detail-text">{traveler.tripStyle}</span>
                  </div>
                  <div className="trip-detail">
                    <span className="detail-icon">💰</span>
                    <span className="detail-text">{traveler.budget}</span>
                  </div>
                </div>

                <div className="traveler-interests">
                  {traveler.interests.slice(0, 4).map(interest => (
                    <span key={interest} className="interest-tag">{interest}</span>
                  ))}
                </div>

                <p className="traveler-bio">{traveler.bio}</p>

                <div className="traveler-stats-row">
                  <div className="traveler-stat">
                    <span className="stat-icon">🌍</span>
                    <span className="stat-value">{traveler.tripCount} trips</span>
                  </div>
                  <div className="traveler-stat">
                    <span className="stat-icon">🛡️</span>
                    <span className="stat-value" style={{ color: getTrustScoreColor(traveler.trustScore) }}>
                      Trust: {traveler.trustScore}
                    </span>
                  </div>
                  <div className="traveler-stat">
                    <span className="stat-icon">💬</span>
                    <span className="stat-value">{traveler.languages.join(', ')}</span>
                  </div>
                </div>

                <div className="traveler-actions">
                  {traveler.connectionStatus === 'connected' && (
                    <button className="action-button connected">
                      ✓ Connected
                    </button>
                  )}
                  {traveler.connectionStatus === 'pending' && (
                    <button className="action-button pending" disabled>
                      ⏳ Pending
                    </button>
                  )}
                  {!traveler.connectionStatus && (
                    <>
                      <button 
                        className="action-button primary"
                        onClick={() => handleSendConnectionRequest(traveler.id)}
                      >
                        Connect
                      </button>
                      <button 
                        className="action-button secondary"
                        onClick={() => alert('View full profile (TODO)')}
                      >
                        View Profile
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Connections Tab */}
      {activeTab === 'connections' && (
        <motion.div
          className="connections-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {connectionRequests.length > 0 && (
            <div className="connections-group">
              <h2 className="connections-title">Connection Requests ({connectionRequests.length})</h2>
              <div className="requests-list">
                {connectionRequests.map(request => (
                  <div key={request.id} className="request-card">
                    <div className="request-header">
                      <div className="request-avatar">{request.traveler.avatar}</div>
                      <div className="request-info">
                        <h3 className="request-name">{request.traveler.name}</h3>
                        <p className="request-meta">
                          📍 {request.traveler.location} • {getTimeAgo(request.timestamp)}
                        </p>
                      </div>
                    </div>
                    {request.message && (
                      <div className="request-message">
                        <p>"{request.message}"</p>
                      </div>
                    )}
                    <div className="request-actions">
                      <button 
                        className="request-button accept"
                        onClick={() => handleAcceptConnection(request.id)}
                      >
                        ✓ Accept
                      </button>
                      <button 
                        className="request-button reject"
                        onClick={() => handleRejectConnection(request.id)}
                      >
                        ✕ Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {connectedTravelers.length > 0 && (
            <div className="connections-group">
              <h2 className="connections-title">Your Connections ({connectedTravelers.length})</h2>
              <div className="connections-grid">
                {connectedTravelers.map(traveler => (
                  <div key={traveler.id} className="connection-card">
                    <div className="connection-avatar">{traveler.avatar}</div>
                    <h3 className="connection-name">{traveler.name}</h3>
                    <p className="connection-location">{traveler.location}</p>
                    <div className="connection-overlap">
                      🔄 {traveler.overlap} days overlap
                    </div>
                    <div className="connection-actions">
                      <button className="connection-button">💬 Message</button>
                      <button className="connection-button">📅 Plan Together</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {connectionRequests.length === 0 && connectedTravelers.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon">🤝</span>
              <h3>No connections yet</h3>
              <p>Start connecting with travelers in the Discover tab!</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Overlapping Tab */}
      {activeTab === 'overlapping' && (
        <motion.div
          className="overlapping-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="overlapping-header">
            <h2>Overlapping Activities</h2>
            <p className="overlapping-subtitle">
              See what others are planning at the same time
            </p>
          </div>

          {overlappingActivities.length > 0 ? (
            <div className="overlapping-list">
              {overlappingActivities.map(activity => (
                <div key={activity.id} className="overlap-card">
                  <div className="overlap-header">
                    <div className="overlap-time">
                      <span className="overlap-date">
                        {activity.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="overlap-clock">{activity.time}</span>
                    </div>
                    <div className="overlap-info">
                      <h3 className="overlap-name">{activity.name}</h3>
                      <p className="overlap-location">📍 {activity.location}</p>
                    </div>
                  </div>

                  <div className="overlap-travelers">
                    <h4 className="travelers-heading">
                      {activity.travelers.filter(t => t.going).length} travelers planning to go:
                    </h4>
                    <div className="travelers-avatars">
                      {activity.travelers.map(traveler => (
                        <div 
                          key={traveler.id} 
                          className={`traveler-avatar-sm ${traveler.going ? 'going' : 'maybe'}`}
                          title={`${traveler.name} - ${traveler.going ? 'Going' : 'Maybe'}`}
                        >
                          {traveler.avatar}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="overlap-actions">
                    <button className="overlap-button primary">
                      ✓ I'm going too
                    </button>
                    <button className="overlap-button secondary">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">📍</span>
              <h3>No overlapping activities yet</h3>
              <p>When travelers plan similar activities, they'll appear here</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Safety Tab */}
      {activeTab === 'safety' && (
        <motion.div
          className="safety-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="safety-header">
            <h2>Safety & Trust</h2>
            <p className="safety-subtitle">Your safety is our priority</p>
          </div>

          <div className="safety-grid">
            <div className="safety-card">
              <div className="safety-icon">🛡️</div>
              <h3>Your Trust Score</h3>
              <div className="trust-score-display">
                <span className="trust-score-number" style={{ color: getTrustScoreColor(currentUser.trustScore || 85) }}>
                  {currentUser.trustScore || 85}
                </span>
                <span className="trust-score-label">/100</span>
              </div>
              <p className="trust-score-desc">
                Based on verifications, reviews, and account activity
              </p>
              <button className="safety-button">Improve Score</button>
            </div>

            <div className="safety-card">
              <div className="safety-icon">✓</div>
              <h3>Verifications</h3>
              <div className="verifications-list">
                <div className="verification-item verified">
                  <span>✓</span>
                  <span>Email Verified</span>
                </div>
                <div className="verification-item verified">
                  <span>✓</span>
                  <span>Phone Verified</span>
                </div>
                <div className="verification-item unverified">
                  <span>○</span>
                  <span>Government ID</span>
                </div>
                <div className="verification-item unverified">
                  <span>○</span>
                  <span>Social Media</span>
                </div>
              </div>
              <button className="safety-button">Add Verifications</button>
            </div>

            <div className="safety-card">
              <div className="safety-icon">🚫</div>
              <h3>Blocked Users</h3>
              {blockedUsers.length > 0 ? (
                <div className="blocked-list">
                  {blockedUsers.map(userId => (
                    <div key={userId} className="blocked-item">
                      <span>User #{userId}</span>
                      <button onClick={() => handleUnblockUser(userId)}>Unblock</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No blocked users</p>
              )}
            </div>

            <div className="safety-card">
              <div className="safety-icon">⚠️</div>
              <h3>Safety Tips</h3>
              <ul className="safety-tips">
                <li>Always meet in public places first</li>
                <li>Share your plans with friends/family</li>
                <li>Trust your instincts</li>
                <li>Verify traveler profiles before connecting</li>
                <li>Report suspicious behavior immediately</li>
              </ul>
            </div>
          </div>

          <div className="safety-actions">
            <button className="safety-action-button">📚 Safety Guidelines</button>
            <button className="safety-action-button">📞 Emergency Contacts</button>
            <button className="safety-action-button">🚨 Report an Issue</button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default WorkspaceCommunity
