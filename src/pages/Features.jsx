import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './Features.css'

function Features() {
  return (
    <>
      <SEO 
        title="Features - Solmate | Group Travel Planning Made Easy"
        description="Discover how Solmate simplifies group travel with shared itineraries, budget tracking, date coordination, expense management, and smart reminders."
        keywords="group trip planning, travel itinerary app, budget tracking travel, expense tracking, trip coordination, travel planning features"
        path="/features"
      />
      
      {/* Hero */}
      <section className="features-hero">
        <div className="container">
          <h1>Everything You Need to Plan Together</h1>
          <p className="hero-description">
            Solmate brings all your travel planning tools into one simple platform. No complexity, no learning curve—just the essentials.
          </p>
        </div>
      </section>
      
      {/* Features List */}
      <section className="section features-list">
        <div className="container">
          
          {/* Feature 1 */}
          <div className="feature-row">
            <div className="feature-content">
              <h2>Group Trip Planning</h2>
              <p>
                Create a trip and invite your friends with a simple link. No one needs to download an app or create an account to see the details. Everyone can view the plan, suggest ideas, and stay updated in real-time.
              </p>
              <p>
                Perfect for weekend getaways, road trips, bachelor parties, family reunions, or any adventure with friends.
              </p>
            </div>
            <div className="feature-visual">
              <div className="visual-box">
                <p>🗺️</p>
                <p>Illustration: Multiple users viewing same trip</p>
              </div>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="feature-row reverse">
            <div className="feature-content">
              <h2>Date & Budget Coordination</h2>
              <p>
                Stop sending endless "What dates work for you?" messages. Everyone can mark their availability, and Solmate helps you find dates that work for the group.
              </p>
              <p>
                Set a shared budget so everyone knows the spending range upfront. No surprises, no awkward conversations—just clarity from the start.
              </p>
            </div>
            <div className="feature-visual">
              <div className="visual-box">
                <p>📅💰</p>
                <p>Illustration: Calendar with budget indicator</p>
              </div>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="feature-row">
            <div className="feature-content">
              <h2>Shared Itinerary</h2>
              <p>
                Build your trip plan together. Add activities, restaurants, hotels, and travel times—all in one place. Everyone sees the same itinerary, so there's no confusion about what's happening when.
              </p>
              <p>
                Make changes on the fly? No problem. Updates appear instantly for everyone in the group.
              </p>
            </div>
            <div className="feature-visual">
              <div className="visual-box">
                <p>📋</p>
                <p>Illustration: Timeline view of trip activities</p>
              </div>
            </div>
          </div>
          
          {/* Feature 4 */}
          <div className="feature-row reverse">
            <div className="feature-content">
              <h2>Expense Tracking</h2>
              <p>
                Keep track of who paid for what. Log expenses as you go—flights, hotels, meals, activities—and see a clear breakdown of group spending.
              </p>
              <p>
                At the end of the trip, Solmate shows who owes what. Simple, transparent, and fair—no spreadsheet math required.
              </p>
            </div>
            <div className="feature-visual">
              <div className="visual-box">
                <p>💳</p>
                <p>Illustration: Expense list with split amounts</p>
              </div>
            </div>
          </div>
          
          {/* Feature 5 */}
          <div className="feature-row">
            <div className="feature-content">
              <h2>Smart Reminders</h2>
              <p>
                Never miss an important deadline. Solmate sends gentle reminders for booking confirmations, payment deadlines, packing lists, and departure times.
              </p>
              <p>
                Travel with confidence knowing you won't forget the important stuff. Think of it as your personal trip assistant.
              </p>
            </div>
            <div className="feature-visual">
              <div className="visual-box">
                <p>🔔</p>
                <p>Illustration: Notification with reminder</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
      {/* CTA */}
      <section className="section features-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Plan Your Next Trip?</h2>
            <p>
              Join the waitlist and be among the first to experience hassle-free group travel.
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

export default Features
