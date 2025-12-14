import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './HowItWorks.css'

function HowItWorks() {
  return (
    <>
      <SEO 
        title="How It Works - Solmate | Simple Group Trip Planning"
        description="Learn how to plan group trips with Solmate in 4 easy steps. Create a trip, invite friends, plan together, and travel with complete clarity."
        keywords="how to plan group trip, trip planning steps, coordinate group travel, plan trip with friends, group travel guide"
        path="/how-it-works"
      />
      
      {/* Hero */}
      <section className="how-hero">
        <div className="container">
          <h1>How Solmate Works</h1>
          <p className="hero-description">
            Group travel planning simplified into 4 easy steps. No technical skills needed—just you and your friends ready to plan an adventure.
          </p>
        </div>
      </section>
      
      {/* Steps */}
      <section className="section steps-section">
        <div className="container">
          
          {/* Step 1 */}
          <div className="step-card">
            <div className="step-header">
              <span className="step-badge">Step 1</span>
              <h2>Create Your Trip</h2>
            </div>
            <div className="step-body">
              <div className="step-content">
                <p>
                  Start by giving your trip a name—something fun like "Portugal Adventure" or "Sarah's Bachelor Trip." Add basic details like where you're going and when you're thinking of traveling.
                </p>
                <p>
                  That's it. Your trip is created. Now it's time to bring in your crew.
                </p>
                <ul className="step-features">
                  <li>✓ Takes less than 2 minutes</li>
                  <li>✓ No app download required</li>
                  <li>✓ Works on any device</li>
                </ul>
              </div>
              <div className="step-visual">
                <div className="visual-box">
                  <p>📝</p>
                  <p>Trip creation form</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="step-card">
            <div className="step-header">
              <span className="step-badge">Step 2</span>
              <h2>Invite Your Friends</h2>
            </div>
            <div className="step-body">
              <div className="step-content">
                <p>
                  Share a simple link with your travel group. They can view the trip details instantly—no signup, no barriers. Just click and see.
                </p>
                <p>
                  Friends can join the planning, add suggestions, mark their availability, and stay in the loop. Everyone has access to the same information.
                </p>
                <ul className="step-features">
                  <li>✓ Share via text, email, or social media</li>
                  <li>✓ No password requirements</li>
                  <li>✓ Easy for everyone to access</li>
                </ul>
              </div>
              <div className="step-visual">
                <div className="visual-box">
                  <p>🔗</p>
                  <p>Shareable trip link</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="step-card">
            <div className="step-header">
              <span className="step-badge">Step 3</span>
              <h2>Plan Together</h2>
            </div>
            <div className="step-body">
              <div className="step-content">
                <p>
                  Now comes the fun part. Coordinate dates, set a budget, build your itinerary, and decide on activities—all in one collaborative space.
                </p>
                <p>
                  Track expenses as they come up. Everyone can see who paid for what, so there's full transparency. No awkward "who owes who" conversations at the end.
                </p>
                <ul className="step-features">
                  <li>✓ Find dates that work for everyone</li>
                  <li>✓ Set and track a shared budget</li>
                  <li>✓ Build a shared itinerary</li>
                  <li>✓ Log expenses in real-time</li>
                </ul>
              </div>
              <div className="step-visual">
                <div className="visual-box">
                  <p>🗓️💬</p>
                  <p>Collaborative planning interface</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="step-card">
            <div className="step-header">
              <span className="step-badge">Step 4</span>
              <h2>Travel with Clarity</h2>
            </div>
            <div className="step-body">
              <div className="step-content">
                <p>
                  When it's time to go, you'll have everything you need at your fingertips. Your itinerary, bookings, expenses, and group details—all organized and accessible.
                </p>
                <p>
                  Get timely reminders for important deadlines, so nothing falls through the cracks. Travel confidently, knowing you're prepared.
                </p>
                <ul className="step-features">
                  <li>✓ Access your trip offline (coming soon)</li>
                  <li>✓ Get smart reminders</li>
                  <li>✓ Update plans on the go</li>
                  <li>✓ Settle expenses easily after the trip</li>
                </ul>
              </div>
              <div className="step-visual">
                <div className="visual-box">
                  <p>✈️</p>
                  <p>Trip dashboard on mobile</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
      {/* CTA */}
      <section className="section how-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Sound Simple? That's the Point.</h2>
            <p>
              Solmate is designed to make group travel planning effortless. Be the first to try it when we launch.
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

export default HowItWorks
