import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Applications from './pages/Applications'; // ← ADD THIS IMPORT
import Events from './pages/Events'; // ← ADD THIS IMPORT
import Careers from './pages/Careers'; // ← ADD THIS IMPORT

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:brandId/:productId" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/applications" element={<Applications />} /> {/* ← ADD THIS ROUTE */}
              <Route path="/events" element={<Events />} /> {/* ← ADD THIS ROUTE */}
              <Route path="/careers" element={<Careers />} /> {/* ← ADD THIS ROUTE */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;