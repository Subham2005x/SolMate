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

function App() {
  return (
    <>
      <ScrollProgress />
      <Routes>
        {/* Auth routes (no layout) */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/verify" element={<AuthVerify />} />
        
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
