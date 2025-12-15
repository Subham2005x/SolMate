import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { fadeInUp, staggerContainer, staggerItem, viewportOptions, buttonHover, buttonTap } from '../utils/animations'
import './HowItWorks.css'

function HowItWorks() {
  const steps = [
    {
      num: 1,
      title: 'Create Your Trip',
      icon: '📝',
      desc1: 'Start by giving your trip a name—something fun like "Portugal Adventure" or "Sarah\'s Bachelor Trip." Add basic details like where you\'re going and when you\'re thinking of traveling.',
      desc2: 'That\'s it. Your trip is created. Now it\'s time to bring in your crew.',
      features: ['Takes less than 2 minutes', 'No app download required', 'Works on any device']
    },
    {
      num: 2,
      title: 'Invite Your Friends',
      icon: '🔗',
      desc1: 'Share a simple link with your travel group. They can view the trip details instantly—no signup, no barriers. Just click and see.',
      desc2: 'Friends can join the planning, add suggestions, mark their availability, and stay in the loop. Everyone has access to the same information.',
      features: ['Share via text, email, or social media', 'No password requirements', 'Easy for everyone to access']
    },
    {
      num: 3,
      title: 'Plan Together',
      icon: '🗓️💬',
      desc1: 'Now comes the fun part. Coordinate dates, set a budget, build your itinerary, and decide on activities—all in one collaborative space.',
      desc2: 'Track expenses as they come up. Everyone can see who paid for what, so there\'s full transparency. No awkward "who owes who" conversations at the end.',
      features: ['Find dates that work for everyone', 'Set and track a shared budget', 'Build a shared itinerary', 'Log expenses in real-time']
    },
    {
      num: 4,
      title: 'Travel with Clarity',
      icon: '✈️',
      desc1: 'When it\'s time to go, you\'ll have everything you need at your fingertips. Your itinerary, bookings, expenses, and group details—all organized and accessible.',
      desc2: 'Get timely reminders for important deadlines, so nothing falls through the cracks. Travel confidently, knowing you\'re prepared.',
      features: ['Access your trip offline (coming soon)', 'Get smart reminders', 'Update plans on the go', 'Settle expenses easily after the trip']
    }
  ]

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
        <div className="how-hero-bg" />
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            How Solmate Works
          </motion.h1>
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Group travel planning simplified into 4 easy steps. No technical skills needed—just you and your friends ready to plan an adventure.
          </motion.p>
        </div>
      </section>
      
      {/* Steps */}
      <section className="section steps-section">
        <div className="container">
          <div className="timeline">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="step-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOptions}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="step-header">
                  <motion.span 
                    className="step-badge"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={viewportOptions}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.2, type: "spring" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    Step {step.num}
                  </motion.span>
                  <h2>{step.title}</h2>
                </div>
                <div className="step-body">
                  <motion.div 
                    className="step-content"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOptions}
                  >
                    <p>{step.desc1}</p>
                    <p>{step.desc2}</p>
                    <motion.ul 
                      className="step-features"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportOptions}
                    >
                      {step.features.map((feature, i) => (
                        <motion.li key={i} variants={staggerItem}>
                          ✓ {feature}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                  <motion.div 
                    className="step-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewportOptions}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="visual-box">
                      <motion.p 
                        className="step-icon-large"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {step.icon}
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
                {index < steps.length - 1 && (
                  <motion.div 
                    className="step-connector"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={viewportOptions}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="section how-cta">
        <div className="container">
          <motion.div 
            className="cta-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6 }}
          >
            <h2>Sound Simple? That's the Point.</h2>
            <p>
              Solmate is designed to make group travel planning effortless. Be the first to try it when we launch.
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

export default HowItWorks
