import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ProfileModal.css'

function ProfileModal({ isOpen, onClose, userId, isOwnProfile = false, onAdminAction }) {
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark-mode')
  })

  // Mock user data - TODO: Replace with API call
  const mockUsers = {
    'user-1': {
      id: 'user-1',
      fullName: 'Subham Nabik',
      displayName: 'subham_travels',
      avatar: '👤',
      bio: 'Adventure seeker and culture enthusiast. Love exploring hidden gems and meeting locals.',
      travelStyle: ['Adventure', 'Budget', 'Cultural', 'Group'],
      pastTripsCount: 12,
      upcomingTripsCount: 2,
      rating: 4.8,
      reviewsCount: 24,
      verifications: { email: true, phone: true, government: false },
      trustScore: 92,
      joinedDate: '2023-01-15',
      location: 'San Francisco, CA',
      languagesSpoken: ['English', 'Hindi', 'Japanese']
    },
    'user-2': {
      id: 'user-2',
      fullName: 'Sarah Kim',
      displayName: 'wanderlust_sarah',
      avatar: '👤',
      bio: 'Solo traveler turned group trip organizer. Always up for new adventures!',
      travelStyle: ['Adventure', 'Luxury', 'Cultural'],
      pastTripsCount: 18,
      upcomingTripsCount: 3,
      rating: 4.9,
      reviewsCount: 31,
      verifications: { email: true, phone: true, government: true },
      trustScore: 96,
      joinedDate: '2022-08-20',
      location: 'New York, NY',
      languagesSpoken: ['English', 'Korean', 'Spanish']
    },
    'user-3': {
      id: 'user-3',
      fullName: 'Alex Park',
      displayName: 'alex_explorer',
      avatar: '👤',
      bio: 'Nature lover and hiking enthusiast. Looking to explore mountains around the world.',
      travelStyle: ['Adventure', 'Nature', 'Budget', 'Solo'],
      pastTripsCount: 8,
      upcomingTripsCount: 1,
      rating: 4.6,
      reviewsCount: 15,
      verifications: { email: true, phone: false, government: false },
      trustScore: 85,
      joinedDate: '2023-05-10',
      location: 'Seattle, WA',
      languagesSpoken: ['English', 'French']
    },
    'user-4': {
      id: 'user-4',
      fullName: 'Maria Lee',
      displayName: 'maria_wanderer',
      avatar: '👤',
      bio: 'Food blogger and cultural explorer. Love trying local cuisines!',
      travelStyle: ['Foodie', 'Cultural', 'Group'],
      pastTripsCount: 5,
      upcomingTripsCount: 1,
      rating: 4.7,
      reviewsCount: 8,
      verifications: { email: true, phone: true, government: false },
      trustScore: 88,
      joinedDate: '2024-01-20',
      location: 'Los Angeles, CA',
      languagesSpoken: ['English', 'Spanish']
    }
  }

  const userData = mockUsers[userId] || mockUsers['user-1']
  const [showAdminMenu, setShowAdminMenu] = useState(false)

  useEffect(() => {
    // Listen for dark mode changes
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains('dark-mode'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const travelStyleIcons = {
    adventure: '⛰️',
    budget: '💰',
    luxury: '✨',
    cultural: '🎭',
    group: '👥',
    solo: '🎒',
    foodie: '🍜',
    nature: '🌿'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={`profile-modal-backdrop ${darkMode ? 'dark' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={`profile-modal ${darkMode ? 'dark' : ''}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button className="modal-close-btn" onClick={onClose} aria-label="Close">
              ✕
            </button>

            {/* Admin Menu (if admin viewing member) */}
            {onAdminAction && !isOwnProfile && (
              <div className="admin-actions-container">
                <button 
                  className="admin-menu-toggle"
                  onClick={() => setShowAdminMenu(!showAdminMenu)}
                >
                  <span>⚙️</span>
                </button>
                {showAdminMenu && (
                  <div className="admin-dropdown">
                    <button 
                      className="admin-action-item promote"
                      onClick={() => {
                        onAdminAction('promote', userId)
                        setShowAdminMenu(false)
                      }}
                    >
                      <span>👑</span>
                      <span>Promote to Admin</span>
                    </button>
                    <button 
                      className="admin-action-item remove"
                      onClick={() => {
                        onAdminAction('remove', userId)
                        setShowAdminMenu(false)
                        onClose()
                      }}
                    >
                      <span>🚫</span>
                      <span>Remove from Trip</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Avatar & Name */}
            <div className="modal-header">
              <div className="modal-avatar-section">
                <div className="modal-avatar">
                  <span>{userData.avatar}</span>
                </div>
                
                {/* Verification Badges */}
                <div className="modal-verification-badges">
                  {userData.verifications.email && (
                    <span className="badge verified" title="Email verified">✓</span>
                  )}
                  {userData.verifications.phone && (
                    <span className="badge verified" title="Phone verified">✓</span>
                  )}
                  {userData.verifications.government && (
                    <span className="badge verified-premium" title="Government ID verified">✓</span>
                  )}
                </div>
              </div>

              <h2 className="modal-name">{userData.fullName}</h2>
              <p className="modal-username">@{userData.displayName}</p>
              
              {userData.location && (
                <p className="modal-location">
                  <span>📍</span>
                  <span>{userData.location}</span>
                </p>
              )}
            </div>

            {/* Trust & Rating */}
            <div className="modal-trust-section">
              <div className="trust-item">
                <div className="trust-circle-small">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" className="trust-bg-small" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      className="trust-progress-small"
                      style={{
                        strokeDasharray: `${userData.trustScore * 2.51} 251`
                      }}
                    />
                  </svg>
                  <div className="trust-value-small">{userData.trustScore}</div>
                </div>
                <div className="trust-label-small">Trust</div>
              </div>

              <div className="rating-item">
                <div className="rating-display">
                  <span className="star-small">⭐</span>
                  <span className="rating-num">{userData.rating}</span>
                </div>
                <p className="rating-count">{userData.reviewsCount} reviews</p>
              </div>

              <div className="trips-item">
                <div className="trips-count">{userData.pastTripsCount}</div>
                <div className="trips-label">Trips</div>
              </div>
            </div>

            {/* Bio */}
            {userData.bio && (
              <div className="modal-section">
                <h3 className="modal-section-title">About</h3>
                <p className="modal-bio">{userData.bio}</p>
              </div>
            )}

            {/* Travel Style */}
            {userData.travelStyle && userData.travelStyle.length > 0 && (
              <div className="modal-section">
                <h3 className="modal-section-title">Travel Style</h3>
                <div className="modal-tags">
                  {userData.travelStyle.map(style => (
                    <span key={style} className="modal-tag">
                      <span>{travelStyleIcons[style.toLowerCase()] || '🌍'}</span>
                      <span>{style}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {userData.languagesSpoken && userData.languagesSpoken.length > 0 && (
              <div className="modal-section">
                <h3 className="modal-section-title">Languages</h3>
                <p className="modal-languages">{userData.languagesSpoken.join(', ')}</p>
              </div>
            )}

            {/* Member Since */}
            <div className="modal-footer">
              <span>Member since</span>
              <span className="modal-join-date">
                {new Date(userData.joinedDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </span>
            </div>

            {/* Action Buttons */}
            {!isOwnProfile && (
              <div className="modal-actions">
                <button className="modal-action-btn primary">
                  <span>💬</span>
                  <span>Send Message</span>
                </button>
                <button className="modal-action-btn secondary">
                  <span>👁️</span>
                  <span>View Full Profile</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProfileModal
