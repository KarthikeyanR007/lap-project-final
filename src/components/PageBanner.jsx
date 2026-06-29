import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PageBanner = ({ 
  title, 
  subtitle, 
  breadcrumb, 
  tagline,
  backgroundImage = '/images/banners/banner-default.jpg'
}) => {
  return (
    <section className="relative min-h-[400px] flex items-center overflow-hidden">
      {/* Background Image - Using local image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Lighter Overlay - Image clearly visible */}
      <div 
        className="absolute inset-0 z-1"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 37, 64, 0.60) 0%, rgba(10, 37, 64, 0.50) 50%, rgba(10, 37, 64, 0.40) 100%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="max-w-3xl">
          {/* Tagline */}
          {tagline && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-accent/30 backdrop-blur-sm text-accent font-bold text-sm uppercase tracking-wider px-5 py-2 rounded-full mb-4 border border-accent/40">
                {tagline}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-200 mt-4 max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Breadcrumb */}
          {breadcrumb && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center space-x-2 text-sm text-gray-300 mt-6"
            >
              {breadcrumb}
            </motion.div>
          )}

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-accent rounded-full mt-6"
          />
        </div>
      </div>
    </section>
  );
};

export default PageBanner;