import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { fadeInUp, slideInLeft, slideInRight, viewportOptions, buttonHover, buttonTap } from '../utils/animations'
import './Features.css'

function Features() {
  const features = [
    {
      title: 'Group Trip Planning',
      icon: '🗺️',
      desc1: 'Create a trip and invite your friends with a simple link. No one needs to download an app or create an account to see the details. Everyone can view the plan, suggest ideas, and stay updated in real-time.',
      desc2: 'Perfect for weekend getaways, road trips, bachelor parties, family reunions, or any adventure with friends.',
      reverse: false
    },
    {
      title: 'Date & Budget Coordination',
      icon: '📅💰',
      desc1: 'Stop sending endless "What dates work for you?" messages. Everyone can mark their availability, and Solmate helps you find dates that work for the group.',
      desc2: 'Set a shared budget so everyone knows the spending range upfront. No surprises, no awkward conversations—just clarity from the start.',
      reverse: true
    },
    {
      title: 'Shared Itinerary',
      icon: '📋',
      desc1: 'Build your trip plan together. Add activities, restaurants, hotels, and travel times—all in one place. Everyone sees the same itinerary, so there\'s no confusion about what\'s happening when.',
      desc2: 'Make changes on the fly? No problem. Updates appear instantly for everyone in the group.',
      reverse: false
    },
    {
      title: 'Expense Tracking',
      icon: '💳',
      desc1: 'Keep track of who paid for what. Log expenses as you go—flights, hotels, meals, activities—and see a clear breakdown of group spending.',
      desc2: 'At the end of the trip, Solmate shows who owes what. Simple, transparent, and fair—no spreadsheet math required.',
      reverse: true
    },
    {
      title: 'Smart Reminders',
      icon: '🔔',
      desc1: 'Never miss an important deadline. Solmate sends gentle reminders for booking confirmations, payment deadlines, packing lists, and departure times.',
      desc2: 'Travel with confidence knowing you won\'t forget the important stuff. Think of it as your personal trip assistant.',
      reverse: false
    }
  ]

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
        <div className="features-hero-bg" />
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Everything You Need to Plan Together
          </motion.h1>
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Solmate brings all your travel planning tools into one simple platform. No complexity, no learning curve—just the essentials.
          </motion.p>
        </div>
      </section>
      
      {/* Features List */}
      <section className="section features-list">
        <div className="container">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`feature-row ${feature.reverse ? 'reverse' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOptions}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div 
                className="feature-content"
                variants={feature.reverse ? slideInRight : slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
              >
                <h2>{feature.title}</h2>
                <p>{feature.desc1}</p>
                <p>{feature.desc2}</p>
              </motion.div>
              <motion.div 
                className="feature-visual"
                variants={feature.reverse ? slideInLeft : slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="visual-box">
                  <motion.p 
                    className="feature-icon-large"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {feature.icon}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* CTA */}
      <section className="section features-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Plan Your Next Trip?</h2>
            <p>
              Join the waitlist and be among the first to experience hassle-free group travel.
            </p>
            <motion.div
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <Link to="/waitlist" className="btn-cta">
                Join the Waitlist
                <motion.span
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

export default Features
