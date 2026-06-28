import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/products', label: 'Products' },
    { path: '/applications', label: 'Applications' },
    { path: '/events', label: 'Events' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: '#', label: 'Facebook' },
    { icon: <FaTwitter />, url: '#', label: 'Twitter' },
    { icon: <FaLinkedin />, url: '#', label: 'LinkedIn' },
    { icon: <FaYoutube />, url: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">L</span>
              </div>
              <div>
                <span className="text-xl font-bold">LabEquip</span>
                <span className="text-xs text-accent block -mt-1">Precision Instruments</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Leading provider of precision laboratory equipment and consumables for research, 
              clinical, and industrial applications since 2005.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Brands</h3>
            <ul className="space-y-2">
              <li><Link to="/products?brand=rs-equipments" className="text-gray-300 hover:text-accent transition-colors text-sm">R.S Equipments</Link></li>
              <li><Link to="/products?brand=accumax" className="text-gray-300 hover:text-accent transition-colors text-sm">Accumax</Link></li>
              <li><Link to="/products?brand=neuation" className="text-gray-300 hover:text-accent transition-colors text-sm">Neuation</Link></li>
              <li><Link to="/products?brand=dlab" className="text-gray-300 hover:text-accent transition-colors text-sm">DLAB</Link></li>
              <li><Link to="/products?brand=sr-lab-instruments" className="text-gray-300 hover:text-accent transition-colors text-sm">SR LAB Instruments</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-accent text-lg mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123, Lab Equipment City,<br />
                  Chennai - 600001, India
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-accent text-lg flex-shrink-0" />
                <span className="text-gray-300 text-sm">+91 12345 67890</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-accent text-lg flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@labequip.com</span>
              </div>
              <div className="text-gray-300 text-sm">
                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p>Sat: 9:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} LabEquip. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-gray-400">
            <Link to="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-accent transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;