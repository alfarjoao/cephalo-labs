import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { EnvironmentProvider } from './components/ui/EnvironmentContext'
import ScrollToTop from './components/ui/ScrollToTop'
import GrainOverlay from './components/ui/GrainOverlay'
import { useLenis } from './hooks/useLenis'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Founder from './pages/Founder'
import Partners from './pages/Partners'
import Contact from './pages/Contact'
import ProductPolypus from './pages/ProductPolypus'
import ProductKernel from './pages/ProductKernel'

export default function App() {
  const location = useLocation()
  useLenis()
  return (
    <EnvironmentProvider>
      <ScrollToTop />
      <GrainOverlay opacity={0.022} />
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/polypus" element={<ProductPolypus />} />
          <Route path="/products/kernel"  element={<ProductKernel />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </EnvironmentProvider>
  )
}
