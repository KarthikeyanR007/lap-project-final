import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | LabEquip</title>
      </Helmet>
      <section className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-8xl font-bold text-accent mb-4">404</div>
            <h1 className="text-3xl font-bold text-primary mb-2">Page Not Found</h1>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-accent text-white px-8 py-3.5 rounded-full font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
            >
              <FaHome />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NotFound;