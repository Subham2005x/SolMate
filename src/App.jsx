import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import Features from './pages/Features'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import Waitlist from './pages/Waitlist'
import Auth from './pages/Auth'
import AuthVerify from './pages/AuthVerify'
import Dashboard from './pages/Dashboard'
// Trip Flow Screens
import TripSetup from './pages/TripSetup'
import BudgetInput from './pages/BudgetInput'
import Suggestions from './pages/Suggestions'
import ItineraryBuilder from './pages/ItineraryBuilder'
import BudgetTracking from './pages/BudgetTracking'
import TravelBuddy from './pages/TravelBuddy'
// Trip Workspace
import TripWorkspace from './pages/workspace/TripWorkspace'

function App() {
  return (
    <>
      <ScrollProgress />
      <Routes>
        {/* Auth routes (no layout) */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/verify" element={<AuthVerify />} />
        
        {/* Dashboard route (no layout - full app experience) */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Trip Workspace (no layout - dedicated workspace experience) */}
        <Route path="/workspace/:tripId/*" element={<TripWorkspace />} />
        
        {/* Trip Planning Flow (no layout - full flow experience) */}
        <Route path="/trip/setup" element={<TripSetup />} />
        <Route path="/trip/budget" element={<BudgetInput />} />
        <Route path="/trip/suggestions" element={<Suggestions />} />
        <Route path="/trip/itinerary" element={<ItineraryBuilder />} />
        <Route path="/trip/expenses" element={<BudgetTracking />} />
        <Route path="/trip/buddy" element={<TravelBuddy />} />
        
        {/* Main routes (with layout) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/waitlist" element={<Waitlist />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
