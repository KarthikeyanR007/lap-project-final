import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes, 
  FaChevronDown,
  FaFlask,
  FaMicroscope,
  FaThermometerHalf,
  FaVial,
  FaDna,
  FaLeaf,
  FaTint,
  FaCog,
  FaFire,
  FaBolt
} from 'react-icons/fa';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';

// Import product data
import productsData from '../data/products.json';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Brand colors and icons mapping
  const brandIcons = {
    'rs-equipments': <FaThermometerHalf />,
    'accumax': <FaVial />,
    'neuation': <FaFlask />,
    'dlab': <FaDna />,
    'sr-lab-instruments': <FaLeaf />
  };

  const brandColors = {
    'rs-equipments': 'border-blue-500',
    'accumax': 'border-green-500',
    'neuation': 'border-purple-500',
    'dlab': 'border-red-500',
    'sr-lab-instruments': 'border-orange-500'
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowMegaMenu(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setShowMegaMenu(false);
  };

  const handleProductClick = (brandId, productId) => {
    setShowMegaMenu(false);
    setMobileMenuOpen(false);
    navigate(`/products/${brandId}/${productId}`);
  };

  const handleBrandClick = (brandId) => {
    setShowMegaMenu(false);
    setMobileMenuOpen(false);
    navigate(`/products?brand=${brandId}`);
  };

  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/products', label: 'Products', hasDropdown: true },
    { path: '/applications', label: 'Applications' },
    { path: '/events', label: 'Events' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen 
            ? 'bg-white shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <FaFlask className="text-white text-xl" />
              </div>
              <div>
                <span className="text-xl font-bold text-primary">LabEquip</span>
                <span className="text-xs text-accent block -mt-1">Precision Instruments</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div key={link.path} className="relative">
                  {link.hasDropdown ? (
                    <div 
                      className="relative"
                      onMouseEnter={() => setShowMegaMenu(true)}
                      onMouseLeave={() => setShowMegaMenu(false)}
                    >
                      <button 
                        className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                          scrolled ? 'text-gray-700 hover:text-accent' : 'text-white hover:text-accent'
                        }`}
                      >
                        <span>Products</span>
                        <FaChevronDown className="text-xs" />
                      </button>
                    </div>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `text-sm font-medium transition-colors ${
                          isActive 
                            ? 'text-accent' 
                            : scrolled ? 'text-gray-700 hover:text-accent' : 'text-white hover:text-accent'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/contact"
                className="bg-highlight text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-yellow-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-2xl transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className={scrolled ? 'text-primary' : 'text-white'} />
              ) : (
                <FaBars className={scrolled ? 'text-primary' : 'text-white'} />
              )}
            </button>
          </div>
        </div>

        {/* Mega Dropdown */}
        <AnimatePresence>
          {showMegaMenu && (
            <div 
              className="hidden lg:block absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-7xl mx-auto px-6 py-8"
              >
                <div className="grid grid-cols-5 gap-8">
                  {productsData.brands.map((brand) => (
                    <div key={brand.id} className="space-y-4">
                      <div 
                        className="flex items-center space-x-2 cursor-pointer group"
                        onClick={() => handleBrandClick(brand.id)}
                      >
                        <span className="text-accent text-lg">
                          {brandIcons[brand.id] || <FaCog />}
                        </span>
                        <h4 className="font-bold text-primary uppercase text-sm tracking-wider group-hover:text-accent transition-colors">
                          {brand.name}
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {brand.categories.slice(0, 3).map((category) => (
                          <div key={category.id} className="space-y-1">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                              {category.name}
                            </p>
                                {category.products.slice(0, 3).map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => handleProductClick(brand.id, product.id)}
                                    className="block text-sm text-gray-600 hover:text-accent transition-colors pl-2 text-left w-full"
                                >
                                    • {product.name}
                                </button>
                                ))}
                            {category.products.length > 3 && (
                              <button
                                onClick={() => handleBrandClick(brand.id)}
                                className="text-xs text-accent hover:underline pl-2"
                              >
                                View all...
                              </button>
                            )}
                          </div>
                        ))}
                        {brand.categories.length > 3 && (
                          <button
                            onClick={() => handleBrandClick(brand.id)}
                            className="text-xs text-accent hover:underline font-medium flex items-center space-x-1"
                          >
                            <span>View all categories</span>
                            <HiOutlineArrowRight />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-20 right-0 bottom-0 w-80 bg-white shadow-2xl z-40 lg:hidden overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Mobile Nav Links */}
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <div key={link.path}>
                    {link.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setShowMegaMenu(!showMegaMenu)}
                          className="flex items-center justify-between w-full text-left font-medium text-gray-700 hover:text-accent transition-colors py-2"
                        >
                          <span>Products</span>
                          <FaChevronDown className={`text-xs transition-transform ${showMegaMenu ? 'rotate-180' : ''}`} />
                        </button>
                        {showMegaMenu && (
                          <div className="mt-3 pl-4 space-y-6 border-l-2 border-accent">
                            {productsData.brands.map((brand) => (
                              <div key={brand.id} className="space-y-2">
                                <button
                                  onClick={() => handleBrandClick(brand.id)}
                                  className="font-semibold text-primary text-sm hover:text-accent transition-colors flex items-center space-x-2"
                                >
                                  <span>{brandIcons[brand.id] || <FaCog />}</span>
                                  <span>{brand.name}</span>
                                </button>
                                <div className="pl-6 space-y-1">
                                  {brand.categories.slice(0, 2).map((category) => (
                                    <div key={category.id}>
                                      <p className="text-xs text-gray-400 font-semibold uppercase">
                                        {category.name}
                                      </p>
                                        {category.products.slice(0, 2).map((product) => (
                                            <button
                                                key={product.id}
                                                onClick={() => handleProductClick(brand.id, product.id)}
                                                className="block text-sm text-gray-600 hover:text-accent transition-colors py-1 text-left w-full"
                                            >
                                                • {product.name}
                                            </button>
                                            ))}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `block font-medium py-2 transition-colors ${
                            isActive ? 'text-accent' : 'text-gray-700 hover:text-accent'
                          }`
                        }
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile CTA */}
              <Link
                to="/contact"
                className="block bg-highlight text-white px-6 py-3 rounded-full text-center font-semibold hover:bg-yellow-600 transition-colors shadow-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;