import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import usePermissions from '../../hooks/usePermissions'
import ConversionModal from '../../components/ConversionModal'
import ProfileModal from '../../components/ProfileModal/ProfileModal'
import './WorkspaceGroup.css'

function WorkspaceGroup({ tripData }) {
  const currentUserId = 'current-user-123' // TODO: Get from auth context
  const permissions = usePermissions(tripData.id, currentUserId, tripData)
  
  const [activeTab, setActiveTab] = useState('members')
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showConversion, setShowConversion] = useState(false)
  const [inviteLink] = useState(`solmate.app/join/${tripData.id}`)
  
  // Profile Modal state
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)
  
  // Members state with mock data
  const [members, setMembers] = useState(tripData.members || [
    {
      id: 'user-1',
      userId: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '👤',
      role: 'admin',
      isCreator: true,
      online: true,
      status: 'active',
      joinedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      stats: { activities: 5, messages: 23, expenses: 8 }
    },
    {
      id: 'user-2',
      userId: 'user-2',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      avatar: '👤',
      role: 'admin',
      isCreator: false,
      online: true,
      status: 'active',
      joinedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      stats: { activities: 3, messages: 15, expenses: 4 }
    },
    {
      id: 'user-3',
      userId: 'user-3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: '👤',
      role: 'member',
      isCreator: false,
      online: false,
      status: 'active',
      joinedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      stats: { activities: 1, messages: 8, expenses: 2 }
    }
  ])

  // Chat state with mock data
  const [messages, setMessages] = useState([
    { id: 'msg-1', userId: 'user-1', userName: 'John Doe', avatar: '👤', text: 'Hey everyone! Just booked the hotel 🏨', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), isPinned: true, readBy: ['user-1', 'user-2', 'user-3'], reactions: { '👍': 2, '❤️': 1 } },
    { id: 'msg-2', userId: 'user-2', userName: 'Sarah Smith', avatar: '👤', text: 'Great! What about the flight? ✈️', timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000), isPinned: false, readBy: ['user-1', 'user-2'], reactions: {} },
    { id: 'msg-3', userId: 'user-3', userName: 'Mike Johnson', avatar: '👤', text: 'I found some good deals, sharing the link: https://flights.com/tokyo-deals', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), isPinned: false, readBy: ['user-1'], reactions: { '🔥': 1 } },
    { id: 'msg-4', userId: 'user-1', userName: 'John Doe', avatar: '👤', text: 'Perfect! Let me check those out', timestamp: new Date(Date.now() - 30 * 60 * 1000), isPinned: false, readBy: [], reactions: {} },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [typingUsers, setTypingUsers] = useState([])
  const messagesEndRef = useRef(null)

  // Polls state with mock data
  const [polls, setPolls] = useState([
    {
      id: 'poll-1',
      title: 'Which dates work best for everyone?',
      createdBy: 'user-1',
      creatorName: 'John Doe',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      closesAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      status: 'active',
      type: 'single',
      options: [
        { id: 'opt-1', text: 'March 15-22', votes: ['user-1', 'user-2', 'user-3'] },
        { id: 'opt-2', text: 'March 20-27', votes: ['user-2'] },
        { id: 'opt-3', text: 'April 1-8', votes: [] }
      ]
    },
    {
      id: 'poll-2',
      title: 'Budget per person?',
      createdBy: 'user-2',
      creatorName: 'Sarah Smith',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      closesAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: 'active',
      type: 'single',
      options: [
        { id: 'opt-4', text: '$500-$1000', votes: ['user-1', 'user-3'] },
        { id: 'opt-5', text: '$1000-$1500', votes: ['user-2'] },
        { id: 'opt-6', text: '$1500-$2000', votes: [] },
        { id: 'opt-7', text: '$2000+', votes: [] }
      ]
    }
  ])
  const [showPollForm, setShowPollForm] = useState(false)
  const [newPoll, setNewPoll] = useState({ title: '', options: ['', ''] })

  // Settings state
  const [settings, setSettings] = useState({
    allowMemberInvites: true,
    requireApproval: false,
    memberCanEdit: true,
    memberCanCreatePolls: false,
    notifyNewMember: true,
    notifyItineraryChange: true,
    notifyNewMessage: true,
    notifyNewPoll: true
  })

  // Handlers
  const handleInviteMember = () => {
    if (!permissions.canAddMembers) {
      alert('Only admins can invite members')
      return
    }
    setShowInviteModal(true)
  }

  const handleViewProfile = (userId) => {
    setSelectedUserId(userId)
    setShowProfileModal(true)
  }

  const handleAdminAction = (action, userId) => {
    const member = members.find(m => m.userId === userId)
    if (action === 'promote') {
      handleUpdateRole(member.id, 'admin')
    } else if (action === 'remove') {
      handleRemoveMember(member.id)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    alert('Invite link copied to clipboard!')
  }

  const handleRemoveMember = (memberId) => {
    const member = members.find(m => m.id === memberId)
    if (!permissions.canManageMember(member)) {
      alert('You cannot remove this member')
      return
    }
    // TODO: Backend API call
    if (confirm(`Remove ${member.name} from the trip?`)) {
      setMembers(members.filter(m => m.id !== memberId))
    }
  }

  const handleUpdateRole = (memberId, newRole) => {
    const member = members.find(m => m.id === memberId)
    if (!permissions.canChangeMemberRole(member, newRole)) {
      alert('You cannot change this member\'s role')
      return
    }
    // TODO: Backend API call
    setMembers(members.map(m => 
      m.id === memberId ? { ...m, role: newRole } : m
    ))
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    if (!permissions.canSendMessages) {
      alert('You cannot send messages')
      return
    }

    // TODO: Backend API call - send message via WebSocket
    const message = {
      id: `msg-${Date.now()}`,
      userId: currentUserId,
      userName: 'You',
      text: newMessage,
      timestamp: new Date(),
      isPinned: false,
      readBy: [currentUserId]
    }
    setMessages([...messages, message])
    setNewMessage('')
    
    // Scroll to bottom
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  const handlePinMessage = (messageId) => {
    if (!permissions.canPinMessages) {
      alert('Only admins can pin messages')
      return
    }
    // TODO: Backend API call
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, isPinned: !m.isPinned } : m
    ))
  }

  const handleDeleteMessage = (messageId) => {
    const message = messages.find(m => m.id === messageId)
    const canDelete = message.userId === currentUserId 
      ? permissions.canDeleteOwnMessages 
      : permissions.canDeleteAnyMessage

    if (!canDelete) {
      alert('You cannot delete this message')
      return
    }
    // TODO: Backend API call
    if (confirm('Delete this message?')) {
      setMessages(messages.filter(m => m.id !== messageId))
    }
  }

  const handleVotePoll = (pollId, optionId) => {
    if (!permissions.canVoteOnPoll) {
      alert('You cannot vote on polls')
      return
    }
    // TODO: Backend API call
    setPolls(polls.map(poll => {
      if (poll.id !== pollId) return poll
      
      // Remove user's previous vote if single choice
      if (poll.type === 'single') {
        poll.options = poll.options.map(opt => ({
          ...opt,
          votes: opt.votes.filter(v => v !== currentUserId)
        }))
      }
      
      // Add new vote
      poll.options = poll.options.map(opt => 
        opt.id === optionId 
          ? { ...opt, votes: [...opt.votes, currentUserId] }
          : opt
      )
      
      return poll
    }))
  }

  const handleClosePoll = (pollId) => {
    if (!permissions.canClosePoll) {
      alert('Only admins can close polls')
      return
    }
    // TODO: Backend API call
    setPolls(polls.map(poll =>
      poll.id === pollId ? { ...poll, status: 'closed', closedAt: new Date() } : poll
    ))
  }

  const handleCreatePoll = () => {
    if (!permissions.canCreatePoll) {
      alert('Only admins can create polls')
      return
    }
    if (!newPoll.title || newPoll.options.filter(o => o.trim()).length < 2) {
      alert('Please enter a title and at least 2 options')
      return
    }

    // TODO: Backend API call
    const poll = {
      id: `poll-${Date.now()}`,
      title: newPoll.title,
      createdBy: currentUserId,
      creatorName: 'You',
      createdAt: new Date(),
      closesAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'active',
      type: 'single',
      options: newPoll.options
        .filter(text => text.trim())
        .map((text, i) => ({
          id: `opt-${Date.now()}-${i}`,
          text,
          votes: []
        }))
    }
    setPolls([poll, ...polls])
    setNewPoll({ title: '', options: ['', ''] })
    setShowPollForm(false)
  }

  const handleSettingChange = (key, value) => {
    if (!permissions.canEditSettings) {
      alert('Only admins can change settings')
      return
    }
    // TODO: Backend API call
    setSettings({ ...settings, [key]: value })
  }

  // Helper functions
  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000)
    if (seconds < 60) return 'just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getTotalVotes = (poll) => {
    return poll.options.reduce((sum, opt) => sum + opt.votes.length, 0)
  }

  const getVotePercentage = (option, totalVotes) => {
    return totalVotes === 0 ? 0 : Math.round((option.votes.length / totalVotes) * 100)
  }

  const pinnedMessages = messages.filter(m => m.isPinned)
  const activePolls = polls.filter(p => p.status === 'active')
  const closedPolls = polls.filter(p => p.status === 'closed')


  return (
    <div className="workspace-group">
      <div className="group-header">
        <div className="header-left">
          <h1>Group Collaboration</h1>
          <p className="header-subtitle">Coordinate with your travel buddies</p>
        </div>
        {permissions.canAddMembers && (
          <button className="invite-button" onClick={handleInviteMember}>
            <span>+ Invite Member</span>
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="group-tabs">
        <button
          className={`tab-button ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          <span className="tab-icon">👥</span>
          <span>Members ({members.length})</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <span className="tab-icon">💬</span>
          <span>Group Chat</span>
          {messages.filter(m => !m.readBy.includes(currentUserId)).length > 0 && (
            <span className="tab-badge">{messages.filter(m => !m.readBy.includes(currentUserId)).length}</span>
          )}
        </button>
        <button
          className={`tab-button ${activeTab === 'polls' ? 'active' : ''}`}
          onClick={() => setActiveTab('polls')}
        >
          <span className="tab-icon">📊</span>
          <span>Polls ({activePolls.length})</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <span className="tab-icon">⚙️</span>
          <span>Settings</span>
        </button>
      </div>

      {/* Members Tab */}
      {activeTab === 'members' && (
        <motion.div
          className="tab-content members-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="members-grid">
            {members.map((member, index) => {
              const badge = permissions.getRoleBadge(member.role, member.isCreator)
              return (
                <motion.div
                  key={member.id}
                  className="member-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div 
                    className="member-avatar-section"
                    onClick={() => handleViewProfile(member.userId)}
                    style={{ cursor: 'pointer' }}
                    title={`View ${member.name}'s profile`}
                  >
                    <div className="member-avatar">
                      <span className="avatar-emoji">{member.avatar}</span>
                      <div className={`member-status ${member.online ? 'online' : 'offline'}`}></div>
                    </div>
                  </div>

                  <div className="member-details">
                    <div className="member-header">
                      <h3 className="member-name">{member.name}</h3>
                      <span 
                        className="member-role-badge"
                        style={{ backgroundColor: `${badge.color}20`, color: badge.color }}
                      >
                        {badge.icon} {badge.text}
                      </span>
                    </div>
                    <p className="member-email">{member.email}</p>
                    <p className="member-status-text">
                      {member.online ? '🟢 Active' : '⚪ Offline'} • Joined {getTimeAgo(member.joinedAt)}
                    </p>

                    <div className="member-stats">
                      <div className="stat-item">
                        <span className="stat-icon">📅</span>
                        <span className="stat-text">{member.stats.activities} activities</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-icon">💬</span>
                        <span className="stat-text">{member.stats.messages} messages</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-icon">💰</span>
                        <span className="stat-text">{member.stats.expenses} expenses</span>
                      </div>
                    </div>

                    {permissions.canManageMember(member) && (
                      <div className="member-actions">
                        {permissions.canChangeMemberRole(member, 'admin') && (
                          <select
                            className="role-dropdown"
                            value={member.role}
                            onChange={(e) => handleUpdateRole(member.id, e.target.value)}
                          >
                            <option value="admin">Admin</option>
                            <option value="member">Member</option>
                          </select>
                        )}
                        <button
                          className="remove-member-btn"
                          onClick={() => handleRemoveMember(member.id)}
                          title="Remove member"
                        >
                          🗑️ Remove
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <motion.div
          className="chat-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {pinnedMessages.length > 0 && (
            <div className="pinned-messages">
              <h3 className="pinned-header">📌 Pinned Messages</h3>
              {pinnedMessages.map(msg => (
                <div key={msg.id} className="pinned-message">
                  <p className="pinned-text">{msg.text}</p>
                  <span className="pinned-author">by {msg.userName} • {getTimeAgo(msg.timestamp)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="messages-container">
            {messages.map(msg => {
              const isMine = msg.userId === currentUserId
              return (
                <div 
                  key={msg.id} 
                  className={`message-wrapper ${isMine ? 'mine' : 'theirs'}`}
                >
                  {!isMine && (
                    <div className="message-avatar-container">
                      <div className="message-avatar">{msg.avatar}</div>
                    </div>
                  )}
                  <div className="message-content-wrapper">
                    <div className={`message-bubble ${isMine ? 'mine' : 'theirs'}`}>
                      {!isMine && (
                        <div className="message-author-name">{msg.userName}</div>
                      )}
                      <p className="message-text">{msg.text}</p>
                      <div className="message-footer">
                        <span className="message-time">{getTimeAgo(msg.timestamp)}</span>
                        {isMine && msg.readBy.length > 0 && (
                          <span className="message-read-status">
                            {msg.readBy.length === 1 ? '✓' : '✓✓'}
                          </span>
                        )}
                      </div>
                    </div>
                    {Object.keys(msg.reactions).length > 0 && (
                      <div className="message-reactions">
                        {Object.entries(msg.reactions).map(([emoji, count]) => (
                          <span key={emoji} className="reaction-badge">
                            {emoji} {count}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="message-actions-hover">
                      <button 
                        className="action-btn-hover"
                        onClick={() => handleReaction(msg.id, '👍')}
                        title="Like"
                      >
                        👍
                      </button>
                      <button 
                        className="action-btn-hover"
                        onClick={() => handleReaction(msg.id, '❤️')}
                        title="Love"
                      >
                        ❤️
                      </button>
                      {permissions.canPinMessages && (
                        <button 
                          className="action-btn-hover"
                          onClick={() => handlePinMessage(msg.id)}
                          title={msg.isPinned ? 'Unpin' : 'Pin'}
                        >
                          📌
                        </button>
                      )}
                      {(isMine ? permissions.canDeleteOwnMessages : permissions.canDeleteAnyMessage) && (
                        <button 
                          className="action-btn-hover delete"
                          onClick={() => handleDeleteMessage(msg.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                  {isMine && (
                    <div className="message-avatar-container">
                      <div className="message-avatar">{msg.avatar}</div>
                    </div>
                  )}
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {typingUsers.length > 0 && (
            <div className="typing-indicator">
              🟢 {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
            </div>
          )}

          <div className="message-input-container">
            <button className="input-action-btn" title="Attach file">
              📎
            </button>
            <button className="input-action-btn" title="Add emoji">
              😊
            </button>
            <input
              type="text"
              className="message-input"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            />
            <button 
              className="send-button" 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <span className="send-icon">➤</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Polls Tab */}
      {activeTab === 'polls' && (
        <motion.div
          className="polls-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="polls-header">
            <h2>Polls & Decisions</h2>
            {permissions.canCreatePoll && (
              <button className="create-poll-btn" onClick={() => setShowPollForm(true)}>
                + Create Poll
              </button>
            )}
          </div>

          {showPollForm && (
            <div className="poll-form">
              <h3>Create New Poll</h3>
              <input
                type="text"
                className="poll-title-input"
                placeholder="Poll question..."
                value={newPoll.title}
                onChange={(e) => setNewPoll({ ...newPoll, title: e.target.value })}
              />
              {newPoll.options.map((option, i) => (
                <input
                  key={i}
                  type="text"
                  className="poll-option-input"
                  placeholder={`Option ${i + 1}...`}
                  value={option}
                  onChange={(e) => {
                    const opts = [...newPoll.options]
                    opts[i] = e.target.value
                    setNewPoll({ ...newPoll, options: opts })
                  }}
                />
              ))}
              <button 
                className="add-option-btn"
                onClick={() => setNewPoll({ ...newPoll, options: [...newPoll.options, ''] })}
              >
                + Add Option
              </button>
              <div className="poll-form-actions">
                <button className="cancel-poll-btn" onClick={() => {
                  setShowPollForm(false)
                  setNewPoll({ title: '', options: ['', ''] })
                }}>
                  Cancel
                </button>
                <button className="submit-poll-btn" onClick={handleCreatePoll}>
                  Create Poll
                </button>
              </div>
            </div>
          )}

          {activePolls.length > 0 && (
            <div className="polls-group">
              <h3 className="polls-group-title">Active Polls ({activePolls.length})</h3>
              {activePolls.map(poll => {
                const totalVotes = getTotalVotes(poll)
                const hasVoted = poll.options.some(opt => opt.votes.includes(currentUserId))
                
                return (
                  <div key={poll.id} className="poll-card">
                    <div className="poll-header">
                      <h4 className="poll-title">📊 {poll.title}</h4>
                      <span className="poll-meta">
                        by {poll.creatorName} • Ends {getTimeAgo(poll.closesAt)}
                      </span>
                    </div>

                    {totalVotes > 0 && (
                      <div className="poll-current-leader">
                        <div className="leader-badge">🏆 Current Leader</div>
                        <div className="leader-info">
                          <span className="leader-option">
                            {poll.options.reduce((max, opt) => 
                              opt.votes.length > max.votes.length ? opt : max
                            , poll.options[0]).text}
                          </span>
                          <span className="leader-stats">
                            {getVotePercentage(poll.options.reduce((max, opt) => 
                              opt.votes.length > max.votes.length ? opt : max
                            , poll.options[0]), totalVotes)}% • {poll.options.reduce((max, opt) => 
                              opt.votes.length > max.votes.length ? opt : max
                            , poll.options[0]).votes.length} votes
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="poll-options">
                      {poll.options.map(option => {
                        const percentage = getVotePercentage(option, totalVotes)
                        const isSelected = option.votes.includes(currentUserId)
                        
                        return (
                          <div 
                            key={option.id} 
                            className={`poll-option ${isSelected ? 'selected' : ''}`}
                            onClick={() => !hasVoted && handleVotePoll(poll.id, option.id)}
                          >
                            <div className="poll-option-content">
                              <span className="poll-option-check">
                                {isSelected ? '☑' : '○'}
                              </span>
                              <span className="poll-option-text">{option.text}</span>
                              <div className="poll-option-stats">
                                <span className="poll-option-percentage">{percentage}%</span>
                                <span className="poll-option-votes">{option.votes.length}</span>
                              </div>
                            </div>
                            <div className="poll-progress-bar">
                              <div 
                                className="poll-progress-fill"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="poll-footer">
                      <span className="poll-votes-count">
                        👥 {totalVotes} of {members.length} members voted
                      </span>
                      {permissions.canClosePoll && (
                        <button 
                          className="close-poll-btn"
                          onClick={() => handleClosePoll(poll.id)}
                        >
                          Close Poll
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {closedPolls.length > 0 && (
            <div className="polls-group">
              <h3 className="polls-group-title">Closed Polls ({closedPolls.length})</h3>
              {closedPolls.map(poll => {
                const totalVotes = getTotalVotes(poll)
                const winningOption = poll.options.reduce((max, opt) => 
                  opt.votes.length > max.votes.length ? opt : max
                , poll.options[0])
                
                return (
                  <div key={poll.id} className="poll-card closed">
                    <div className="poll-header">
                      <h4 className="poll-title">📊 {poll.title}</h4>
                      <span className="poll-meta">
                        Closed {getTimeAgo(poll.closedAt)}
                      </span>
                    </div>

                    <div className="poll-winner">
                      🏆 Winner: <strong>{winningOption.text}</strong> ({winningOption.votes.length} votes)
                    </div>

                    <div className="poll-options">
                      {poll.options.map(option => {
                        const percentage = getVotePercentage(option, totalVotes)
                        return (
                          <div key={option.id} className="poll-option disabled">
                            <div className="poll-option-content">
                              <span className="poll-option-text">{option.text}</span>
                              <span className="poll-option-percentage">{percentage}%</span>
                            </div>
                            <div className="poll-progress-bar">
                              <div 
                                className="poll-progress-fill"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </motion.div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <motion.div
          className="settings-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="settings-group">
            <h3 className="settings-title">Group Information</h3>
            <div className="setting-item">
              <label>Group Name</label>
              <input 
                type="text" 
                className="setting-input" 
                defaultValue={tripData.destination || 'Trip Group'}
                disabled={!permissions.canEditSettings}
              />
            </div>
          </div>

          <div className="settings-group">
            <h3 className="settings-title">Member Permissions</h3>
            
            <div className="setting-item">
              <div className="setting-info">
                <label>Members can edit itinerary</label>
                <p>Allow members to add and modify activities</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.memberCanEdit}
                  onChange={(e) => handleSettingChange('memberCanEdit', e.target.checked)}
                  disabled={!permissions.canEditSettings}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Members can invite others</label>
                <p>Allow members to send invite links</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.allowMemberInvites}
                  onChange={(e) => handleSettingChange('allowMemberInvites', e.target.checked)}
                  disabled={!permissions.canEditSettings}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Require admin approval</label>
                <p>New members need admin approval to join</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.requireApproval}
                  onChange={(e) => handleSettingChange('requireApproval', e.target.checked)}
                  disabled={!permissions.canEditSettings}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Members can create polls</label>
                <p>Allow members to create polls for decisions</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.memberCanCreatePolls}
                  onChange={(e) => handleSettingChange('memberCanCreatePolls', e.target.checked)}
                  disabled={!permissions.canEditSettings}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-group">
            <h3 className="settings-title">Notifications</h3>
            
            <div className="setting-item">
              <div className="setting-info">
                <label>New member joined</label>
                <p>Get notified when someone joins the trip</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifyNewMember}
                  onChange={(e) => handleSettingChange('notifyNewMember', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>Itinerary changes</label>
                <p>Get notified when activities are added or changed</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifyItineraryChange}
                  onChange={(e) => handleSettingChange('notifyItineraryChange', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>New messages</label>
                <p>Get notified for new chat messages</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifyNewMessage}
                  onChange={(e) => handleSettingChange('notifyNewMessage', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label>New polls</label>
                <p>Get notified when a new poll is created</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifyNewPoll}
                  onChange={(e) => handleSettingChange('notifyNewPoll', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          {permissions.canLeaveGroup && (
            <div className="settings-group danger-zone">
              <h3 className="settings-title">Danger Zone</h3>
              
              <div className="setting-item">
                <div className="setting-info">
                  <label>Leave Group</label>
                  <p>You will lose access to this trip</p>
                </div>
                <button className="danger-button">Leave Trip</button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="modal-overlay" onClick={() => setShowInviteModal(false)}>
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="modal-header">
                <h2>Invite Members</h2>
                <button className="modal-close" onClick={() => setShowInviteModal(false)}>
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <p className="modal-description">Share this link with your travel buddies:</p>
                <div className="invite-link-box">
                  <input
                    type="text"
                    className="invite-link-input"
                    value={inviteLink}
                    readOnly
                  />
                  <button className="copy-button" onClick={handleCopyLink}>
                    📋 Copy
                  </button>
                </div>
                <p className="modal-note">This link will expire in 7 days</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Conversion Modal */}
      <ConversionModal
        isOpen={showConversion}
        type="toSolo"
        onConfirm={() => {
          // TODO: Backend API call to convert group to solo
          console.log('Convert to solo')
          setShowConversion(false)
        }}
        onCancel={() => setShowConversion(false)}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        userId={selectedUserId}
        isOwnProfile={selectedUserId === currentUserId}
        onAdminAction={permissions.canManageMembers ? handleAdminAction : null}
      />
    </div>
  )
}

export default WorkspaceGroup
