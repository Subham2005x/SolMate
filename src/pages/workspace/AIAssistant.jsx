import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AIAssistant.css'

function AIAssistant({ tripData }) {
  // TODO: Connect to actual AI backend/chatbot service
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: `Hi! I'm your AI travel assistant for ${tripData.destination}. I can help you with itinerary planning, local recommendations, budget tips, and answer any questions about your trip!`,
      timestamp: new Date()
    }
  ])

  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const quickActions = [
    { id: 1, icon: '🗺️', label: 'Plan my day', prompt: 'Help me plan my first day in ' + tripData.destination },
    { id: 2, icon: '🍽️', label: 'Find restaurants', prompt: 'Recommend good local restaurants' },
    { id: 3, icon: '🎯', label: 'Must-see places', prompt: 'What are the must-see attractions?' },
    { id: 4, icon: '💡', label: 'Travel tips', prompt: 'Give me essential travel tips' }
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // TODO: Replace with actual AI API call
    // Example: const response = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: messageText, tripId: tripData.id }) })
    
    // Simulated AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now(),
        role: 'assistant',
        content: `I received your message: "${messageText}". This is a placeholder response. Connect the chatbot backend here to get real AI-powered responses!`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (prompt) => {
    handleSendMessage(prompt)
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="ai-assistant">
      <div className="assistant-header">
        <div className="header-left">
          <div className="assistant-avatar">🤖</div>
          <div className="header-info">
            <h1>AI Travel Assistant</h1>
            <p className="assistant-status">
              <span className="status-dot"></span>
              Ready to help
            </p>
          </div>
        </div>
        <button className="assistant-settings-button">
          ⚙️
        </button>
      </div>

      <div className="chat-container">
        {/* Quick Actions */}
        {messages.length <= 1 && (
          <motion.div
            className="quick-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3>Quick Actions</h3>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.id}
                  className="quick-action-button"
                  onClick={() => handleQuickAction(action.prompt)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="action-icon">{action.icon}</span>
                  <span className="action-label">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages */}
        <div className="messages-container">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`message-wrapper ${message.role}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {message.role === 'assistant' && (
                  <div className="message-avatar">🤖</div>
                )}
                <div className="message-content">
                  <div className={`message-bubble ${message.role}`}>
                    <p>{message.content}</p>
                  </div>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
                {message.role === 'user' && (
                  <div className="message-avatar user">👤</div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              className="message-wrapper assistant"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="message-bubble assistant typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              ref={inputRef}
              className="message-input"
              placeholder="Ask me anything about your trip..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(inputValue)
                }
              }}
              rows={1}
            />
            <button
              className="send-button"
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <span>📤</span>
            </button>
          </div>
          <p className="input-hint">
            💡 Ask about activities, restaurants, budget tips, or anything else!
          </p>
        </div>
      </div>

      {/* Backend Integration Notice */}
      <div className="integration-notice">
        <div className="notice-icon">⚠️</div>
        <div className="notice-content">
          <strong>Backend Integration Required</strong>
          <p>Connect your AI chatbot service here. Replace the placeholder response logic with actual API calls.</p>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
