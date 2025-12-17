import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './WorkspaceBudget.css'

function WorkspaceBudget({ tripData }) {
  // Get currency preference from localStorage
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('preferredCurrency')
    return saved || 'USD'
  })

  // Listen for currency changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('preferredCurrency')
      if (saved) setCurrency(saved)
    }
    const handleCurrencyChange = (e) => {
      setCurrency(e.detail)
    }
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('currencyChange', handleCurrencyChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('currencyChange', handleCurrencyChange)
    }
  }, [])

  // TODO: Fetch actual budget data from backend
  const [budgetData] = useState({
    total: tripData.budget,
    spent: 2450,
    categories: [
      { id: 1, name: 'Accommodation', allocated: 3000, spent: 1200, icon: '🏨', color: '#8B5CF6' },
      { id: 2, name: 'Transport', allocated: 1500, spent: 800, icon: '✈️', color: '#3B82F6' },
      { id: 3, name: 'Food', allocated: 2000, spent: 350, icon: '🍽️', color: '#F59E0B' },
      { id: 4, name: 'Activities', allocated: 1500, spent: 100, icon: '🎯', color: '#10B981' },
      { id: 5, name: 'Shopping', allocated: 1000, spent: 0, icon: '🛍️', color: '#EC4899' }
    ]
  })

  const [expenses, setExpenses] = useState([
    { id: 1, date: '2024-03-01', category: 'Accommodation', description: 'Hotel Booking - Shibuya Grand', amount: 1200, currency: 'USD' },
    { id: 2, date: '2024-03-02', category: 'Transport', description: 'Flight Tickets', amount: 800, currency: 'USD' },
    { id: 3, date: '2024-03-10', category: 'Food', description: 'Restaurant Reservation', amount: 150, currency: 'USD' },
    { id: 4, date: '2024-03-12', category: 'Activities', description: 'Tokyo Skytree Tickets', amount: 100, currency: 'USD' },
    { id: 5, date: '2024-03-14', category: 'Food', description: 'Tsukiji Market Food Tour', amount: 200, currency: 'USD' }
  ])

  const [showAddExpense, setShowAddExpense] = useState(false)

  const remaining = budgetData.total - budgetData.spent
  const percentageSpent = Math.round((budgetData.spent / budgetData.total) * 100)

  const handleAddExpense = () => {
    // TODO: Backend API call to add expense
    setShowAddExpense(true)
  }

  const handleDeleteExpense = (expenseId) => {
    // TODO: Backend API call to delete expense
    setExpenses(expenses.filter(e => e.id !== expenseId))
  }

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value
    setCurrency(newCurrency)
    localStorage.setItem('preferredCurrency', newCurrency)
    window.dispatchEvent(new CustomEvent('currencyChange', { detail: newCurrency }))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="workspace-budget">
      <div className="budget-header">
        <div className="header-left">
          <h1>Budget Tracking</h1>
          <p className="header-subtitle">Monitor your expenses and stay on track</p>
        </div>
        <div className="header-right">
          <div className="currency-selector">
            <span className="currency-label">💰</span>
            <select 
              className="currency-select" 
              value={currency} 
              onChange={handleCurrencyChange}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="INR">INR (₹)</option>
              <option value="CAD">CAD ($)</option>
              <option value="AUD">AUD ($)</option>
            </select>
          </div>
          <button className="add-expense-button" onClick={handleAddExpense}>
            <span>+ Add Expense</span>
          </button>
        </div>
      </div>

      {/* Budget Overview */}
      <motion.div
        className="budget-overview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="overview-card total">
          <div className="overview-icon">💰</div>
          <div className="overview-content">
            <div className="overview-label">Total Budget</div>
            <div className="overview-value">{formatCurrency(budgetData.total)}</div>
          </div>
        </div>

        <div className="overview-card spent">
          <div className="overview-icon">💸</div>
          <div className="overview-content">
            <div className="overview-label">Total Spent</div>
            <div className="overview-value">{formatCurrency(budgetData.spent)}</div>
            <div className="overview-percentage">{percentageSpent}% of budget</div>
          </div>
        </div>

        <div className="overview-card remaining">
          <div className="overview-icon">💵</div>
          <div className="overview-content">
            <div className="overview-label">Remaining</div>
            <div className="overview-value">{formatCurrency(remaining)}</div>
            <div className="overview-percentage">{100 - percentageSpent}% available</div>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="budget-progress-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="progress-header">
          <span className="progress-label">Budget Usage</span>
          <span className="progress-value">{percentageSpent}%</span>
        </div>
        <div className="progress-bar-track">
          <div
            className={`progress-bar-fill ${percentageSpent > 90 ? 'warning' : ''}`}
            style={{ width: `${percentageSpent}%` }}
          />
        </div>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        className="category-breakdown"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="section-title">Budget by Category</h2>
        <div className="category-grid">
          {budgetData.categories.map((category, index) => {
            const categoryPercentage = Math.round((category.spent / category.allocated) * 100)
            const categoryRemaining = category.allocated - category.spent

            return (
              <motion.div
                key={category.id}
                className="category-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="category-header">
                  <div
                    className="category-icon"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    {category.icon}
                  </div>
                  <h3 className="category-name">{category.name}</h3>
                </div>

                <div className="category-amounts">
                  <div className="amount-row">
                    <span className="amount-label">Spent</span>
                    <span className="amount-value spent">{formatCurrency(category.spent)}</span>
                  </div>
                  <div className="amount-row">
                    <span className="amount-label">Allocated</span>
                    <span className="amount-value">{formatCurrency(category.allocated)}</span>
                  </div>
                  <div className="amount-row remaining">
                    <span className="amount-label">Remaining</span>
                    <span className="amount-value">{formatCurrency(categoryRemaining)}</span>
                  </div>
                </div>

                <div className="category-progress">
                  <div className="category-progress-bar">
                    <div
                      className="category-progress-fill"
                      style={{
                        width: `${Math.min(categoryPercentage, 100)}%`,
                        backgroundColor: category.color
                      }}
                    />
                  </div>
                  <span className="category-percentage">{categoryPercentage}%</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Recent Expenses */}
      <motion.div
        className="recent-expenses"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="expenses-header">
          <h2 className="section-title">Recent Expenses</h2>
          <select className="filter-select">
            <option>All Categories</option>
            {budgetData.categories.map(cat => (
              <option key={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {expenses.length === 0 ? (
          <div className="empty-expenses">
            <div className="empty-icon">💸</div>
            <h3>No expenses yet</h3>
            <p>Start tracking by adding your first expense</p>
            <button className="empty-add-button" onClick={handleAddExpense}>
              + Add Expense
            </button>
          </div>
        ) : (
          <div className="expenses-list">
            {expenses.map((expense, index) => {
              const category = budgetData.categories.find(c => c.name === expense.category)
              return (
                <motion.div
                  key={expense.id}
                  className="expense-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div
                    className="expense-icon"
                    style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
                  >
                    {category?.icon}
                  </div>

                  <div className="expense-details">
                    <div className="expense-description">{expense.description}</div>
                    <div className="expense-meta">
                      <span className="expense-category">{expense.category}</span>
                      <span className="expense-date">{formatDate(expense.date)}</span>
                    </div>
                  </div>

                  <div className="expense-amount">{formatCurrency(expense.amount)}</div>

                  <button
                    className="expense-delete"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    🗑️
                  </button>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>

      {/* Add Expense Modal Placeholder */}
      {showAddExpense && (
        <div className="modal-overlay" onClick={() => setShowAddExpense(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Expense</h2>
              <button className="modal-close" onClick={() => setShowAddExpense(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              {/* TODO: Implement full expense form with backend integration */}
              <p className="modal-placeholder">
                Expense form will be connected to backend here.
                <br />
                Fields: Amount, Category, Description, Date, Currency, Receipt Upload
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkspaceBudget
