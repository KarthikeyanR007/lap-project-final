import React from 'react';
import { motion } from 'framer-motion';

const PageBanner = ({ 
  title, 
  subtitle, 
  breadcrumb, 
  tagline,
  backgroundImage,
  showDNA = true 
}) => {
  return (
    <section className="relative min-h-[400px] flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dnaPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 0 L50 100 M0 50 L100 50" stroke="white" strokeWidth="0.5" opacity="0.3" />
              <circle cx="50" cy="20" r="3" fill="white" opacity="0.2" />
              <circle cx="50" cy="80" r="3" fill="white" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dnaPattern)" />
        </svg>
      </div>

      {/* Decorative Elements - DNA Helix */}
      {showDNA && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
          <svg width="300" height="500" viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* DNA Double Helix */}
            <path d="M50 20 C50 60 150 80 150 120 C150 160 50 180 50 220 C50 260 150 280 150 320 C150 360 50 380 50 420 C50 460 150 480 150 500" 
                  stroke="white" strokeWidth="3" opacity="0.4" fill="none"/>
            <path d="M250 20 C250 60 150 80 150 120 C150 160 250 180 250 220 C250 260 150 280 150 320 C150 360 250 380 250 420 C250 460 150 480 150 500" 
                  stroke="white" strokeWidth="3" opacity="0.4" fill="none"/>
            {/* Cross connections */}
            {[80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480].map((y, i) => (
              <line key={i} x1="50" y1={y} x2="250" y2={y} stroke="white" strokeWidth="1" opacity="0.2" />
            ))}
            {/* Helix nodes */}
            {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480].map((y, i) => (
              <circle key={`left-${i}`} cx="50" cy={y} r="4" fill="white" opacity="0.3" />
            ))}
            {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480].map((y, i) => (
              <circle key={`right-${i}`} cx="250" cy={y} r="4" fill="white" opacity="0.3" />
            ))}
          </svg>
        </div>
      )}

      {/* Floating Lab Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 opacity-10 text-white text-4xl animate-float">🧬</div>
        <div className="absolute bottom-20 right-20 opacity-10 text-white text-4xl animate-float-delay">🔬</div>
        <div className="absolute top-1/2 left-1/4 opacity-10 text-white text-3xl animate-float">🧪</div>
        <div className="absolute bottom-1/3 right-1/4 opacity-10 text-white text-3xl animate-float-delay">⚗️</div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Tagline */}
          {tagline && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-accent/20 backdrop-blur-sm text-accent font-semibold text-sm uppercase tracking-wider px-4 py-1.5 rounded-full mb-4 border border-accent/30">
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
              className="text-lg sm:text-xl text-gray-300 mt-4 max-w-2xl"
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
              className="flex items-center space-x-2 text-sm text-gray-400 mt-6"
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

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/20 to-transparent" />
    </section>
  );
};

export default PageBanner;