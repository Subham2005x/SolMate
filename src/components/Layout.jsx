import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="app">
      <Header />
      <main id="main-content" className="main-content" role="main">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
