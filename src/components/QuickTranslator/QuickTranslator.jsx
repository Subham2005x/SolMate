import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './QuickTranslator.css'

function QuickTranslator() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState('auto')
  const [targetLanguage, setTargetLanguage] = useState('es')
  const [isTranslating, setIsTranslating] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  const languages = [
    { code: 'auto', name: 'Auto', flag: '🌐' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
  ]

  const handleTranslate = async () => {
    if (!inputText.trim()) return

    setIsTranslating(true)
    
    // Simulate API call - Replace with actual translation API
    setTimeout(() => {
      // Mock translation
      setTranslatedText(`[${targetLanguage.toUpperCase()}] ${inputText}`)
      setIsTranslating(false)
    }, 800)
  }

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in your browser')
      return
    }

    const recognition = new webkitSpeechRecognition()
    recognition.lang = sourceLanguage === 'auto' ? 'en-US' : `${sourceLanguage}-${sourceLanguage.toUpperCase()}`
    recognition.continuous = false
    recognition.interimResults = false

    setIsRecording(true)

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInputText(transcript)
      setIsRecording(false)
    }

    recognition.onerror = () => {
      setIsRecording(false)
      alert('Speech recognition failed. Please try again.')
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
  }

  const handlePlayAudio = (text, lang) => {
    if ('speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = `${lang}-${lang.toUpperCase()}`
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  const swapLanguages = () => {
    if (sourceLanguage === 'auto') return
    const temp = sourceLanguage
    setSourceLanguage(targetLanguage)
    setTargetLanguage(temp)
    setInputText(translatedText)
    setTranslatedText(inputText)
  }

  return (
    <>
      {/* Floating Button */}
      {!isExpanded && (
        <motion.button
          className="quick-translator-fab"
          onClick={() => setIsExpanded(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="fab-icon">🌍</span>
        </motion.button>
      )}

      {/* Expanded Translator Widget */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="quick-translator-widget"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="widget-header">
              <div className="header-left">
                <span className="widget-icon">🌍</span>
                <h3>Quick Translator</h3>
              </div>
              <button 
                className="close-btn"
                onClick={() => setIsExpanded(false)}
              >
                ✕
              </button>
            </div>

            <div className="widget-body">
              {/* Language Selectors */}
              <div className="language-row">
                <select
                  className="language-select"
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>

                <button
                  className="swap-btn"
                  onClick={swapLanguages}
                  disabled={sourceLanguage === 'auto'}
                >
                  ⇄
                </button>

                <select
                  className="language-select"
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                >
                  {languages.filter(l => l.code !== 'auto').map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input Section */}
              <div className="translation-section">
                <textarea
                  className="translation-input"
                  placeholder="Enter text to translate..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={3}
                />
                <div className="input-actions">
                  <button
                    className={`voice-btn ${isRecording ? 'recording' : ''}`}
                    onClick={handleVoiceInput}
                  >
                    🎤 {isRecording ? 'Listening...' : 'Voice'}
                  </button>
                  <button
                    className="translate-btn"
                    onClick={handleTranslate}
                    disabled={!inputText.trim() || isTranslating}
                  >
                    {isTranslating ? 'Translating...' : 'Translate'}
                  </button>
                </div>
              </div>

              {/* Output Section */}
              {translatedText && (
                <motion.div
                  className="translation-output"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <div className="output-text">{translatedText}</div>
                  <div className="output-actions">
                    <button
                      className="action-btn"
                      onClick={() => handlePlayAudio(translatedText, targetLanguage)}
                    >
                      🔊 Play
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => navigator.clipboard.writeText(translatedText)}
                    >
                      📋 Copy
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="widget-footer">
              <span className="footer-text">For full features, visit Trip Translator</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default QuickTranslator
