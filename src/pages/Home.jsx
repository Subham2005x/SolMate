import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { 
  fadeInUp, 
  scaleIn, 
  staggerContainer, 
  staggerItem, 
  viewportOptions,
  buttonHover,
  buttonTap,
  cardHover
} from '../utils/animations'
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
        <div className="hero-gradient-bg" />
        <div className="container">
          <div className="hero-content">
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
            >
              Plan Trips Together, Travel Smarter
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Stop the endless group chats and messy planning. Solmate brings everyone on the same page—so you can focus on the adventure ahead.
            </motion.p>
            <motion.div 
              className="hero-cta"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease: 'backOut' }}
            >
              <motion.div
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                <Link to="/waitlist" className="btn-cta">
                  <span>Join the Waitlist</span>
                  <motion.span
                    className="btn-arrow"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/how-it-works" className="btn-secondary">
                  See How It Works
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Social Proof */}
      <motion.section 
        className="social-proof"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOptions}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <p className="social-proof-text">
            Join <strong>1,000+ travelers</strong> planning their next adventure
          </p>
        </div>
      </motion.section>
      
      {/* Benefits Section */}
      <section className="section benefits-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Why Travelers Choose Solmate</h2>
            <p className="section-subtitle">
              Group travel should bring people together—not stress them out.
            </p>
          </motion.div>
          
          <motion.div 
            className="benefits-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            {[
              { icon: '✨', title: 'Say Goodbye to Chaos', desc: 'No more scattered messages across five different apps. Keep all trip details, decisions, and updates in one place.' },
              { icon: '🤝', title: 'Everyone Stays on the Same Page', desc: 'From budget tracking to date coordination, everyone sees the same information in real-time. No confusion, no missed details.' },
              { icon: '⏱️', title: 'Plan Faster, Stress Less', desc: 'Stop wasting hours coordinating schedules and preferences. Solmate helps you make decisions together, quickly and clearly.' },
              { icon: '💰', title: 'Travel Within Your Budget', desc: 'Set a group budget, track expenses, and avoid awkward money conversations. Everyone knows where the money goes.' },
              { icon: '🗓️', title: 'Never Miss a Moment', desc: 'Get gentle reminders for bookings, payments, and important dates. Travel with confidence, not last-minute panic.' },
              { icon: '🌍', title: 'Built for Real Travelers', desc: 'Whether it\'s a weekend getaway or a month-long adventure, Solmate adapts to your trip—simple, flexible, and reliable.' }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                className="benefit-card"
                variants={staggerItem}
                whileHover={cardHover}
              >
                <motion.div 
                  className="benefit-icon"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {benefit.icon}
                </motion.div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Preview */}
      <section className="section preview-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Getting Started is Simple</h2>
          </motion.div>
          
          <motion.div 
            className="steps-preview"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            {[
              { num: '1', title: 'Create Your Trip', desc: 'Give it a name and set the basics' },
              { num: '2', title: 'Invite Your Friends', desc: 'Share a link—no app required for them' },
              { num: '3', title: 'Plan Together', desc: 'Coordinate dates, budget, and activities' },
              { num: '4', title: 'Travel with Clarity', desc: 'Everything you need, right at your fingertips' }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="step-item"
                variants={staggerItem}
              >
                <motion.span 
                  className="step-number"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {step.num}
                </motion.span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="preview-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/how-it-works" className="btn-link">
              Learn more about how Solmate works →
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="section cta-section">
        <div className="container">
          <motion.div 
            className="cta-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Plan Your Next Adventure?</h2>
            <p>
              Join the waitlist and be the first to experience stress-free group travel.
            </p>
            <motion.div
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <Link to="/waitlist" className="btn-cta">
                <span>Join the Waitlist</span>
                <motion.span
                  className="btn-arrow"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home
