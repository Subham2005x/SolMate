import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './WorkspacePlanBook.css'

function WorkspacePlanBook({ tripData }) {
  const [activeTab, setActiveTab] = useState('stays')
  const [selectedItem, setSelectedItem] = useState(null)
  const [savedItems, setSavedItems] = useState([])
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)
  const [filterBudget, setFilterBudget] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [showPermitTracker, setShowPermitTracker] = useState(false)

  const isGroupTrip = tripData?.type === 'group'
  const userRole = tripData?.members?.[0]?.role || 'member' // Assume first member is current user

  // Phase 1 tabs - Core booking categories
  const tabs = [
    { id: 'stays', label: 'Hotels & Stays', icon: '🏨', phase: 1 },
    { id: 'flights', label: 'Flights', icon: '✈️', phase: 1 },
    { id: 'transport', label: 'Ground Transport', icon: '🚌', phase: 1 },
    { id: 'local', label: 'Local Mobility', icon: '🚗', phase: 2 },
    { id: 'permits', label: 'Permits & Passes', icon: '📋', phase: 1 }
  ]

  // Mock data - Replace with actual API calls to booking partners
  const mockStays = [
    {
      id: 'stay-1',
      name: 'Grand Tokyo Hotel',
      type: 'hotel',
      location: 'Shibuya, Tokyo',
      price: 150,
      currency: 'USD',
      rating: 4.5,
      image: '🏨',
      amenities: ['WiFi', 'Breakfast', 'Pool'],
      partner: 'Booking.com',
      partnerUrl: 'https://booking.com',
      availability: 'Available',
      cancellation: 'Free cancellation',
      distance: '2.5 km from center'
    },
    {
      id: 'stay-2',
      name: 'Capsule Inn Tokyo',
      type: 'hostel',
      location: 'Akihabara, Tokyo',
      price: 45,
      currency: 'USD',
      rating: 4.2,
      image: '🏩',
      amenities: ['WiFi', 'Lockers'],
      partner: 'Hostelworld',
      partnerUrl: 'https://hostelworld.com',
      availability: 'Limited rooms',
      cancellation: 'Non-refundable',
      distance: '1.2 km from center'
    },
    {
      id: 'stay-3',
      name: 'Luxury Shinjuku Apartment',
      type: 'apartment',
      location: 'Shinjuku, Tokyo',
      price: 200,
      currency: 'USD',
      rating: 4.8,
      image: '🏢',
      amenities: ['Kitchen', 'WiFi', 'Washer'],
      partner: 'Airbnb',
      partnerUrl: 'https://airbnb.com',
      availability: 'Available',
      cancellation: 'Moderate policy',
      distance: '3.8 km from center'
    }
  ]

  const mockFlights = [
    {
      id: 'flight-1',
      airline: 'Japan Airlines',
      from: 'New York (JFK)',
      to: 'Tokyo (NRT)',
      departure: '2024-03-15 10:00',
      arrival: '2024-03-16 14:30',
      duration: '14h 30m',
      stops: 0,
      price: 850,
      currency: 'USD',
      class: 'Economy',
      partner: 'Skyscanner',
      partnerUrl: 'https://skyscanner.com',
      baggage: '2 x 23kg',
      image: '✈️'
    },
    {
      id: 'flight-2',
      airline: 'ANA',
      from: 'New York (JFK)',
      to: 'Tokyo (HND)',
      departure: '2024-03-15 13:30',
      arrival: '2024-03-16 17:45',
      duration: '13h 15m',
      stops: 0,
      price: 920,
      currency: 'USD',
      class: 'Economy',
      partner: 'Kayak',
      partnerUrl: 'https://kayak.com',
      baggage: '2 x 23kg',
      image: '✈️'
    }
  ]

  const mockTransport = [
    {
      id: 'train-1',
      type: 'train',
      operator: 'JR East',
      route: 'Narita Airport → Tokyo Station',
      duration: '1h 30m',
      price: 30,
      currency: 'USD',
      partner: 'JR Pass',
      partnerUrl: 'https://jrpass.com',
      frequency: 'Every 30 mins',
      image: '🚄'
    },
    {
      id: 'bus-1',
      type: 'bus',
      operator: 'Airport Limousine',
      route: 'Narita Airport → Shinjuku',
      duration: '2h',
      price: 25,
      currency: 'USD',
      partner: 'Klook',
      partnerUrl: 'https://klook.com',
      frequency: 'Every hour',
      image: '🚌'
    }
  ]

  const mockLocalTransport = [
    {
      id: 'local-1',
      type: 'rental',
      name: 'Pocket WiFi Rental',
      provider: 'Japan Wireless',
      price: 8,
      currency: 'USD',
      priceUnit: 'per day',
      partner: 'Klook',
      partnerUrl: 'https://klook.com',
      image: '📱'
    },
    {
      id: 'local-2',
      type: 'pass',
      name: 'Tokyo Metro 72h Pass',
      provider: 'Tokyo Metro',
      price: 18,
      currency: 'USD',
      priceUnit: 'per pass',
      partner: 'Klook',
      partnerUrl: 'https://klook.com',
      image: '🎫'
    }
  ]

  const mockPermits = [
    {
      id: 'permit-1',
      name: 'Japan Tourist Visa',
      required: true,
      status: 'pending',
      cost: 0,
      currency: 'USD',
      processingTime: '5-7 days',
      applyUrl: 'https://japan-embassy.com',
      description: 'Required for US citizens staying over 90 days',
      documents: ['Passport', 'Photo', 'Itinerary'],
      image: '🛂'
    },
    {
      id: 'permit-2',
      name: 'JR Pass (7 Days)',
      required: false,
      status: 'not_started',
      cost: 280,
      currency: 'USD',
      processingTime: 'Instant',
      applyUrl: 'https://jrpass.com',
      description: 'Unlimited JR train travel across Japan',
      documents: ['Passport'],
      image: '🎫'
    }
  ]

  // Filter logic based on trip budget
  const getFilteredStays = useMemo(() => {
    let filtered = mockStays

    if (filterBudget !== 'all') {
      const budgetPerNight = tripData?.budget ? tripData.budget / tripData.duration / (tripData.travelers || 1) : 150
      if (filterBudget === 'budget') filtered = filtered.filter(s => s.price < budgetPerNight * 0.7)
      if (filterBudget === 'mid') filtered = filtered.filter(s => s.price >= budgetPerNight * 0.7 && s.price <= budgetPerNight * 1.2)
      if (filterBudget === 'luxury') filtered = filtered.filter(s => s.price > budgetPerNight * 1.2)
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(s => s.type === filterType)
    }

    return filtered
  }, [filterBudget, filterType, tripData])

  // Save item to trip
  const handleSaveItem = (item) => {
    if (savedItems.find(i => i.id === item.id)) {
      setSavedItems(savedItems.filter(i => i.id !== item.id))
    } else {
      setSavedItems([...savedItems, { ...item, savedAt: new Date(), tab: activeTab }])
    }
  }

  const isSaved = (itemId) => savedItems.find(i => i.id === itemId)

  // Open booking modal
  const handleBookNow = (item) => {
    setBookingDetails(item)
    setShowBookingModal(true)
  }

  // Redirect to partner site
  const handleConfirmBooking = () => {
    if (bookingDetails?.partnerUrl) {
      window.open(bookingDetails.partnerUrl, '_blank')
      setShowBookingModal(false)
      
      // Track affiliate click (monetization)
      console.log(`Affiliate click: ${bookingDetails.partner} - ${bookingDetails.id}`)
    }
  }

  return (
    <div className="workspace-plan-book">
      {/* Header */}
      <div className="plan-book-header">
        <div className="header-content">
          <h1>Plan & Book</h1>
          <p className="header-subtitle">
            Compare options, save to your trip, and book with trusted partners
          </p>
        </div>
        <div className="header-actions">
          <button 
            className="saved-items-btn"
            onClick={() => setShowPermitTracker(true)}
          >
            <span className="btn-icon">💾</span>
            <span>Saved ({savedItems.length})</span>
          </button>
        </div>
      </div>

      {/* Trip Context Card */}
      <div className="trip-context-card">
        <div className="context-item">
          <span className="context-label">Destination</span>
          <span className="context-value">{tripData?.destination || 'Tokyo, Japan'}</span>
        </div>
        <div className="context-item">
          <span className="context-label">Dates</span>
          <span className="context-value">
            {tripData?.startDate ? new Date(tripData.startDate).toLocaleDateString() : 'Mar 15'} - 
            {tripData?.endDate ? new Date(tripData.endDate).toLocaleDateString() : 'Mar 22'}
          </span>
        </div>
        <div className="context-item">
          <span className="context-label">Budget</span>
          <span className="context-value">${tripData?.budget || '9,000'}</span>
        </div>
        <div className="context-item">
          <span className="context-label">Travelers</span>
          <span className="context-value">{tripData?.travelers || 4} {isGroupTrip ? 'people' : 'solo'}</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="plan-book-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="plan-book-content">
        <AnimatePresence mode="wait">
          {/* STAYS TAB */}
          {activeTab === 'stays' && (
            <motion.div
              key="stays"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="content-section"
            >
              {/* Filters */}
              <div className="filters-bar">
                <div className="filter-group">
                  <label>Budget Range</label>
                  <select value={filterBudget} onChange={(e) => setFilterBudget(e.target.value)}>
                    <option value="all">All Prices</option>
                    <option value="budget">Budget-Friendly</option>
                    <option value="mid">Mid-Range</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Type</label>
                  <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="all">All Types</option>
                    <option value="hotel">Hotels</option>
                    <option value="hostel">Hostels</option>
                    <option value="apartment">Apartments</option>
                  </select>
                </div>
              </div>

              {/* Stays Grid */}
              <div className="items-grid">
                {getFilteredStays.map(stay => (
                  <div key={stay.id} className="item-card">
                    <div className="item-header">
                      <div className="item-image">{stay.image}</div>
                      <button 
                        className={`save-btn ${isSaved(stay.id) ? 'saved' : ''}`}
                        onClick={() => handleSaveItem(stay)}
                      >
                        {isSaved(stay.id) ? '💾' : '🔖'}
                      </button>
                    </div>
                    <div className="item-body">
                      <h3 className="item-title">{stay.name}</h3>
                      <p className="item-location">📍 {stay.location}</p>
                      <p className="item-distance">{stay.distance}</p>
                      <div className="item-amenities">
                        {stay.amenities.slice(0, 3).map(a => (
                          <span key={a} className="amenity-tag">{a}</span>
                        ))}
                      </div>
                      <div className="item-rating">
                        ⭐ {stay.rating} · {stay.availability}
                      </div>
                    </div>
                    <div className="item-footer">
                      <div className="item-price">
                        <span className="price-amount">${stay.price}</span>
                        <span className="price-unit">per night</span>
                      </div>
                      <button 
                        className="book-btn"
                        onClick={() => handleBookNow(stay)}
                      >
                        View on {stay.partner}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* FLIGHTS TAB */}
          {activeTab === 'flights' && (
            <motion.div
              key="flights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="content-section"
            >
              <div className="items-list">
                {mockFlights.map(flight => (
                  <div key={flight.id} className="item-card-horizontal">
                    <div className="item-icon-large">{flight.image}</div>
                    <div className="item-details">
                      <h3 className="item-title">{flight.airline}</h3>
                      <div className="flight-route">
                        <span className="route-point">{flight.from}</span>
                        <span className="route-arrow">→</span>
                        <span className="route-point">{flight.to}</span>
                      </div>
                      <div className="flight-info">
                        <span>{flight.departure}</span>
                        <span className="info-dot">•</span>
                        <span>{flight.duration}</span>
                        <span className="info-dot">•</span>
                        <span>{flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop(s)`}</span>
                        <span className="info-dot">•</span>
                        <span>{flight.baggage}</span>
                      </div>
                    </div>
                    <div className="item-actions">
                      <div className="item-price">
                        <span className="price-amount">${flight.price}</span>
                        <span className="price-unit">{flight.class}</span>
                      </div>
                      <button 
                        className={`save-btn-small ${isSaved(flight.id) ? 'saved' : ''}`}
                        onClick={() => handleSaveItem(flight)}
                      >
                        {isSaved(flight.id) ? '💾' : '🔖'}
                      </button>
                      <button 
                        className="book-btn"
                        onClick={() => handleBookNow(flight)}
                      >
                        View on {flight.partner}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TRANSPORT TAB */}
          {activeTab === 'transport' && (
            <motion.div
              key="transport"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="content-section"
            >
              <div className="items-list">
                {mockTransport.map(transport => (
                  <div key={transport.id} className="item-card-horizontal">
                    <div className="item-icon-large">{transport.image}</div>
                    <div className="item-details">
                      <h3 className="item-title">{transport.operator}</h3>
                      <p className="transport-route">{transport.route}</p>
                      <div className="transport-info">
                        <span>⏱️ {transport.duration}</span>
                        <span className="info-dot">•</span>
                        <span>🔄 {transport.frequency}</span>
                      </div>
                    </div>
                    <div className="item-actions">
                      <div className="item-price">
                        <span className="price-amount">${transport.price}</span>
                        <span className="price-unit">per person</span>
                      </div>
                      <button 
                        className={`save-btn-small ${isSaved(transport.id) ? 'saved' : ''}`}
                        onClick={() => handleSaveItem(transport)}
                      >
                        {isSaved(transport.id) ? '💾' : '🔖'}
                      </button>
                      <button 
                        className="book-btn"
                        onClick={() => handleBookNow(transport)}
                      >
                        Book on {transport.partner}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* LOCAL TRANSPORT TAB */}
          {activeTab === 'local' && (
            <motion.div
              key="local"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="content-section"
            >
              <div className="items-grid">
                {mockLocalTransport.map(item => (
                  <div key={item.id} className="item-card-compact">
                    <div className="compact-icon">{item.image}</div>
                    <h3 className="compact-title">{item.name}</h3>
                    <p className="compact-subtitle">{item.provider}</p>
                    <div className="compact-price">
                      ${item.price} <span>{item.priceUnit}</span>
                    </div>
                    <div className="compact-actions">
                      <button 
                        className={`save-btn-small ${isSaved(item.id) ? 'saved' : ''}`}
                        onClick={() => handleSaveItem(item)}
                      >
                        {isSaved(item.id) ? '💾' : '🔖'}
                      </button>
                      <button 
                        className="book-btn-small"
                        onClick={() => handleBookNow(item)}
                      >
                        Get on {item.partner}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PERMITS TAB */}
          {activeTab === 'permits' && (
            <motion.div
              key="permits"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="content-section"
            >
              <div className="permits-list">
                {mockPermits.map(permit => (
                  <div key={permit.id} className={`permit-card ${permit.required ? 'required' : 'optional'}`}>
                    <div className="permit-header">
                      <div className="permit-icon">{permit.image}</div>
                      <div className="permit-info">
                        <h3 className="permit-title">
                          {permit.name}
                          {permit.required && <span className="required-badge">Required</span>}
                        </h3>
                        <p className="permit-description">{permit.description}</p>
                      </div>
                      <div className={`permit-status status-${permit.status}`}>
                        {permit.status === 'pending' && '⏳ Pending'}
                        {permit.status === 'approved' && '✅ Approved'}
                        {permit.status === 'not_started' && '⚪ Not Started'}
                      </div>
                    </div>
                    <div className="permit-details">
                      <div className="detail-item">
                        <span className="detail-label">Cost</span>
                        <span className="detail-value">${permit.cost}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Processing Time</span>
                        <span className="detail-value">{permit.processingTime}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Documents Required</span>
                        <span className="detail-value">{permit.documents.join(', ')}</span>
                      </div>
                    </div>
                    <div className="permit-actions">
                      <button 
                        className="apply-btn"
                        onClick={() => window.open(permit.applyUrl, '_blank')}
                      >
                        Apply Now
                      </button>
                      <button 
                        className="track-btn"
                        onClick={() => handleSaveItem(permit)}
                      >
                        {isSaved(permit.id) ? '✓ Tracking' : 'Track Status'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Booking Confirmation Modal */}
      <AnimatePresence>
        {showBookingModal && bookingDetails && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              className="booking-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Ready to book?</h2>
                <button className="modal-close" onClick={() => setShowBookingModal(false)}>✕</button>
              </div>
              <div className="modal-body">
                <div className="booking-summary">
                  <div className="summary-icon">{bookingDetails.image || bookingDetails.icon}</div>
                  <h3>{bookingDetails.name || bookingDetails.airline || bookingDetails.operator}</h3>
                  <p className="booking-partner">via {bookingDetails.partner}</p>
                </div>
                <div className="booking-disclaimer">
                  <p>📌 <strong>You'll be redirected to {bookingDetails.partner}</strong></p>
                  <p>Solmate partners with trusted providers to help you book. Your payment and booking will be handled directly by {bookingDetails.partner}.</p>
                  <ul>
                    <li>✓ Secure payment processing</li>
                    <li>✓ Direct customer support from partner</li>
                    <li>✓ Partner's cancellation policy applies</li>
                  </ul>
                </div>
                {isGroupTrip && userRole === 'admin' && (
                  <div className="group-notice">
                    💡 As trip admin, this booking link will be shared with your group chat
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setShowBookingModal(false)}>
                  Cancel
                </button>
                <button className="btn-proceed" onClick={handleConfirmBooking}>
                  Continue to {bookingDetails.partner} →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default WorkspacePlanBook
