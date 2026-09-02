import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'
import Navbar from './components/Navbar.jsx'
import TopBar from './components/TopBar.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import Preloader from './components/Preloader.jsx'
import PageTransition from './components/PageTransition.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import HoverPeek from './components/HoverPeek.jsx'
import ScrollProgressBar from './components/ScrollProgressBar.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import DeepClean from './pages/DeepClean.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  useSmoothScroll()

  // Scroll-reveal is only enabled once we've confirmed the browser can do
  // it — content stays fully visible otherwise, it never disappears by default.
  useEffect(() => {
    if ('IntersectionObserver' in window) {
      document.documentElement.classList.add('reveal-ready')
    }
  }, [])

  return (
    <>
      <Preloader />
      <ScrollProgressBar />
      <CustomCursor />
      <HoverPeek />
      <TopBar />
      <Navbar />
      <PageTransition>
        {(location) => (
          <main>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:categoryId" element={<Services />} />
              <Route path="/deep-cleaning" element={<DeepClean />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        )}
      </PageTransition>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
