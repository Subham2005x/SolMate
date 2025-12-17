import { motion, AnimatePresence } from 'framer-motion'
import './ConversionModal.css'

function ConversionModal({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  type = 'toGroup', // 'toGroup' or 'toSolo'
  inviteCount = 0 
}) {
  const isConvertingToGroup = type === 'toGroup'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="conversion-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="conversion-modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="conversion-modal-header">
              <div className="conversion-icon">
                {isConvertingToGroup ? '👥' : '🧍'}
              </div>
              <h2>
                {isConvertingToGroup 
                  ? 'Convert to Group Trip?' 
                  : 'Convert Back to Solo Trip?'}
              </h2>
              <button className="modal-close-btn" onClick={onCancel}>
                ✕
              </button>
            </div>

            <div className="conversion-modal-body">
              {isConvertingToGroup ? (
                <>
                  <div className="warning-banner">
                    <span className="warning-icon">⚠️</span>
                    <span>This will change your solo trip into a group trip</span>
                  </div>

                  <div className="changes-list">
                    <h3>What will change:</h3>
                    <div className="change-item positive">
                      <span className="change-icon">✓</span>
                      <span>You'll become the <strong>Admin</strong> of this group</span>
                    </div>
                    <div className="change-item positive">
                      <span className="change-icon">✓</span>
                      <span><strong>Group Chat</strong> will be enabled for collaboration</span>
                    </div>
                    <div className="change-item positive">
                      <span className="change-icon">✓</span>
                      <span><strong>Polls & Decisions</strong> feature unlocked</span>
                    </div>
                    <div className="change-item positive">
                      <span className="change-icon">✓</span>
                      <span>Members can view and contribute to the trip</span>
                    </div>
                    <div className="change-item negative">
                      <span className="change-icon">✗</span>
                      <span><strong>Community</strong> features will be removed</span>
                    </div>
                    <div className="change-item negative">
                      <span className="change-icon">✗</span>
                      <span>Trip becomes <strong>collaborative</strong> (not just yours)</span>
                    </div>
                  </div>

                  {inviteCount > 0 && (
                    <div className="invite-info">
                      <span className="invite-icon">📧</span>
                      <span>Invites will be sent to <strong>{inviteCount}</strong> {inviteCount === 1 ? 'person' : 'people'}</span>
                    </div>
                  )}

                  <div className="reversibility-note">
                    <span className="note-icon">ℹ️</span>
                    <span>You can convert back to solo by removing all members</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="warning-banner">
                    <span className="warning-icon">⚠️</span>
                    <span>This will convert your group trip back to solo</span>
                  </div>

                  <div className="changes-list">
                    <h3>What will change:</h3>
                    <div className="change-item positive">
                      <span className="change-icon">✓</span>
                      <span><strong>Community</strong> features will be restored</span>
                    </div>
                    <div className="change-item positive">
                      <span className="change-icon">✓</span>
                      <span>Trip becomes <strong>private</strong> again (only you)</span>
                    </div>
                    <div className="change-item positive">
                      <span className="change-icon">✓</span>
                      <span>Full control without collaboration</span>
                    </div>
                    <div className="change-item negative">
                      <span className="change-icon">✗</span>
                      <span><strong>Group Chat</strong> will be archived</span>
                    </div>
                    <div className="change-item negative">
                      <span className="change-icon">✗</span>
                      <span><strong>Polls</strong> will be closed</span>
                    </div>
                    <div className="change-item negative">
                      <span className="change-icon">✗</span>
                      <span>Members will lose access</span>
                    </div>
                  </div>

                  <div className="important-note">
                    <span className="note-icon">⚠️</span>
                    <span><strong>Important:</strong> All members must be removed before converting to solo</span>
                  </div>
                </>
              )}
            </div>

            <div className="conversion-modal-footer">
              <button className="btn-cancel" onClick={onCancel}>
                {isConvertingToGroup ? 'Stay Solo' : 'Keep Group'}
              </button>
              <button className="btn-confirm" onClick={onConfirm}>
                {isConvertingToGroup ? '👥 Convert to Group' : '🧍 Convert to Solo'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConversionModal
