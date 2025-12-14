import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Solmate</h3>
            <p className="footer-tagline">
              Plan trips together, travel smarter.
            </p>
          </div>
          
          <nav className="footer-section" aria-label="Product links">
            <h4>Product</h4>
            <ul className="footer-links">
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/waitlist">Join Waitlist</Link></li>
            </ul>
          </nav>
          
          <nav className="footer-section" aria-label="Company links">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/about#contact">Contact</Link></li>
            </ul>
          </nav>
          
          <nav className="footer-section" aria-label="Legal links">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </nav>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Solmate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
