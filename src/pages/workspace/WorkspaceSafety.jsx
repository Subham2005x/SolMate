import { useState } from 'react'
import { motion } from 'framer-motion'
import './WorkspaceSafety.css'

function WorkspaceSafety({ tripData }) {
  const [activeTab, setActiveTab] = useState('emergency') // emergency, health, insurance, tips
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: 'Local Police', number: '110', type: 'police', icon: '👮' },
    { id: 2, name: 'Ambulance', number: '119', type: 'medical', icon: '🚑' },
    { id: 3, name: 'Fire Department', number: '119', type: 'fire', icon: '🚒' },
    { id: 4, name: 'Tourist Helpline', number: '050-3816-2787', type: 'support', icon: '📞' },
  ])

  const [personalContacts, setPersonalContacts] = useState([
    { id: 1, name: 'Emergency Contact 1', relationship: 'Family', phone: '+1-555-0101', email: 'emergency@email.com' },
  ])

  const [showAddContact, setShowAddContact] = useState(false)
  const [showAddHealth, setShowAddHealth] = useState(false)

  const handleAddContact = () => {
    // TODO: Backend API call to add emergency contact
    setShowAddContact(true)
  }

  const handleDeleteContact = (contactId) => {
    // TODO: Backend API call to delete contact
    setPersonalContacts(personalContacts.filter(c => c.id !== contactId))
  }

  return (
    <div className="workspace-safety">
      <div className="safety-header">
        <div className="header-left">
          <h1>Safety & SOS</h1>
          <p className="header-subtitle">Emergency information for {tripData.destination}</p>
        </div>
        <div className="emergency-badge">
          <span className="badge-icon">🚨</span>
          <span>Emergency Mode</span>
        </div>
      </div>

      {/* Quick Emergency Actions */}
      <div className="emergency-quick-actions">
        <motion.button
          className="emergency-action police"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('tel:110')}
        >
          <span className="action-icon">👮</span>
          <span className="action-label">Call Police</span>
          <span className="action-number">110</span>
        </motion.button>

        <motion.button
          className="emergency-action medical"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('tel:119')}
        >
          <span className="action-icon">🚑</span>
          <span className="action-label">Ambulance</span>
          <span className="action-number">119</span>
        </motion.button>

        <motion.button
          className="emergency-action embassy"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="action-icon">🏛️</span>
          <span className="action-label">Embassy</span>
          <span className="action-number">Contact</span>
        </motion.button>
      </div>

      {/* Tab Navigation */}
      <div className="safety-tabs">
        <button
          className={`tab-button ${activeTab === 'emergency' ? 'active' : ''}`}
          onClick={() => setActiveTab('emergency')}
        >
          <span className="tab-icon">📞</span>
          <span>Emergency</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'health' ? 'active' : ''}`}
          onClick={() => setActiveTab('health')}
        >
          <span className="tab-icon">💊</span>
          <span>Health Info</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'insurance' ? 'active' : ''}`}
          onClick={() => setActiveTab('insurance')}
        >
          <span className="tab-icon">🛡️</span>
          <span>Insurance</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'tips' ? 'active' : ''}`}
          onClick={() => setActiveTab('tips')}
        >
          <span className="tab-icon">💡</span>
          <span>Safety Tips</span>
        </button>
      </div>

      {/* Emergency Tab */}
      {activeTab === 'emergency' && (
        <motion.div
          className="emergency-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-card">
            <h3 className="section-title">Local Emergency Numbers</h3>
            <div className="contacts-grid">
              {emergencyContacts.map((contact, index) => (
                <motion.a
                  key={contact.id}
                  href={`tel:${contact.number}`}
                  className="emergency-contact-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="contact-icon">{contact.icon}</div>
                  <div className="contact-info">
                    <h4>{contact.name}</h4>
                    <p className="contact-number">{contact.number}</p>
                  </div>
                  <div className="contact-action">📞</div>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="section-card">
            <div className="section-header">
              <h3 className="section-title">Personal Emergency Contacts</h3>
              <button className="add-button" onClick={handleAddContact}>
                + Add Contact
              </button>
            </div>
            <div className="personal-contacts-list">
              {personalContacts.map((contact) => (
                <div key={contact.id} className="personal-contact-card">
                  <div className="contact-avatar">
                    <span className="avatar-icon">👤</span>
                  </div>
                  <div className="contact-details">
                    <h4>{contact.name}</h4>
                    <p className="contact-relationship">{contact.relationship}</p>
                    <div className="contact-methods">
                      <a href={`tel:${contact.phone}`} className="contact-method">
                        📞 {contact.phone}
                      </a>
                      <a href={`mailto:${contact.email}`} className="contact-method">
                        ✉️ {contact.email}
                      </a>
                    </div>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Health Info Tab */}
      {activeTab === 'health' && (
        <motion.div
          className="health-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-card">
            <h3 className="section-title">Medical Information</h3>
            <div className="health-form">
              <div className="form-group">
                <label>Blood Type</label>
                <select className="health-input">
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div className="form-group">
                <label>Allergies</label>
                <textarea
                  className="health-input"
                  placeholder="List any allergies (food, medication, etc.)"
                  rows="3"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Current Medications</label>
                <textarea
                  className="health-input"
                  placeholder="List medications you're currently taking"
                  rows="3"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Medical Conditions</label>
                <textarea
                  className="health-input"
                  placeholder="Any chronic conditions or important medical history"
                  rows="3"
                ></textarea>
              </div>
              <button className="save-button">Save Health Information</button>
            </div>
          </div>

          <div className="section-card">
            <h3 className="section-title">Nearby Hospitals</h3>
            <div className="hospitals-list">
              <div className="hospital-card">
                <span className="hospital-icon">🏥</span>
                <div className="hospital-info">
                  <h4>Tokyo Medical Center</h4>
                  <p>2.3 km away • Open 24/7</p>
                </div>
                <button className="directions-button">Directions</button>
              </div>
              <div className="hospital-card">
                <span className="hospital-icon">🏥</span>
                <div className="hospital-info">
                  <h4>International Clinic Tokyo</h4>
                  <p>3.1 km away • English speaking</p>
                </div>
                <button className="directions-button">Directions</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Insurance Tab */}
      {activeTab === 'insurance' && (
        <motion.div
          className="insurance-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-card">
            <h3 className="section-title">Travel Insurance Details</h3>
            <div className="insurance-form">
              <div className="form-group">
                <label>Insurance Provider</label>
                <input
                  type="text"
                  className="health-input"
                  placeholder="e.g., World Nomads, Allianz"
                />
              </div>
              <div className="form-group">
                <label>Policy Number</label>
                <input
                  type="text"
                  className="health-input"
                  placeholder="Your policy number"
                />
              </div>
              <div className="form-group">
                <label>Emergency Hotline</label>
                <input
                  type="tel"
                  className="health-input"
                  placeholder="+1-800-XXX-XXXX"
                />
              </div>
              <div className="form-group">
                <label>Coverage Details</label>
                <textarea
                  className="health-input"
                  placeholder="What's covered by your insurance"
                  rows="4"
                ></textarea>
              </div>
              <button className="save-button">Save Insurance Info</button>
            </div>
          </div>

          <div className="section-card">
            <h3 className="section-title">Important Documents</h3>
            <div className="documents-grid">
              <div className="document-card">
                <span className="doc-icon">📄</span>
                <h4>Passport Copy</h4>
                <button className="upload-button">Upload</button>
              </div>
              <div className="document-card">
                <span className="doc-icon">💳</span>
                <h4>Insurance Card</h4>
                <button className="upload-button">Upload</button>
              </div>
              <div className="document-card">
                <span className="doc-icon">💉</span>
                <h4>Vaccination Record</h4>
                <button className="upload-button">Upload</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Safety Tips Tab */}
      {activeTab === 'tips' && (
        <motion.div
          className="tips-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-icon">🚨</span>
              <h3>General Safety</h3>
              <ul>
                <li>Always keep copies of important documents</li>
                <li>Share your itinerary with someone at home</li>
                <li>Keep emergency numbers saved in your phone</li>
                <li>Stay aware of your surroundings</li>
              </ul>
            </div>

            <div className="tip-card">
              <span className="tip-icon">💰</span>
              <h3>Money & Valuables</h3>
              <ul>
                <li>Use hotel safes for valuables</li>
                <li>Carry minimal cash, use cards when possible</li>
                <li>Keep backup cards in separate locations</li>
                <li>Be cautious at ATMs, especially at night</li>
              </ul>
            </div>

            <div className="tip-card">
              <span className="tip-icon">🏨</span>
              <h3>Accommodation</h3>
              <ul>
                <li>Check emergency exits when you arrive</li>
                <li>Keep room key secure</li>
                <li>Use door locks and security chains</li>
                <li>Don't share room number publicly</li>
              </ul>
            </div>

            <div className="tip-card">
              <span className="tip-icon">🚕</span>
              <h3>Transportation</h3>
              <ul>
                <li>Use licensed taxis or ride-sharing apps</li>
                <li>Avoid traveling alone late at night</li>
                <li>Keep your belongings secure in transit</li>
                <li>Share ride details with friends</li>
              </ul>
            </div>

            <div className="tip-card">
              <span className="tip-icon">📱</span>
              <h3>Communication</h3>
              <ul>
                <li>Keep phone charged at all times</li>
                <li>Save offline maps of the area</li>
                <li>Learn basic local phrases</li>
                <li>Register with your embassy</li>
              </ul>
            </div>

            <div className="tip-card">
              <span className="tip-icon">🍽️</span>
              <h3>Food & Water</h3>
              <ul>
                <li>Drink bottled or filtered water</li>
                <li>Check food hygiene standards</li>
                <li>Avoid street food if unsure</li>
                <li>Wash hands frequently</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default WorkspaceSafety
