import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import TripFlowLayout from '../components/TripFlowLayout'
import './BudgetTracking.css'

function BudgetTracking() {
  const navigate = useNavigate()
  const location = useLocation()
  const tripData = location.state?.tripData || {}
  const totalBudget = tripData.budget || 2000

  const [expenses, setExpenses] = useState([
    { id: 1, category: 'accommodation', amount: 450, description: 'Hotel booking' },
    { id: 2, category: 'food', amount: 120, description: 'Restaurants' }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newExpense, setNewExpense] = useState({
    category: 'food',
    amount: '',
    description: ''
  })

  const categories = [
    { value: 'accommodation', label: 'Accommodation', icon: '🏨', color: '#3b82f6' },
    { value: 'food', label: 'Food & Dining', icon: '🍽️', color: '#10b981' },
    { value: 'transport', label: 'Transportation', icon: '🚗', color: '#f59e0b' },
    { value: 'activities', label: 'Activities', icon: '🎯', color: '#8b5cf6' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️', color: '#ec4899' },
    { value: 'other', label: 'Other', icon: '📦', color: '#6b7280' }
  ]

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const remaining = totalBudget - totalSpent
  const percentageUsed = (totalSpent / totalBudget) * 100

  const getCategoryInfo = (categoryValue) => {
    return categories.find(cat => cat.value === categoryValue) || categories[0]
  }

  const handleAddExpense = () => {
    if (newExpense.amount && newExpense.description) {
      setExpenses([
        ...expenses,
        {
          id: Date.now(),
          category: newExpense.category,
          amount: parseFloat(newExpense.amount),
          description: newExpense.description
        }
      ])
      setNewExpense({ category: 'food', amount: '', description: '' })
      setShowAddForm(false)
    }
  }

  const handleRemoveExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  const handleContinue = () => {
    navigate('/trip/buddy', { 
      state: { 
        tripData: { ...tripData, expenses } 
      } 
    })
  }

  const handleBack = () => {
    navigate('/trip/itinerary', { state: { tripData } })
  }

  return (
    <TripFlowLayout currentStep={5}>
      <div className="flow-screen">
        <div className="flow-screen-header">
          <h1 className="flow-screen-title">Track Your Budget</h1>
          <p className="flow-screen-description">
            Keep tabs on your spending. Add expenses as you plan or travel.
          </p>
        </div>

        <div className="flow-screen-body">
          {/* Budget Summary */}
          <div className="budget-summary-card">
            <div className="summary-stats">
              <div className="summary-stat">
                <div className="stat-label">Total Budget</div>
                <div className="stat-value">${totalBudget.toLocaleString()}</div>
              </div>
              <div className="summary-stat">
                <div className="stat-label">Spent</div>
                <div className="stat-value spent">${totalSpent.toLocaleString()}</div>
              </div>
              <div className="summary-stat">
                <div className="stat-label">Remaining</div>
                <div className={`stat-value ${remaining < 0 ? 'over-budget' : 'remaining'}`}>
                  ${Math.abs(remaining).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="budget-progress-bar">
              <div 
                className={`budget-progress-fill ${percentageUsed > 100 ? 'over-budget' : ''}`}
                style={{ width: `${Math.min(percentageUsed, 100)}%` }}
              />
            </div>
            <div className="budget-progress-label">
              {percentageUsed.toFixed(0)}% of budget used
            </div>
          </div>

          {/* Expenses List */}
          <div className="expenses-section">
            <div className="expenses-header">
              <h3>Expenses</h3>
              <button 
                className="add-expense-button"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                <span>{showAddForm ? '✕' : '+'}</span>
                <span>{showAddForm ? 'Cancel' : 'Add Expense'}</span>
              </button>
            </div>

            {/* Add Expense Form */}
            {showAddForm && (
              <motion.div
                className="add-expense-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="form-row">
                  <div className="flow-form-group">
                    <label className="flow-form-label">Category</label>
                    <select
                      className="flow-input"
                      value={newExpense.category}
                      onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.icon} {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flow-form-group">
                    <label className="flow-form-label">Amount</label>
                    <div className="amount-input-wrapper">
                      <span className="currency-symbol">$</span>
                      <input
                        type="number"
                        className="flow-input amount-input"
                        placeholder="0.00"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flow-form-group">
                  <label className="flow-form-label">Description</label>
                  <input
                    type="text"
                    className="flow-input"
                    placeholder="What was this for?"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  />
                </div>

                <button 
                  className="save-expense-button"
                  onClick={handleAddExpense}
                  disabled={!newExpense.amount || !newExpense.description}
                >
                  Save Expense
                </button>
              </motion.div>
            )}

            {/* Expense Items */}
            <div className="expenses-list">
              {expenses.map(expense => {
                const categoryInfo = getCategoryInfo(expense.category)
                return (
                  <div key={expense.id} className="expense-item">
                    <div className="expense-icon" style={{ color: categoryInfo.color }}>
                      {categoryInfo.icon}
                    </div>
                    <div className="expense-details">
                      <div className="expense-description">{expense.description}</div>
                      <div className="expense-category">{categoryInfo.label}</div>
                    </div>
                    <div className="expense-amount">${expense.amount.toLocaleString()}</div>
                    <button
                      className="remove-expense-button"
                      onClick={() => handleRemoveExpense(expense.id)}
                      aria-label="Remove expense"
                    >
                      ✕
                    </button>
                  </div>
                )
              })}

              {expenses.length === 0 && !showAddForm && (
                <div className="empty-expenses">
                  <div className="empty-icon">💰</div>
                  <p>No expenses yet. Add one to start tracking.</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flow-button-group">
            <button 
              className="flow-button flow-button-secondary"
              onClick={handleBack}
            >
              Back
            </button>
            <button 
              className="flow-button flow-button-primary"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </TripFlowLayout>
  )
}

export default BudgetTracking
