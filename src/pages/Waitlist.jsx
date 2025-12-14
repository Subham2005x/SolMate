import { useState } from 'react'
import SEO from '../components/SEO'
import './Waitlist.css'

function Waitlist() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    travelFrequency: '',
    message: ''
  })
  
  const [submitted, setSubmitted] = useState(false)
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Connect to backend API
    console.log('Form submitted:', formData)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', travelFrequency: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }
  
  return (
    <>
      <SEO 
        title="Join Waitlist - Solmate | Be First to Plan Trips Together"
        description="Join the Solmate waitlist and be among the first to experience stress-free group travel planning. Sign up now for early access."
        keywords="solmate waitlist, join solmate, travel app launch, group travel beta, early access travel planning"
        path="/waitlist"
      />
      
      {/* Hero */}
      <section className="waitlist-hero">
        <div className="container">
          <h1>Join the Waitlist</h1>
          <p className="hero-description">
            Be the first to experience stress-free group travel planning. Sign up for early access to Solmate.
          </p>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="section form-section">
        <div className="container">
          <div className="form-wrapper">
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="waitlist-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="travelFrequency">How often do you travel with groups?</label>
                  <select
                    id="travelFrequency"
                    name="travelFrequency"
                    value={formData.travelFrequency}
                    onChange={handleChange}
                  >
                    <option value="">Select an option</option>
                    <option value="monthly">Monthly or more</option>
                    <option value="few-times">A few times a year</option>
                    <option value="once-year">Once a year</option>
                    <option value="rarely">Rarely</option>
                    <option value="first-time">Planning my first group trip</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Tell us about your travel plans (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Where are you planning to go? Who are you traveling with?"
                  />
                </div>
                
                <button type="submit" className="btn-submit">
                  Join the Waitlist
                </button>
                
                <p className="form-note">
                  We'll notify you when Solmate launches. No spam, we promise.
                </p>
              </form>
            ) : (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h2>You're on the list!</h2>
                <p>
                  Thanks for joining the Solmate waitlist. We'll send you an email when we launch.
                </p>
              </div>
            )}
            
          </div>
          
          {/* Info Cards */}
          <div className="info-cards">
            <div className="info-card">
              <h3>🚀 Early Access</h3>
              <p>Be among the first to try Solmate and help shape its future with your feedback.</p>
            </div>
            
            <div className="info-card">
              <h3>💌 Launch Updates</h3>
              <p>Get exclusive updates about features, launch date, and special offers for early users.</p>
            </div>
            
            <div className="info-card">
              <h3>🎁 Special Perks</h3>
              <p>Waitlist members get priority access and bonus features when we launch.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          
          <div className="faq-list">
            <div className="faq-item">
              <h3>When will Solmate launch?</h3>
              <p>
                We're working hard to bring Solmate to you soon. Waitlist members will be the first to know when we're ready to launch.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Will Solmate be free?</h3>
              <p>
                We're still finalizing pricing details. Our goal is to keep Solmate accessible and affordable for all travelers. Early users will get special pricing benefits.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Do I need to download an app?</h3>
              <p>
                Solmate works on any device through your web browser. No app download required, though we may release mobile apps in the future.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Can I use Solmate for solo travel?</h3>
              <p>
                Solmate is designed specifically for group travel planning. If you're traveling solo, there are other great tools out there—but if you ever plan a trip with friends, we'll be here!
              </p>
            </div>
            
            <div className="faq-item">
              <h3>How will my data be used?</h3>
              <p>
                We take privacy seriously. Your email will only be used to notify you about Solmate's launch and updates. We'll never sell your data or spam you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Waitlist
