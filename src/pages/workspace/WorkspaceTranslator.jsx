import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './WorkspaceTranslator.css'

function WorkspaceTranslator({ tripData }) {
  // State Management
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState('auto')
  const [targetLanguage, setTargetLanguage] = useState('ja') // Default to destination language
  const [inputMode, setInputMode] = useState('text') // text, voice, image, video
  const [contextMode, setContextMode] = useState('general')
  const [isTranslating, setIsTranslating] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [translationHistory, setTranslationHistory] = useState([])
  const [pinnedTranslations, setPinnedTranslations] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [offlineMode, setOfflineMode] = useState(false)
  const [downloadedLanguages, setDownloadedLanguages] = useState(() => {
    const saved = localStorage.getItem('downloadedLanguages')
    return saved ? JSON.parse(saved) : []
  })
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [downloadingLang, setDownloadingLang] = useState(null)
  
  const fileInputRef = useRef(null)
  const mediaRecorderRef = useRef(null)

  // Travel Context Modes
  const contextModes = [
    { id: 'general', icon: '💬', label: 'General', color: '#3B82F6' },
    { id: 'food', icon: '🍽️', label: 'Food & Menu', color: '#F59E0B' },
    { id: 'transport', icon: '🚇', label: 'Transport', color: '#8B5CF6' },
    { id: 'emergency', icon: '🚨', label: 'Emergency', color: '#EF4444' },
    { id: 'shopping', icon: '🛍️', label: 'Shopping', color: '#EC4899' },
    { id: 'directions', icon: '🗺️', label: 'Directions', color: '#10B981' }
  ]

  // Common Languages (expandable)
  const languages = [
    { code: 'auto', name: 'Auto-detect', flag: '🌐' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'th', name: 'Thai', flag: '🇹🇭' }
  ]

  // Quick Phrases per Context
  const quickPhrases = {
    general: ['Hello', 'Thank you', 'Excuse me', 'Where is...?', 'How much?', 'I don\'t understand'],
    food: ['Menu please', 'No meat', 'Vegetarian', 'Water please', 'Bill please', 'Delicious!'],
    transport: ['Train station', 'Bus stop', 'Taxi', 'Airport', 'Ticket', 'How much to...?'],
    emergency: ['Help!', 'Police', 'Hospital', 'Doctor', 'I need help', 'Emergency'],
    shopping: ['How much?', 'Too expensive', 'I\'ll take it', 'Can I try?', 'Receipt please', 'Discount?'],
    directions: ['Where is...?', 'Left', 'Right', 'Straight', 'Near', 'Far']
  }

  // Auto-translate function (mock - replace with real API)
  const handleTranslate = async () => {
    if (!inputText.trim()) return

    setIsTranslating(true)
    
    // Simulate API call - Replace with Google Translate API or similar
    setTimeout(() => {
      const mockTranslation = `[${targetLanguage.toUpperCase()}] ${inputText}` // Mock translation
      setTranslatedText(mockTranslation)
      
      // Add to history
      const newTranslation = {
        id: Date.now(),
        source: inputText,
        target: mockTranslation,
        sourceLang: sourceLanguage,
        targetLang: targetLanguage,
        context: contextMode,
        timestamp: new Date(),
        isPinned: false
      }
      setTranslationHistory([newTranslation, ...translationHistory])
      setIsTranslating(false)
    }, 800)
  }

  // Voice Input (Web Speech API)
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser')
      return
    }

    const recognition = new webkitSpeechRecognition()
    recognition.lang = sourceLanguage === 'auto' ? 'en-US' : `${sourceLanguage}-${sourceLanguage.toUpperCase()}`
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsRecording(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInputText(transcript)
      setIsRecording(false)
    }

    recognition.onerror = () => {
      setIsRecording(false)
      alert('Voice recognition failed. Please try again.')
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
  }

  // Image Input (OCR - Phase 2)
  const handleImageInput = () => {
    fileInputRef.current?.click()
  }

  // Download language pack for offline use
  const handleDownloadLanguage = async (languageCode) => {
    setDownloadingLang(languageCode)
    
    // Simulate downloading language pack (100MB - 300MB per language)
    // In production, this would download actual translation models
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const updatedLanguages = [...downloadedLanguages, languageCode]
    setDownloadedLanguages(updatedLanguages)
    localStorage.setItem('downloadedLanguages', JSON.stringify(updatedLanguages))
    setDownloadingLang(null)
    alert(`${languages.find(l => l.code === languageCode)?.name} downloaded successfully! You can now translate offline.`)
  }

  // Remove downloaded language pack
  const handleRemoveLanguage = (languageCode) => {
    const updatedLanguages = downloadedLanguages.filter(code => code !== languageCode)
    setDownloadedLanguages(updatedLanguages)
    localStorage.setItem('downloadedLanguages', JSON.stringify(updatedLanguages))
  }

  // Check if device is online
  useEffect(() => {
    const handleOnline = () => setOfflineMode(false)
    const handleOffline = () => setOfflineMode(true)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // TODO: Implement OCR API (Google Vision, Tesseract.js, etc.)
      alert('OCR translation coming in Phase 2!')
      // For now, just show file name
      setInputText(`[Image: ${file.name}]`)
    }
  }

  // Text-to-Speech Output
  const handlePlayAudio = (text, lang) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = `${lang}-${lang.toUpperCase()}`
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  // Swap Languages
  const handleSwapLanguages = () => {
    if (sourceLanguage !== 'auto') {
      const temp = sourceLanguage
      setSourceLanguage(targetLanguage)
      setTargetLanguage(temp)
      setInputText(translatedText)
      setTranslatedText(inputText)
    }
  }

  // Pin/Unpin Translation
  const togglePin = (translationId) => {
    setTranslationHistory(prev =>
      prev.map(t => t.id === translationId ? { ...t, isPinned: !t.isPinned } : t)
    )
  }

  // Share to Group Chat
  const shareToGroup = (translation) => {
    if (tripData?.type === 'group') {
      // TODO: Implement share to group chat
      alert(`Shared translation to group: "${translation.target}"`)
    }
  }

  // Quick Phrase Selection
  const useQuickPhrase = (phrase) => {
    setInputText(phrase)
  }

  // Auto-detect destination language on load
  useEffect(() => {
    const destinationLangMap = {
      'Tokyo, Japan': 'ja',
      'Barcelona, Spain': 'es',
      'Paris, France': 'fr'
    }
    if (tripData?.destination && destinationLangMap[tripData.destination]) {
      setTargetLanguage(destinationLangMap[tripData.destination])
    }
  }, [tripData])

  return (
    <div className="workspace-translator">
      {/* Header */}
      <div className="translator-header">
        <div className="header-left">
          <h1>Language Translator</h1>
          <p className="header-subtitle">
            Instant translation for your journey
            {offlineMode && <span className="offline-badge"> 📴 Offline Mode</span>}
          </p>
        </div>
        <div className="header-actions">
          <button 
            className="header-btn"
            onClick={() => setShowDownloadModal(true)}
          >
            📥 Offline Packs
          </button>
          <button 
            className={`header-btn ${showHistory ? 'active' : ''}`}
            onClick={() => setShowHistory(!showHistory)}
          >
            📜 History
          </button>
          <button className="header-btn" onClick={() => setTranslationHistory([])}>
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* Context Mode Selector */}
      <div className="context-modes">
        {contextModes.map(mode => (
          <button
            key={mode.id}
            className={`context-mode-btn ${contextMode === mode.id ? 'active' : ''}`}
            onClick={() => setContextMode(mode.id)}
            style={{
              '--mode-color': mode.color,
              borderColor: contextMode === mode.id ? mode.color : 'transparent'
            }}
          >
            <span className="mode-icon">{mode.icon}</span>
            <span className="mode-label">{mode.label}</span>
          </button>
        ))}
      </div>

      <div className="translator-layout">
        {/* Main Translation Area */}
        <div className="translation-main">
          {/* Input Section */}
          <div className="translation-card input-card">
            <div className="card-header">
              <select 
                className="language-selector"
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              
              <div className="input-mode-toggles">
                <button
                  className={`mode-toggle ${inputMode === 'text' ? 'active' : ''}`}
                  onClick={() => setInputMode('text')}
                  title="Text Input"
                >
                  ✏️
                </button>
                <button
                  className={`mode-toggle ${inputMode === 'voice' ? 'active' : ''}`}
                  onClick={() => setInputMode('voice')}
                  title="Voice Input"
                >
                  🎤
                </button>
                <button
                  className={`mode-toggle ${inputMode === 'image' ? 'active' : ''}`}
                  onClick={() => setInputMode('image')}
                  title="Image OCR (Phase 2)"
                >
                  📷
                </button>
              </div>
            </div>

            <textarea
              className="translation-input"
              placeholder="Type, speak, or upload an image to translate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={inputMode !== 'text'}
            />

            <div className="card-footer">
              {inputMode === 'voice' && (
                <button 
                  className={`voice-record-btn ${isRecording ? 'recording' : ''}`}
                  onClick={handleVoiceInput}
                >
                  {isRecording ? '🔴 Recording...' : '🎤 Tap to Speak'}
                </button>
              )}
              {inputMode === 'image' && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <button className="image-upload-btn" onClick={handleImageInput}>
                    📷 Upload Image
                  </button>
                </>
              )}
              <button 
                className="translate-btn"
                onClick={handleTranslate}
                disabled={!inputText.trim() || isTranslating}
              >
                {isTranslating ? '⏳ Translating...' : '🔄 Translate'}
              </button>
            </div>
          </div>

          {/* Swap Button */}
          <button 
            className="swap-languages-btn"
            onClick={handleSwapLanguages}
            disabled={sourceLanguage === 'auto'}
          >
            ⇅
          </button>

          {/* Output Section */}
          <div className="translation-card output-card">
            <div className="card-header">
              <select 
                className="language-selector"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                {languages.filter(l => l.code !== 'auto').map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              
              <button 
                className="play-audio-btn"
                onClick={() => handlePlayAudio(translatedText, targetLanguage)}
                disabled={!translatedText}
              >
                🔊 Play
              </button>
            </div>

            <div className="translation-output">
              {translatedText || (
                <div className="output-placeholder">
                  <span className="placeholder-icon">🌍</span>
                  <p>Translation will appear here</p>
                </div>
              )}
            </div>

            {translatedText && (
              <div className="card-footer output-actions">
                <button 
                  className="output-action-btn"
                  onClick={() => navigator.clipboard.writeText(translatedText)}
                >
                  📋 Copy
                </button>
                {tripData?.type === 'group' && (
                  <button 
                    className="output-action-btn"
                    onClick={() => shareToGroup({ target: translatedText })}
                  >
                    📤 Share to Group
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Phrases Sidebar */}
        <div className="quick-phrases-panel">
          <h3>Quick Phrases</h3>
          <div className="phrases-list">
            {quickPhrases[contextMode].map((phrase, idx) => (
              <button
                key={idx}
                className="phrase-btn"
                onClick={() => useQuickPhrase(phrase)}
              >
                {phrase}
              </button>
            ))}
          </div>

          {/* Pinned Translations */}
          {translationHistory.filter(t => t.isPinned).length > 0 && (
            <div className="pinned-section">
              <h3>📌 Pinned</h3>
              <div className="pinned-list">
                {translationHistory.filter(t => t.isPinned).map(trans => (
                  <div key={trans.id} className="pinned-item">
                    <div className="pinned-text">{trans.target}</div>
                    <button 
                      className="play-mini-btn"
                      onClick={() => handlePlayAudio(trans.target, trans.targetLang)}
                    >
                      🔊
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Translation History Modal */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            className="history-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHistory(false)}
          >
            <motion.div
              className="history-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Translation History</h2>
                <button className="modal-close" onClick={() => setShowHistory(false)}>✕</button>
              </div>
              <div className="modal-body">
                {translationHistory.length === 0 ? (
                  <div className="empty-history">
                    <span className="empty-icon">📜</span>
                    <p>No translation history yet</p>
                  </div>
                ) : (
                  <div className="history-list">
                    {translationHistory.map(trans => (
                      <div key={trans.id} className="history-item">
                        <div className="history-content">
                          <div className="history-source">{trans.source}</div>
                          <div className="history-arrow">→</div>
                          <div className="history-target">{trans.target}</div>
                        </div>
                        <div className="history-actions">
                          <button 
                            className={`history-action-btn ${trans.isPinned ? 'pinned' : ''}`}
                            onClick={() => togglePin(trans.id)}
                          >
                            {trans.isPinned ? '📌' : '📍'}
                          </button>
                          <button 
                            className="history-action-btn"
                            onClick={() => handlePlayAudio(trans.target, trans.targetLang)}
                          >
                            🔊
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline Language Packs Modal */}
      <AnimatePresence>
        {showDownloadModal && (
          <motion.div
            className="history-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDownloadModal(false)}
          >
            <motion.div
              className="history-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>📥 Offline Language Packs</h2>
                <button className="modal-close" onClick={() => setShowDownloadModal(false)}>✕</button>
              </div>
              <div className="modal-body">
                <div className="offline-info">
                  <p className="info-text">
                    <strong>Why download?</strong> Use the translator without internet in areas with poor connectivity.
                  </p>
                  <p className="info-note">
                    Each language pack is approximately 150-250 MB. Make sure you have enough storage space.
                  </p>
                </div>

                <div className="language-packs-list">
                  {languages.filter(l => l.code !== 'auto').map(lang => {
                    const isDownloaded = downloadedLanguages.includes(lang.code)
                    const isDownloading = downloadingLang === lang.code

                    return (
                      <div key={lang.code} className="language-pack-item">
                        <div className="pack-info">
                          <span className="pack-flag">{lang.flag}</span>
                          <div className="pack-details">
                            <span className="pack-name">{lang.name}</span>
                            <span className="pack-size">~200 MB</span>
                          </div>
                        </div>
                        <div className="pack-action">
                          {isDownloaded ? (
                            <>
                              <span className="downloaded-badge">✓ Downloaded</span>
                              <button
                                className="remove-pack-btn"
                                onClick={() => handleRemoveLanguage(lang.code)}
                              >
                                🗑️
                              </button>
                            </>
                          ) : isDownloading ? (
                            <span className="downloading-badge">Downloading...</span>
                          ) : (
                            <button
                              className="download-pack-btn"
                              onClick={() => handleDownloadLanguage(lang.code)}
                            >
                              📥 Download
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="storage-info">
                  <span className="storage-label">Downloaded: {downloadedLanguages.length} languages</span>
                  <span className="storage-size">~{downloadedLanguages.length * 200} MB used</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default WorkspaceTranslator
