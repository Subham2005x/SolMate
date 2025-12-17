import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './WorkspaceMemories.css'

function WorkspaceMemories({ tripData }) {
  const [activeTab, setActiveTab] = useState('photos') // photos, journal, highlights
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  // Mock data for memories
  const [photos] = useState([
    { id: 1, url: '🗼', caption: 'Tokyo Tower at sunset', date: '2024-03-15', likes: 24, location: 'Tokyo Tower' },
    { id: 2, url: '🍣', caption: 'Amazing sushi dinner', date: '2024-03-15', likes: 18, location: 'Tsukiji Market' },
    { id: 3, url: '⛩️', caption: 'Peaceful temple visit', date: '2024-03-16', likes: 32, location: 'Senso-ji Temple' },
    { id: 4, url: '🌸', caption: 'Cherry blossoms in full bloom', date: '2024-03-16', likes: 45, location: 'Ueno Park' },
    { id: 5, url: '🍜', caption: 'Best ramen ever!', date: '2024-03-17', likes: 21, location: 'Ichiran Ramen' },
    { id: 6, url: '🎨', caption: 'Digital art museum', date: '2024-03-17', likes: 38, location: 'teamLab Borderless' },
    { id: 7, url: '🚦', caption: 'Iconic Shibuya crossing', date: '2024-03-18', likes: 29, location: 'Shibuya' },
    { id: 8, url: '🎮', caption: 'Akihabara exploration', date: '2024-03-18', likes: 15, location: 'Akihabara' },
  ])

  const [journalEntries] = useState([
    {
      id: 1,
      date: '2024-03-15',
      title: 'First Day in Tokyo',
      content: 'Arrived in Tokyo this morning. The energy of this city is incredible! Started with a visit to Tokyo Tower and ended with the most amazing sushi dinner. Can\'t wait to explore more tomorrow.',
      mood: '😊',
      weather: '☀️'
    },
    {
      id: 2,
      date: '2024-03-16',
      title: 'Temple Hopping',
      content: 'Spent the day visiting temples and shrines. Senso-ji Temple was absolutely beautiful and so peaceful despite all the tourists. The cherry blossoms at Ueno Park were stunning - perfect timing!',
      mood: '🥰',
      weather: '🌤️'
    },
    {
      id: 3,
      date: '2024-03-17',
      title: 'Art and Culture',
      content: 'Today was all about art and technology. teamLab Borderless blew my mind - the digital installations were mesmerizing. Had amazing ramen for lunch. Tokyo continues to surprise me!',
      mood: '🤩',
      weather: '☁️'
    },
  ])

  const [highlights] = useState([
    { id: 1, title: 'Best Meal', description: 'Omakase sushi at Sushi Dai', icon: '🍣', category: 'food' },
    { id: 2, title: 'Favorite Place', description: 'Senso-ji Temple at sunrise', icon: '⛩️', category: 'place' },
    { id: 3, title: 'Hidden Gem', description: 'Small ramen shop in Shinjuku', icon: '💎', category: 'discovery' },
    { id: 4, title: 'Funniest Moment', description: 'Getting lost in Shibuya station', icon: '😂', category: 'memory' },
    { id: 5, title: 'Most Beautiful', description: 'Cherry blossoms at dawn', icon: '🌸', category: 'nature' },
    { id: 6, title: 'Best Experience', description: 'Traditional tea ceremony', icon: '🍵', category: 'culture' },
  ])

  const handleUploadPhoto = () => {
    // TODO: Backend API call to upload photo
    console.log('Upload photo')
  }

  const handleDeletePhoto = (photoId) => {
    // TODO: Backend API call to delete photo
    console.log('Delete photo:', photoId)
  }

  return (
    <div className="workspace-memories">
      <div className="memories-header">
        <div className="header-left">
          <h1>Trip Memories</h1>
          <p className="header-subtitle">Capture and relive your journey</p>
        </div>
        {activeTab === 'photos' && (
          <button className="upload-photo-button" onClick={handleUploadPhoto}>
            <span>📸 Upload Photo</span>
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="memories-tabs">
        <button
          className={`tab-button ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
        >
          <span className="tab-icon">📸</span>
          <span>Photos ({photos.length})</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'journal' ? 'active' : ''}`}
          onClick={() => setActiveTab('journal')}
        >
          <span className="tab-icon">📔</span>
          <span>Journal ({journalEntries.length})</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'highlights' ? 'active' : ''}`}
          onClick={() => setActiveTab('highlights')}
        >
          <span className="tab-icon">⭐</span>
          <span>Highlights</span>
        </button>
      </div>

      {/* Photos Tab */}
      {activeTab === 'photos' && (
        <motion.div
          className="photos-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="photos-grid">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="photo-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="photo-image">
                  <div className="photo-emoji">{photo.url}</div>
                </div>
                <div className="photo-info">
                  <p className="photo-caption">{photo.caption}</p>
                  <div className="photo-meta">
                    <span className="photo-location">📍 {photo.location}</span>
                    <span className="photo-likes">❤️ {photo.likes}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Journal Tab */}
      {activeTab === 'journal' && (
        <motion.div
          className="journal-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="journal-header">
            <button className="add-entry-button">
              + New Entry
            </button>
          </div>

          <div className="journal-entries">
            {journalEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                className="journal-entry-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="entry-date-badge">
                  <span className="badge-day">{new Date(entry.date).getDate()}</span>
                  <span className="badge-month">
                    {new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </div>

                <div className="entry-content">
                  <div className="entry-header">
                    <h3>{entry.title}</h3>
                    <div className="entry-icons">
                      <span title="Mood">{entry.mood}</span>
                      <span title="Weather">{entry.weather}</span>
                    </div>
                  </div>
                  <p className="entry-text">{entry.content}</p>
                  <div className="entry-actions">
                    <button className="entry-action-button">✏️ Edit</button>
                    <button className="entry-action-button">🗑️ Delete</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Highlights Tab */}
      {activeTab === 'highlights' && (
        <motion.div
          className="highlights-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="highlights-grid">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.id}
                className={`highlight-card ${highlight.category}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="highlight-icon">{highlight.icon}</div>
                <h3 className="highlight-title">{highlight.title}</h3>
                <p className="highlight-description">{highlight.description}</p>
                <span className="highlight-badge">{highlight.category}</span>
              </motion.div>
            ))}
          </div>

          <div className="add-highlight-card">
            <div className="add-highlight-icon">✨</div>
            <h3>Add a Highlight</h3>
            <p>Capture your favorite moments from this trip</p>
            <button className="add-highlight-button">+ Add Highlight</button>
          </div>
        </motion.div>
      )}

      {/* Photo Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="photo-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>
                ✕
              </button>
              
              <div className="lightbox-image">
                <div className="lightbox-emoji">{selectedPhoto.url}</div>
              </div>

              <div className="lightbox-info">
                <h3>{selectedPhoto.caption}</h3>
                <div className="lightbox-meta">
                  <span>📍 {selectedPhoto.location}</span>
                  <span>📅 {selectedPhoto.date}</span>
                  <span>❤️ {selectedPhoto.likes} likes</span>
                </div>
                <div className="lightbox-actions">
                  <button className="lightbox-action">💬 Comment</button>
                  <button className="lightbox-action">❤️ Like</button>
                  <button className="lightbox-action">📤 Share</button>
                  <button 
                    className="lightbox-action danger"
                    onClick={() => handleDeletePhoto(selectedPhoto.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default WorkspaceMemories
