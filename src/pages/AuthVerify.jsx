import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import './AuthVerify.css'

function AuthVerify() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('verifying') // 'verifying', 'success', 'error'
  const [error, setError] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      setStatus('error')
      setError('Invalid verification link')
      return
    }

    // Simulate API call
    setTimeout(() => {
      // TODO: Replace with actual API call
      // verifyMagicToken(token)
      //   .then(data => {
      //     setStatus('success')
      //     setTimeout(() => navigate('/dashboard'), 2000)
      //   })
      //   .catch(err => {
      //     setStatus('error')
      //     setError(err.message || 'Verification failed')
      //   })
      
      // For now, simulate success
      setStatus('success')
      setTimeout(() => navigate('/'), 2000)
    }, 2000)
  }, [searchParams, navigate])

  return (
    <>
      <SEO 
        title="Verifying - Solmate"
        description="Verifying your login"
        path="/auth/verify"
      />
      
      <div className="verify-page">
        {/* Animated Background */}
        <div className="verify-bg">
          <div className="floating-shapes">
            <div className="floating-blob floating-blob-1"></div>
            <div className="floating-blob floating-blob-2"></div>
            <div className="floating-blob floating-blob-3"></div>
          </div>
          <div className="gradient-mesh"></div>
        </div>

        <div className="verify-container">
          {status === 'verifying' && (
            <motion.div 
              className="verify-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="verify-spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="150 50"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#667eea" />
                      <stop offset="100%" stopColor="#764ba2" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Verifying Your Login
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Please wait while we verify your magic link...
              </motion.p>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div 
              className="verify-card success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="success-checkmark"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#10b981"
                    strokeWidth="4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                  <motion.path
                    d="M 25 40 L 35 50 L 55 30"
                    stroke="#10b981"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  />
                </svg>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Login Successful!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Redirecting you to your dashboard...
              </motion.p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div 
              className="verify-card error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="error-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="36" stroke="#ef4444" strokeWidth="4" fill="none"/>
                  <path d="M 30 30 L 50 50 M 50 30 L 30 50" stroke="#ef4444" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Verification Failed
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {error || 'The magic link is invalid or has expired.'}
              </motion.p>
              <motion.button
                className="btn-retry"
                onClick={() => navigate('/auth')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Login
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

export default AuthVerify
