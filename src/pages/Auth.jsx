import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import './Auth.css'

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      // TODO: Actual API call
      console.log(isSignUp ? 'Sign up' : 'Sign in', { email, password, name })
    }, 1500)
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log('Google login clicked')
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setError('')
  }

  return (
    <>
      <SEO 
        title={isSignUp ? 'Sign Up - Solmate' : 'Sign In - Solmate'}
        description="Join Solmate and start planning amazing group trips"
        path="/auth"
      />
      
      <div className="auth-page split-design">
        <div className={`auth-split-container ${isSignUp ? 'sign-up-mode' : ''}`}>
          
          {/* Form Container - Contains both forms */}
          <div className="forms-container">
            {/* Sign In Form */}
            <div className="form-panel signin-form">
              <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>

                {/* Social Login Buttons */}
                <div className="social-buttons">
                  <button type="button" className="social-btn" onClick={handleGoogleLogin}>
                    <svg width="18" height="18" viewBox="0 0 20 20">
                      <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
                      <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
                      <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
                      <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
                    </svg>
                  </button>
                  <button type="button" className="social-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0077B5">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                  <button type="button" className="social-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                </div>

                <p className="divider-text">or use your account</p>

                <div className="form-group-minimal">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-minimal">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && !isSignUp && (
                  <div className="error-message-minimal">
                    {error}
                  </div>
                )}

                <a href="#" className="forgot-link">
                  Forgot your password?
                </a>

                <button
                  type="submit"
                  className="submit-btn-minimal"
                  disabled={loading}
                >
                  {loading && !isSignUp ? (
                    <div className="loading-spinner-small" />
                  ) : (
                    'SIGN IN'
                  )}
                </button>
              </form>
            </div>

            {/* Sign Up Form */}
            <div className="form-panel signup-form">
              <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>

                {/* Social Login Buttons */}
                <div className="social-buttons">
                  <button type="button" className="social-btn" onClick={handleGoogleLogin}>
                    <svg width="18" height="18" viewBox="0 0 20 20">
                      <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
                      <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
                      <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
                      <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
                    </svg>
                  </button>
                  <button type="button" className="social-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0077B5">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                  <button type="button" className="social-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                </div>

                <p className="divider-text">or use your email for registration</p>

                <div className="form-group-minimal">
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-minimal">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-minimal">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && isSignUp && (
                  <div className="error-message-minimal">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-btn-minimal"
                  disabled={loading}
                  style={{ marginTop: 'var(--space-6)' }}
                >
                  {loading && isSignUp ? (
                    <div className="loading-spinner-small" />
                  ) : (
                    'SIGN UP'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Overlay Container - Slides over forms */}
          <div className="overlay-container">
            <div className="overlay">
              {/* Overlay Left Panel */}
              <div className="overlay-panel overlay-left">
                <h1>Already have an account?</h1>
                <p>Sign in to continue your journey with Solmate and plan amazing group trips</p>
                <button type="button" className="ghost-btn" onClick={toggleMode}>
                  SIGN IN
                </button>
              </div>

              {/* Overlay Right Panel */}
              <div className="overlay-panel overlay-right">
                <h1>Don't have an account?</h1>
                <p>Join Solmate today and start planning unforgettable group adventures</p>
                <button type="button" className="ghost-btn" onClick={toggleMode}>
                  SIGN UP
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Auth
