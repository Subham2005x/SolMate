import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Header.css'

function Header() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path
  
  return (
    <motion.header 
      className="header" 
      role="banner"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
    >
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="nav-wrapper">
            <Link to="/" className="logo" aria-label="Solmate - Home">
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Solmate
              </motion.span>
            </Link>
            
            <div className="nav-links">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link 
                  to="/features" 
                  className={isActive('/features') ? 'active' : ''}
                  aria-current={isActive('/features') ? 'page' : undefined}
                >
                  Features
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link 
                  to="/how-it-works" 
                  className={isActive('/how-it-works') ? 'active' : ''}
                  aria-current={isActive('/how-it-works') ? 'page' : undefined}
                >
                  How It Works
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link 
                  to="/about" 
                  className={isActive('/about') ? 'active' : ''}
                  aria-current={isActive('/about') ? 'page' : undefined}
                >
                  About
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/waitlist" 
                  className="btn-primary"
                  aria-label="Join our waitlist"
                >
                  Join Waitlist
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header
