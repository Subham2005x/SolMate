import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import TripFlowLayout from '../components/TripFlowLayout'
import './BudgetInput.css'

function BudgetInput() {
  const navigate = useNavigate()
  const location = useLocation()
  const tripData = location.state?.tripData || {}

  const [budget, setBudget] = useState(2000)
  const [customAmount, setCustomAmount] = useState('')
  const [useCustom, setUseCustom] = useState(false)

  const budgetRanges = [
    { min: 500, max: 1000, label: '$500 - $1,000' },
    { min: 1000, max: 2500, label: '$1,000 - $2,500' },
    { min: 2500, max: 5000, label: '$2,500 - $5,000' },
    { min: 5000, max: 10000, label: '$5,000+' }
  ]

  const handleSliderChange = (e) => {
    setBudget(parseInt(e.target.value))
    setUseCustom(false)
    setCustomAmount('')
  }

  const handleCustomChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setCustomAmount(value)
    if (value) {
      setBudget(parseInt(value))
      setUseCustom(true)
    }
  }

  const handleContinue = () => {
    navigate('/trip/suggestions', { 
      state: { 
        tripData: { ...tripData, budget } 
      } 
    })
  }

  const handleBack = () => {
    navigate('/trip/setup', { state: { tripData } })
  }

  return (
    <TripFlowLayout currentStep={2}>
      <div className="flow-screen">
        <div className="flow-screen-header">
          <h1 className="flow-screen-title">Set Your Budget</h1>
          <p className="flow-screen-description">
            This helps us guide you better. Your budget is approximate and flexible.
          </p>
        </div>

        <div className="flow-screen-body">
          {/* Budget Slider */}
          <div className="budget-slider-section">
            <div className="budget-display">
              <div className="budget-amount">
                ${useCustom && customAmount ? parseInt(customAmount).toLocaleString() : budget.toLocaleString()}
              </div>
              <div className="budget-label">Total Trip Budget</div>
            </div>

            <div className="slider-container">
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={budget}
                onChange={handleSliderChange}
                className="budget-slider"
              />
              <div className="slider-markers">
                <span className="slider-marker">$500</span>
                <span className="slider-marker">$2.5K</span>
                <span className="slider-marker">$5K</span>
                <span className="slider-marker">$10K</span>
              </div>
            </div>
          </div>

          {/* Budget Range Cards */}
          <div className="budget-ranges">
            {budgetRanges.map((range, index) => {
              const isActive = !useCustom && budget >= range.min && budget < range.max
              return (
                <button
                  key={index}
                  className={`budget-range-card ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setBudget((range.min + range.max) / 2)
                    setUseCustom(false)
                    setCustomAmount('')
                  }}
                >
                  {range.label}
                </button>
              )
            })}
          </div>

          {/* Custom Amount Input */}
          <div className="flow-form-group">
            <label className="flow-form-label" htmlFor="customAmount">
              Or enter a custom amount
            </label>
            <div className="custom-amount-input">
              <span className="currency-symbol">$</span>
              <input
                id="customAmount"
                type="text"
                className="flow-input custom-input"
                placeholder="Enter amount"
                value={customAmount}
                onChange={handleCustomChange}
              />
            </div>
            <p className="flow-form-hint">
              💡 You can adjust this anytime as you plan
            </p>
          </div>

          {/* Info Card */}
          <div className="budget-info-card">
            <div className="info-card-icon">💰</div>
            <div className="info-card-content">
              <h4>Why we ask</h4>
              <p>
                Your budget helps us suggest realistic activities and keep track of expenses. 
                It's a guide, not a limit—feel free to adjust as you plan.
              </p>
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

export default BudgetInput
