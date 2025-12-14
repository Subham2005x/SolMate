import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './Home.css'

function Home() {
  return (
    <>
      <SEO 
        title="Solmate - Plan Trips Together, Travel Smarter"
        description="Solmate helps you plan group trips effortlessly. Coordinate dates, budgets, and itineraries with friends in one simple platform. Join the waitlist today."
        keywords="travel planning, group travel, trip planning app, travel together, trip coordination, travel itinerary, group vacation planning"
        path="/"
      />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Plan Trips Together, Travel Smarter
            </h1>
            <p className="hero-subtitle">
              Stop the endless group chats and messy planning. Solmate brings everyone on the same page—so you can focus on the adventure ahead.
            </p>
            <div className="hero-cta">
              <Link to="/waitlist" className="btn-cta">
                Join the Waitlist
              </Link>
              <Link to="/how-it-works" className="btn-secondary">
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Visual Section */}
      <section className="visual-section">
        <div className="container">
          <div className="visual-placeholder">
            <div className="visual-text">
              <p>📱 Illustration Area</p>
              <p>Show: Friends viewing shared itinerary on mobile devices</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="section benefits-section">
        <div className="container">
          <h2 className="section-title">Why Travelers Choose Solmate</h2>
          <p className="section-subtitle">
            Group travel should bring people together—not stress them out.
          </p>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">✨</div>
              <h3>Say Goodbye to Chaos</h3>
              <p>
                No more scattered messages across five different apps. Keep all trip details, decisions, and updates in one place.
              </p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>Everyone Stays on the Same Page</h3>
              <p>
                From budget tracking to date coordination, everyone sees the same information in real-time. No confusion, no missed details.
              </p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">⏱️</div>
              <h3>Plan Faster, Stress Less</h3>
              <p>
                Stop wasting hours coordinating schedules and preferences. Solmate helps you make decisions together, quickly and clearly.
              </p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>Travel Within Your Budget</h3>
              <p>
                Set a group budget, track expenses, and avoid awkward money conversations. Everyone knows where the money goes.
              </p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🗓️</div>
              <h3>Never Miss a Moment</h3>
              <p>
                Get gentle reminders for bookings, payments, and important dates. Travel with confidence, not last-minute panic.
              </p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🌍</div>
              <h3>Built for Real Travelers</h3>
              <p>
                Whether it's a weekend getaway or a month-long adventure, Solmate adapts to your trip—simple, flexible, and reliable.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Preview */}
      <section className="section preview-section">
        <div className="container">
          <h2 className="section-title">Getting Started is Simple</h2>
          <div className="steps-preview">
            <div className="step-item">
              <span className="step-number">1</span>
              <h3>Create Your Trip</h3>
              <p>Give it a name and set the basics</p>
            </div>
            <div className="step-item">
              <span className="step-number">2</span>
              <h3>Invite Your Friends</h3>
              <p>Share a link—no app required for them</p>
            </div>
            <div className="step-item">
              <span className="step-number">3</span>
              <h3>Plan Together</h3>
              <p>Coordinate dates, budget, and activities</p>
            </div>
            <div className="step-item">
              <span className="step-number">4</span>
              <h3>Travel with Clarity</h3>
              <p>Everything you need, right at your fingertips</p>
            </div>
          </div>
          <div className="preview-cta">
            <Link to="/how-it-works" className="btn-link">
              Learn more about how Solmate works →
            </Link>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Plan Your Next Adventure?</h2>
            <p>
              Join the waitlist and be the first to experience stress-free group travel.
            </p>
            <Link to="/waitlist" className="btn-cta">
              Join the Waitlist
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
