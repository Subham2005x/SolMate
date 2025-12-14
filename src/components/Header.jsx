import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path
  
  return (
    <header className="header" role="banner">
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="nav-wrapper">
            <Link to="/" className="logo" aria-label="Solmate - Home">
              Solmate
            </Link>
            
            <div className="nav-links">
              <Link 
                to="/features" 
                className={isActive('/features') ? 'active' : ''}
                aria-current={isActive('/features') ? 'page' : undefined}
              >
                Features
              </Link>
              <Link 
                to="/how-it-works" 
                className={isActive('/how-it-works') ? 'active' : ''}
                aria-current={isActive('/how-it-works') ? 'page' : undefined}
              >
                How It Works
              </Link>
              <Link 
                to="/about" 
                className={isActive('/about') ? 'active' : ''}
                aria-current={isActive('/about') ? 'page' : undefined}
              >
                About
              </Link>
              <Link 
                to="/waitlist" 
                className="btn-primary"
                aria-label="Join our waitlist"
              >
                Join Waitlist
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
