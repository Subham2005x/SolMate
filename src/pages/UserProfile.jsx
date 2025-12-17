import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './UserProfile.css'

function UserProfile() {
  const { userId } = useParams() // If viewing another user's profile
  const navigate = useNavigate()
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark-mode')
  })
  
  // Determine if viewing own profile or another user's
  const currentUserId = 'user-1' // TODO: Get from auth context
  const isOwnProfile = !userId || userId === currentUserId
  const [isEditMode, setIsEditMode] = useState(false)
  const [activeTab, setActiveTab] = useState('profile') // profile, settings, privacy
  
  // Mock current user data - TODO: Replace with API call
  const [userData, setUserData] = useState({
    id: 'user-1',
    email: 'subham@example.com',
    fullName: 'Subham Nabik',
    displayName: 'subham_travels',
    phone: '+1 (555) 123-4567',
    gender: 'Male',
    dateOfBirth: '1998-05-15',
    location: 'San Francisco, CA',
    avatar: '👤',
    languagesSpoken: ['English', 'Hindi', 'Japanese'],
    bio: 'Adventure seeker and culture enthusiast. Love exploring hidden gems and meeting locals.',
    travelStyle: ['Adventure', 'Budget', 'Cultural', 'Group'],
    pastTripsCount: 12,
    upcomingTripsCount: 2,
    rating: 4.8,
    reviewsCount: 24,
    verifications: {
      email: true,
      phone: true,
      government: false
    },
    trustScore: 92,
    joinedDate: '2023-01-15',
    // Settings
    preferences: {
      language: 'English',
      notifications: {
        email: true,
        push: true,
        tripUpdates: true,
        messages: true,
        groupInvites: true,
        reminders: true
      },
      privacy: {
        profileVisibility: 'everyone', // everyone, friends, private
        messagePermission: 'everyone', // everyone, friends, none
        showEmail: false,
        showPhone: false,
        showLastSeen: true
      }
    }
  })

  // Mock other user data for public profile view
  const publicUserData = {
    id: userId || 'user-2',
    fullName: 'Sarah Kim',
    displayName: 'wanderlust_sarah',
    avatar: '👤',
    bio: 'Solo traveler turned group trip organizer. Always up for new adventures!',
    travelStyle: ['Adventure', 'Luxury', 'Cultural'],
    pastTripsCount: 18,
    upcomingTripsCount: 3,
    rating: 4.9,
    reviewsCount: 31,
    verifications: {
      email: true,
      phone: true,
      government: true
    },
    trustScore: 96,
    joinedDate: '2022-08-20',
    location: 'New York, NY',
    languagesSpoken: ['English', 'Korean', 'Spanish']
  }

  const profileData = isOwnProfile ? userData : publicUserData

  // Form state for editing
  const [formData, setFormData] = useState({ ...userData })

  useEffect(() => {
    // Listen for dark mode changes
    const observer = new MutationObserver(() => {
      setDarkMode(document.documentElement.classList.contains('dark-mode'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleLanguagesChange = (e) => {
    const languages = e.target.value.split(',').map(lang => lang.trim())
    setFormData(prev => ({ ...prev, languagesSpoken: languages }))
  }

  const handleTravelStyleToggle = (style) => {
    setFormData(prev => ({
      ...prev,
      travelStyle: prev.travelStyle.includes(style)
        ? prev.travelStyle.filter(s => s !== style)
        : [...prev.travelStyle, style]
    }))
  }

  const handleSave = () => {
    // TODO: API call to save profile
    setUserData(formData)
    setIsEditMode(false)
    console.log('Saving profile:', formData)
  }

  const handleCancel = () => {
    setFormData({ ...userData })
    setIsEditMode(false)
  }

  const handleSettingChange = (category, key, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: {
          ...prev.preferences[category],
          [key]: value
        }
      }
    }))
  }

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out...')
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  const calculateProfileCompletion = () => {
    const fields = [
      profileData.fullName,
      profileData.displayName,
      profileData.phone,
      profileData.dateOfBirth,
      profileData.location,
      profileData.bio,
      profileData.languagesSpoken?.length > 0,
      profileData.travelStyle?.length > 0
    ]
    const completed = fields.filter(Boolean).length
    return Math.round((completed / fields.length) * 100)
  }

  const travelStyleOptions = [
    { id: 'adventure', label: 'Adventure', icon: '⛰️' },
    { id: 'budget', label: 'Budget', icon: '💰' },
    { id: 'luxury', label: 'Luxury', icon: '✨' },
    { id: 'cultural', label: 'Cultural', icon: '🎭' },
    { id: 'group', label: 'Group', icon: '👥' },
    { id: 'solo', label: 'Solo', icon: '🎒' },
    { id: 'food', label: 'Foodie', icon: '🍜' },
    { id: 'nature', label: 'Nature', icon: '🌿' }
  ]

  return (
    <div className={`profile-page ${darkMode ? 'dark' : ''}`}>
      {/* Header with back button */}
      <header className="profile-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <span>←</span>
          <span>Back</span>
        </button>
        <h1>{isOwnProfile ? 'My Profile' : `${profileData.fullName}'s Profile`}</h1>
        {isOwnProfile && !isEditMode && (
          <button className="edit-btn" onClick={() => setIsEditMode(true)}>
            <span>✏️</span>
            <span>Edit</span>
          </button>
        )}
        {isEditMode && (
          <div className="edit-actions">
            <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
            <button className="btn-save" onClick={handleSave}>Save Changes</button>
          </div>
        )}
      </header>

      <div className="profile-content">
        {/* Left Column - Profile Card */}
        <aside className="profile-sidebar">
          <motion.div 
            className="profile-card"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Avatar Section */}
            <div className="profile-avatar-section">
              <div className="avatar-wrapper">
                <div className="profile-avatar-large">
                  <span>{profileData.avatar}</span>
                </div>
                {isEditMode && (
                  <button className="avatar-edit-btn" title="Change photo">
                    <span>📷</span>
                  </button>
                )}
              </div>
              
              {/* Verification Badges */}
              <div className="verification-badges">
                {profileData.verifications.email && (
                  <span className="badge verified" title="Email verified">
                    <span>✓</span> Email
                  </span>
                )}
                {profileData.verifications.phone && (
                  <span className="badge verified" title="Phone verified">
                    <span>✓</span> Phone
                  </span>
                )}
                {profileData.verifications.government && (
                  <span className="badge verified-premium" title="Government ID verified">
                    <span>✓</span> ID
                  </span>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="profile-basic-info">
              <h2 className="profile-name">{profileData.fullName}</h2>
              <p className="profile-username">@{profileData.displayName}</p>
              {profileData.location && (
                <p className="profile-location">
                  <span>📍</span>
                  <span>{profileData.location}</span>
                </p>
              )}
            </div>

            {/* Trust Score */}
            <div className="trust-section">
              <div className="trust-score">
                <div className="trust-circle">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" className="trust-bg" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      className="trust-progress"
                      style={{
                        strokeDasharray: `${profileData.trustScore * 2.51} 251`
                      }}
                    />
                  </svg>
                  <div className="trust-value">{profileData.trustScore}</div>
                </div>
                <div className="trust-label">Trust Score</div>
              </div>
              
              <div className="rating-section">
                <div className="rating-value">
                  <span className="star">⭐</span>
                  <span className="rating-number">{profileData.rating}</span>
                </div>
                <p className="rating-reviews">{profileData.reviewsCount} reviews</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-value">{profileData.pastTripsCount}</div>
                <div className="stat-label">Trips Completed</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-value">{profileData.upcomingTripsCount}</div>
                <div className="stat-label">Upcoming</div>
              </div>
            </div>

            {/* Member Since */}
            <div className="member-since">
              <span>Member since</span>
              <span className="join-date">
                {new Date(profileData.joinedDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </span>
            </div>

            {/* Profile Completion (Own Profile Only) */}
            {isOwnProfile && (
              <div className="profile-completion">
                <div className="completion-header">
                  <span>Profile Completion</span>
                  <span className="completion-percentage">{calculateProfileCompletion()}%</span>
                </div>
                <div className="completion-bar">
                  <div 
                    className="completion-fill" 
                    style={{ width: `${calculateProfileCompletion()}%` }}
                  ></div>
                </div>
              </div>
            )}
          </motion.div>
        </aside>

        {/* Main Content - Tabs */}
        <main className="profile-main">
          {/* Tabs Navigation (Own Profile Only) */}
          {isOwnProfile && (
            <div className="profile-tabs">
              <button 
                className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <span>👤</span>
                <span>Profile</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <span>⚙️</span>
                <span>Settings</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
                onClick={() => setActiveTab('privacy')}
              >
                <span>🔒</span>
                <span>Privacy</span>
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="tab-content"
              >
                {/* Bio Section */}
                <section className="profile-section">
                  <h3 className="section-title">
                    <span>About</span>
                  </h3>
                  {isEditMode ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Tell others about yourself and your travel preferences..."
                      rows={4}
                    />
                  ) : (
                    <p className="profile-bio">{profileData.bio || 'No bio added yet.'}</p>
                  )}
                </section>

                {/* Personal Information */}
                <section className="profile-section">
                  <h3 className="section-title">Personal Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label className="info-label">Full Name</label>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      ) : (
                        <p className="info-value">{profileData.fullName}</p>
                      )}
                    </div>

                    <div className="info-item">
                      <label className="info-label">Display Name</label>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="displayName"
                          value={formData.displayName}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      ) : (
                        <p className="info-value">@{profileData.displayName}</p>
                      )}
                    </div>

                    {isOwnProfile && (
                      <>
                        <div className="info-item">
                          <label className="info-label">Email</label>
                          <p className="info-value">{profileData.email}</p>
                          <span className="info-hint">Cannot be changed</span>
                        </div>

                        <div className="info-item">
                          <label className="info-label">Phone</label>
                          {isEditMode ? (
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="form-input"
                            />
                          ) : (
                            <p className="info-value">{profileData.phone || 'Not provided'}</p>
                          )}
                        </div>

                        <div className="info-item">
                          <label className="info-label">Gender</label>
                          {isEditMode ? (
                            <select
                              name="gender"
                              value={formData.gender}
                              onChange={handleInputChange}
                              className="form-select"
                            >
                              <option value="">Prefer not to say</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Non-binary">Non-binary</option>
                              <option value="Other">Other</option>
                            </select>
                          ) : (
                            <p className="info-value">{profileData.gender || 'Not specified'}</p>
                          )}
                        </div>

                        <div className="info-item">
                          <label className="info-label">Date of Birth</label>
                          {isEditMode ? (
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleInputChange}
                              className="form-input"
                            />
                          ) : (
                            <p className="info-value">
                              {profileData.dateOfBirth 
                                ? new Date(profileData.dateOfBirth).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })
                                : 'Not provided'
                              }
                            </p>
                          )}
                        </div>
                      </>
                    )}

                    <div className="info-item">
                      <label className="info-label">Location</label>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="City, Country"
                        />
                      ) : (
                        <p className="info-value">{profileData.location || 'Not specified'}</p>
                      )}
                    </div>

                    <div className="info-item">
                      <label className="info-label">Languages Spoken</label>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={formData.languagesSpoken.join(', ')}
                          onChange={handleLanguagesChange}
                          className="form-input"
                          placeholder="English, Spanish, French"
                        />
                      ) : (
                        <p className="info-value">
                          {profileData.languagesSpoken?.length > 0 
                            ? profileData.languagesSpoken.join(', ') 
                            : 'Not specified'
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Travel Style */}
                <section className="profile-section">
                  <h3 className="section-title">Travel Style</h3>
                  <div className="travel-style-tags">
                    {travelStyleOptions.map(style => {
                      const isSelected = (isEditMode ? formData : profileData)
                        .travelStyle?.some(s => s.toLowerCase() === style.id)
                      
                      return isEditMode ? (
                        <button
                          key={style.id}
                          type="button"
                          className={`style-tag ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleTravelStyleToggle(style.label)}
                        >
                          <span>{style.icon}</span>
                          <span>{style.label}</span>
                        </button>
                      ) : isSelected ? (
                        <span key={style.id} className="style-tag selected">
                          <span>{style.icon}</span>
                          <span>{style.label}</span>
                        </span>
                      ) : null
                    })}
                  </div>
                </section>
              </motion.div>
            )}

            {/* Settings Tab (Own Profile Only) */}
            {isOwnProfile && activeTab === 'settings' && (
              <motion.div
                key="settings-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="tab-content"
              >
                {/* Preferences */}
                <section className="profile-section">
                  <h3 className="section-title">Preferences</h3>
                  
                  <div className="settings-group">
                    <label className="setting-item">
                      <span className="setting-label">
                        <span className="setting-icon">🌐</span>
                        <span>Language</span>
                      </span>
                      <select
                        value={formData.preferences.language}
                        onChange={(e) => handleSettingChange('language', null, e.target.value)}
                        className="form-select compact"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Japanese">Japanese</option>
                      </select>
                    </label>

                    <label className="setting-item">
                      <span className="setting-label">
                        <span className="setting-icon">{darkMode ? '☀️' : '🌙'}</span>
                        <span>Theme</span>
                      </span>
                      <button 
                        className="theme-toggle-btn"
                        onClick={() => {
                          const newMode = !darkMode
                          setDarkMode(newMode)
                          localStorage.setItem('darkMode', JSON.stringify(newMode))
                          if (newMode) {
                            document.documentElement.classList.add('dark-mode')
                          } else {
                            document.documentElement.classList.remove('dark-mode')
                          }
                        }}
                      >
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                      </button>
                    </label>
                  </div>
                </section>

                {/* Notifications */}
                <section className="profile-section">
                  <h3 className="section-title">Notifications</h3>
                  
                  <div className="settings-group">
                    <label className="setting-item checkbox">
                      <span className="setting-label">
                        <span className="setting-icon">📧</span>
                        <span>Email Notifications</span>
                      </span>
                      <input
                        type="checkbox"
                        checked={formData.preferences.notifications.email}
                        onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                        className="form-checkbox"
                      />
                    </label>

                    <label className="setting-item checkbox">
                      <span className="setting-label">
                        <span className="setting-icon">🔔</span>
                        <span>Push Notifications</span>
                      </span>
                      <input
                        type="checkbox"
                        checked={formData.preferences.notifications.push}
                        onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                        className="form-checkbox"
                      />
                    </label>

                    <label className="setting-item checkbox">
                      <span className="setting-label">
                        <span className="setting-icon">✈️</span>
                        <span>Trip Updates</span>
                      </span>
                      <input
                        type="checkbox"
                        checked={formData.preferences.notifications.tripUpdates}
                        onChange={(e) => handleSettingChange('notifications', 'tripUpdates', e.target.checked)}
                        className="form-checkbox"
                      />
                    </label>

                    <label className="setting-item checkbox">
                      <span className="setting-label">
                        <span className="setting-icon">💬</span>
                        <span>Messages</span>
                      </span>
                      <input
                        type="checkbox"
                        checked={formData.preferences.notifications.messages}
                        onChange={(e) => handleSettingChange('notifications', 'messages', e.target.checked)}
                        className="form-checkbox"
                      />
                    </label>

                    <label className="setting-item checkbox">
                      <span className="setting-label">
                        <span className="setting-icon">👥</span>
                        <span>Group Invites</span>
                      </span>
                      <input
                        type="checkbox"
                        checked={formData.preferences.notifications.groupInvites}
                        onChange={(e) => handleSettingChange('notifications', 'groupInvites', e.target.checked)}
                        className="form-checkbox"
                      />
                    </label>

                    <label className="setting-item checkbox">
                      <span className="setting-label">
                        <span className="setting-icon">⏰</span>
                        <span>Reminders</span>
                      </span>
                      <input
                        type="checkbox"
                        checked={formData.preferences.notifications.reminders}
                        onChange={(e) => handleSettingChange('notifications', 'reminders', e.target.checked)}
                        className="form-checkbox"
                      />
                    </label>
                  </div>
                </section>

                {/* Account Actions */}
                <section className="profile-section">
                  <h3 className="section-title">Account</h3>
                  
                  <div className="account-actions">
                    <button className="action-btn logout" onClick={handleLogout}>
                      <span>🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                </section>
              </motion.div>
            )}

            {/* Privacy Tab (Own Profile Only) */}
            {isOwnProfile && activeTab === 'privacy' && (
              <motion.div
                key="privacy-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="tab-content"
              >
                <section className="profile-section">
                  <h3 className="section-title">Privacy Controls</h3>
                  
                  <div className="settings-group">
                    <label className="setting-item">
                      <span className="setting-label">
                        <span className="setting-icon">👁️</span>
                        <div className="setting-text">
                          <span>Profile Visibility</span>
                          <span className="setting-hint">Who can view your profile</span>
                        </div>
                      </span>
                      <select
                        value={formData.preferences.privacy.profileVisibility}
                        onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                        className="form-select compact"
                      >
                        <option value="everyone">Everyone</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Private</option>
                      </select>
                    </label>

                    <label className="setting-item">
                      <span className="setting-label">
                        <span className="setting-icon">💬</span>
                        <div className="setting-text">
                          <span>Message Permission</span>
                          <span className="setting-hint">Who can send you messages</span>
                        </div>
                      </span>
                      <select
                        value={formData.preferences.privacy.messagePermission}
                        onChange={(e) => handleSettingChange('privacy', 'messagePermission', e.target.value)}
                        className="form-select compact"
                      >
                        <option value="everyone">Everyone</option>
                        <option value="friends">Friends Only</option>
                        <option value="none">No one</option>
                      </select>
                    </label>

                    <label className="setting-item checkbox">
                      <span className="setting-label">
                        <span className="setting-icon">📧</span>
                        <div className="setting-text">
                          <span>Show Email</span>
                          <span className="setting-hint">Display on public profile</span>
                        </div>
                      </span>
                      <input
                        type="checkbox"
                        checked={formData.preferences.privacy.showEmail}
                        onChange={(e) => handleSettingChange('privacy', 'showEmail', e.target.checked)}
                        className="form-checkbox"
                      />
                    </label>

                    <label className="setting-item checkbox">
                      <span className="setting-label">
                        <span className="setting-icon">📱</span>
                        <div className="setting-text">
                          <span>Show Phone</span>
                          <span className="setting-hint">Display on public profile</span>
                        </div>
                      </span>
                      <input
                        type="checkbox"
                        checked={formData.preferences.privacy.showPhone}
                        onChange={(e) => handleSettingChange('privacy', 'showPhone', e.target.checked)}
                        className="form-checkbox"
                      />
                    </label>

                    <label className="setting-item checkbox">
                      <span className="setting-label">
                        <span className="setting-icon">🟢</span>
                        <div className="setting-text">
                          <span>Show Last Seen</span>
                          <span className="setting-hint">Let others see when you're online</span>
                        </div>
                      </span>
                      <input
                        type="checkbox"
                        checked={formData.preferences.privacy.showLastSeen}
                        onChange={(e) => handleSettingChange('privacy', 'showLastSeen', e.target.checked)}
                        className="form-checkbox"
                      />
                    </label>
                  </div>
                </section>

                {/* Data & Security */}
                <section className="profile-section">
                  <h3 className="section-title">Data & Security</h3>
                  
                  <div className="account-actions">
                    <button className="action-btn secondary">
                      <span>📥</span>
                      <span>Download My Data</span>
                    </button>
                    <button className="action-btn secondary">
                      <span>🔐</span>
                      <span>Change Password</span>
                    </button>
                    <button className="action-btn danger">
                      <span>⚠️</span>
                      <span>Delete Account</span>
                    </button>
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default UserProfile
