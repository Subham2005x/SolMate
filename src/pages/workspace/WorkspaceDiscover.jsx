import { useState } from 'react'
import { motion } from 'framer-motion'
import './WorkspaceDiscover.css'

function WorkspaceDiscover({ tripData }) {
  const [activeTab, setActiveTab] = useState('recommended') // recommended, saved, nearby
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock data for places
  const [places] = useState([
    { id: 1, name: 'Tokyo Skytree', category: 'attraction', rating: 4.7, reviews: 12453, price: '$$', distance: '2.3 km', image: '🗼', saved: false, description: 'Iconic tower with panoramic city views' },
    { id: 2, name: 'Senso-ji Temple', category: 'attraction', rating: 4.6, reviews: 8921, price: 'Free', distance: '1.8 km', image: '⛩️', saved: true, description: 'Ancient Buddhist temple in Asakusa' },
    { id: 3, name: 'Sushi Dai', category: 'restaurant', rating: 4.8, reviews: 3421, price: '$$$', distance: '3.1 km', image: '🍣', saved: true, description: 'Famous sushi restaurant at Tsukiji' },
    { id: 4, name: 'teamLab Borderless', category: 'attraction', rating: 4.9, reviews: 15632, price: '$$$', distance: '4.5 km', image: '🎨', saved: false, description: 'Digital art museum experience' },
    { id: 5, name: 'Meiji Shrine', category: 'attraction', rating: 4.7, reviews: 7834, price: 'Free', distance: '5.2 km', image: '⛩️', saved: false, description: 'Serene Shinto shrine in forest' },
    { id: 6, name: 'Ichiran Ramen', category: 'restaurant', rating: 4.6, reviews: 5632, price: '$$', distance: '1.2 km', image: '🍜', saved: true, description: 'Solo dining ramen experience' },
    { id: 7, name: 'Shibuya Crossing', category: 'attraction', rating: 4.5, reviews: 9821, price: 'Free', distance: '3.8 km', image: '🚦', saved: false, description: 'World\'s busiest pedestrian crossing' },
    { id: 8, name: 'Harajuku Takeshita Street', category: 'shopping', rating: 4.4, reviews: 6421, price: '$$', distance: '4.2 km', image: '🛍️', saved: false, description: 'Trendy fashion and street food' },
    { id: 9, name: 'Ueno Park', category: 'nature', rating: 4.6, reviews: 4532, price: 'Free', distance: '2.7 km', image: '🌸', saved: true, description: 'Large park with museums and zoo' },
    { id: 10, name: 'Akihabara Electric Town', category: 'shopping', rating: 4.5, reviews: 7234, price: '$$', distance: '3.3 km', image: '🎮', saved: false, description: 'Electronics and anime paradise' },
  ])

  const categories = [
    { id: 'all', label: 'All Places', icon: '🌏' },
    { id: 'attraction', label: 'Attractions', icon: '🗼' },
    { id: 'restaurant', label: 'Restaurants', icon: '🍽️' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'nature', label: 'Nature', icon: '🌿' },
  ]

  const handleToggleSave = (placeId) => {
    // TODO: Backend API call to save/unsave place
    console.log('Toggle save:', placeId)
  }

  const handleAddToItinerary = (placeId) => {
    // TODO: Backend API call to add to itinerary
    console.log('Add to itinerary:', placeId)
  }

  const filteredPlaces = places.filter(place => {
    if (activeTab === 'saved' && !place.saved) return false
    if (selectedCategory !== 'all' && place.category !== selectedCategory) return false
    return true
  })

  return (
    <div className="workspace-discover">
      <div className="discover-header">
        <div className="header-left">
          <h1>Discover Places</h1>
          <p className="header-subtitle">Explore recommended places in {tripData.destination}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="discover-tabs">
        <button
          className={`tab-button ${activeTab === 'recommended' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommended')}
        >
          <span className="tab-icon">✨</span>
          <span>Recommended</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <span className="tab-icon">💾</span>
          <span>Saved ({places.filter(p => p.saved).length})</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'nearby' ? 'active' : ''}`}
          onClick={() => setActiveTab('nearby')}
        >
          <span className="tab-icon">📍</span>
          <span>Nearby</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-chip ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="chip-icon">{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Places Grid */}
      {activeTab === 'nearby' ? (
        <div className="map-placeholder">
          <div className="map-content">
            <div className="map-icon">🗺️</div>
            <h3>Map View</h3>
            <p>Interactive map integration coming soon!</p>
            <p className="map-note">Will show places on Google Maps with pins and directions</p>
          </div>
        </div>
      ) : (
        <motion.div
          className="places-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {filteredPlaces.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No places found</h3>
              <p>Try changing your filters or save some places first</p>
            </div>
          ) : (
            filteredPlaces.map((place, index) => (
              <motion.div
                key={place.id}
                className="place-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="place-image">
                  <div className="place-emoji">{place.image}</div>
                  <button
                    className={`save-button ${place.saved ? 'saved' : ''}`}
                    onClick={() => handleToggleSave(place.id)}
                    title={place.saved ? 'Unsave' : 'Save place'}
                  >
                    {place.saved ? '❤️' : '🤍'}
                  </button>
                </div>

                <div className="place-content">
                  <div className="place-header">
                    <h3 className="place-name">{place.name}</h3>
                    <div className="place-rating">
                      <span className="rating-star">⭐</span>
                      <span className="rating-value">{place.rating}</span>
                      <span className="rating-reviews">({place.reviews.toLocaleString()})</span>
                    </div>
                  </div>

                  <p className="place-description">{place.description}</p>

                  <div className="place-meta">
                    <span className="meta-item">
                      <span className="meta-icon">💰</span>
                      {place.price}
                    </span>
                    <span className="meta-item">
                      <span className="meta-icon">📍</span>
                      {place.distance}
                    </span>
                  </div>

                  <div className="place-actions">
                    <button
                      className="action-button secondary"
                      onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(place.name + ' ' + tripData.destination)}`, '_blank')}
                    >
                      🗺️ Directions
                    </button>
                    <button
                      className="action-button primary"
                      onClick={() => handleAddToItinerary(place.id)}
                    >
                      + Add to Itinerary
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  )
}

export default WorkspaceDiscover
