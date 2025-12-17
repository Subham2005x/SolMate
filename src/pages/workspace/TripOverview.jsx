import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './TripOverview.css'

function TripOverview({ tripData }) {
  const navigate = useNavigate()

  const calculateProgress = () => {
    // TODO: Calculate based on actual data from backend
    return {
      itinerary: { completed: 8, total: 12, percentage: 67 },
      budget: { allocated: 45, percentage: 45 },
      group: { confirmed: 3, total: 4, percentage: 75 }
    }
  }

  const progress = calculateProgress()
  const overallProgress = Math.round(
    (progress.itinerary.percentage + progress.budget.percentage + progress.group.percentage) / 3
  )

  const quickActions = [
    { id: 'ai', icon: '💬', label: 'Ask AI', action: 'assistant', color: 'green' },
    { id: 'plan', icon: '📅', label: 'Plan Day', action: 'itinerary', color: 'blue' },
    { id: 'budget', icon: '💰', label: 'Add Expense', action: 'budget', color: 'orange' },
    { id: 'discover', icon: '🔍', label: 'Discover', action: 'discover', color: 'purple', soon: true }
  ]

  const handleQuickAction = (action, soon) => {
    if (soon) return
    navigate(`/workspace/${tripData.id}/${action}`)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 }
    })
  }

  return (
    <div className="trip-overview">
      {/* Hero Card */}
      <motion.div
        className="overview-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hero-background">
          <div className="hero-emoji">🏯</div>
        </div>
        <div className="hero-content">
          <div className="hero-header">
            <h1>{tripData.destination}</h1>
            <div className="hero-badges">
              <span className={`status-badge status-${tripData.status}`}>
                {tripData.status}
              </span>
              <span className="type-badge">{tripData.type}</span>
            </div>
          </div>
          <div className="hero-details">
            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <span className="detail-text">
                {new Date(tripData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(tripData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <span className="detail-divider">•</span>
            <div className="detail-item">
              <span className="detail-icon">⏱️</span>
              <span className="detail-text">{tripData.duration} days</span>
            </div>
            {tripData.type === 'group' && (
              <>
                <span className="detail-divider">•</span>
                <div className="detail-item">
                  <span className="detail-icon">👥</span>
                  <span className="detail-text">{tripData.travelers} travelers</span>
                </div>
              </>
            )}
          </div>
          <div className="hero-weather">
            <span className="weather-icon">🌤️</span>
            <span className="weather-text">
              {tripData.weather.temp} • {tripData.weather.condition}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="quick-stats"
        custom={1}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">${tripData.budget.toLocaleString()}</div>
            <div className="stat-label">Budget</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📍</div>
          <div className="stat-content">
            <div className="stat-value">12</div>
            <div className="stat-label">Places Saved</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-value">{progress.itinerary.completed}</div>
            <div className="stat-label">Days Planned</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="quick-actions-section"
        custom={2}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <button
              key={action.id}
              className={`quick-action-card color-${action.color} ${action.soon ? 'soon' : ''}`}
              onClick={() => handleQuickAction(action.action, action.soon)}
              disabled={action.soon}
            >
              <div className="action-icon">{action.icon}</div>
              <div className="action-label">{action.label}</div>
              {action.soon && <div className="action-soon-tag">Soon</div>}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        className="progress-overview"
        custom={3}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="progress-header">
          <h2 className="section-title">Trip Progress</h2>
          <div className="overall-progress">
            <span className="progress-percentage">{overallProgress}%</span>
            <span className="progress-label">Complete</span>
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar-track">
            <div 
              className="progress-bar-fill"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="progress-items">
          <div className="progress-item">
            <div className="progress-item-header">
              <span className="progress-item-icon">📅</span>
              <span className="progress-item-label">Itinerary</span>
            </div>
            <div className="progress-item-stats">
              <span className="progress-item-value">
                {progress.itinerary.completed}/{progress.itinerary.total} days planned
              </span>
              <span className="progress-item-percentage">
                {progress.itinerary.percentage}%
              </span>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-item-header">
              <span className="progress-item-icon">💰</span>
              <span className="progress-item-label">Budget</span>
            </div>
            <div className="progress-item-stats">
              <span className="progress-item-value">
                {progress.budget.allocated}% allocated
              </span>
              <span className="progress-item-percentage">
                {progress.budget.percentage}%
              </span>
            </div>
          </div>

          {tripData.type === 'group' && (
            <div className="progress-item">
              <div className="progress-item-header">
                <span className="progress-item-icon">👥</span>
                <span className="progress-item-label">Group</span>
              </div>
              <div className="progress-item-stats">
                <span className="progress-item-value">
                  {progress.group.confirmed}/{progress.group.total} confirmed
                </span>
                <span className="progress-item-percentage">
                  {progress.group.percentage}%
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Group Members (if group trip) */}
      {tripData.type === 'group' && (
        <motion.div
          className="group-members-section"
          custom={4}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="section-header">
            <h2 className="section-title">Travel Buddies</h2>
            <button className="invite-button">+ Invite</button>
          </div>
          <div className="members-grid">
            {tripData.members.map((member) => (
              <div key={member.id} className={`member-card ${member.role}`}>
                <div className="member-avatar">{member.avatar}</div>
                <div className="member-info">
                  <div className="member-name">{member.name}</div>
                  <div className="member-role">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Placeholder for upcoming features */}
      <motion.div
        className="upcoming-features-hint"
        custom={5}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hint-icon">✨</div>
        <div className="hint-content">
          <h4>More features coming soon!</h4>
          <p>We're building Discover, Safety & SOS, and Memories for you.</p>
        </div>
      </motion.div>
    </div>
  )
}

export default TripOverview
