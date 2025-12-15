import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import Features from './pages/Features'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import Waitlist from './pages/Waitlist'

function App() {
  return (
    <>
      <ScrollProgress />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/waitlist" element={<Waitlist />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
