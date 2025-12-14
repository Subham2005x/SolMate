import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './About.css'

function About() {
  return (
    <>
      <SEO 
        title="About Solmate - Our Story & Mission"
        description="Learn about Solmate's mission to simplify group travel planning. We believe travel should bring people together, not stress them out."
        keywords="about solmate, travel startup, group travel mission, why solmate, travel planning vision"
        path="/about"
      />
      
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <h1>Making Group Travel Simple</h1>
          <p className="hero-description">
            We believe planning a trip with friends should be as exciting as the trip itself.
          </p>
        </div>
      </section>
      
      {/* Story */}
      <section className="section story-section">
        <div className="container">
          <div className="story-content">
            <h2>Why Solmate Exists</h2>
            <p>
              We've all been there. You and your friends want to plan a trip together. Someone creates a group chat. Ideas fly around. Dates get thrown out. Budget questions pop up. Before you know it, there are 247 unread messages, three different spreadsheets, and no one knows what's actually happening.
            </p>
            <p>
              Group travel planning shouldn't feel like project management. It should be fun, collaborative, and stress-free.
            </p>
            <p>
              That's why we built Solmate—a simple platform that brings all your trip planning into one place. No more scattered conversations. No more confusion. Just clear, organized planning that lets you focus on what matters: the adventure ahead.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission */}
      <section className="section mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <h3>🎯 Our Mission</h3>
              <p>
                To make group travel planning so simple that anyone can organize a trip—without stress, spreadsheets, or endless group chats.
              </p>
            </div>
            
            <div className="mission-card">
              <h3>💡 Our Belief</h3>
              <p>
                Travel brings people together. The planning process should too. We're building tools that make collaboration easy and enjoyable.
              </p>
            </div>
            
            <div className="mission-card">
              <h3>🌍 Our Vision</h3>
              <p>
                A world where anyone can plan a group trip with confidence—whether it's a weekend getaway or a month-long adventure.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="section values-section">
        <div className="container">
          <h2 className="section-title">What Drives Us</h2>
          
          <div className="values-list">
            <div className="value-item">
              <h3>Simplicity First</h3>
              <p>
                We don't add features for the sake of it. Every tool in Solmate serves a clear purpose. No clutter, no confusion—just what you need to plan together.
              </p>
            </div>
            
            <div className="value-item">
              <h3>Built for Real People</h3>
              <p>
                We're not building for corporations or tour companies. Solmate is for friends, families, and travelers who just want to plan a trip without the hassle.
              </p>
            </div>
            
            <div className="value-item">
              <h3>Transparent & Trustworthy</h3>
              <p>
                No hidden fees. No surprise charges. No selling your data. We're upfront about what Solmate does and how it works.
              </p>
            </div>
            
            <div className="value-item">
              <h3>Designed for Everyone</h3>
              <p>
                You don't need to be tech-savvy to use Solmate. Our platform works for everyone—from college students planning their first trip to seasoned travelers organizing group adventures.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Note */}
      <section className="section team-section">
        <div className="container">
          <div className="team-content">
            <h2>We're Just Getting Started</h2>
            <p>
              Solmate is a small team passionate about making travel planning better. We're travelers, planners, and problem-solvers who got tired of the chaos that comes with organizing group trips.
            </p>
            <p>
              This is just the beginning. We're building Solmate with real user feedback, real travel experiences, and a commitment to keeping things simple.
            </p>
            <p className="team-note">
              Have questions or want to share your group travel stories? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="section about-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Join Us on This Journey</h2>
            <p>
              Be part of the Solmate community. Join our waitlist and help shape the future of group travel planning.
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

export default About
