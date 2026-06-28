import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

import applicationsData from '../data/applications.json';

const Applications = () => {
  return (
    <>
      <Helmet>
        <title>Applications - LabEquip</title>
        <meta name="description" content="Explore our laboratory equipment applications across pharmaceutical, food, environmental, and research industries." />
      </Helmet>

      <section className="bg-gradient-to-r from-primary to-primary/90 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            <p className="text-sm text-accent font-semibold uppercase tracking-wider">Applications</p>
            <h1 className="text-3xl font-bold mt-2">Industry Solutions</h1>
            <p className="text-gray-300 mt-2 max-w-2xl">Discover how our laboratory equipment serves diverse industries and applications.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicationsData.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-md overflow-hidden group"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={app.image} 
                    alt={app.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary">{app.name}</h3>
                  <p className="text-gray-500 text-sm mt-2">{app.description}</p>
                  <Link 
                    to={`/products?application=${app.id}`} 
                    className="inline-flex items-center space-x-2 text-accent font-medium mt-4 hover:text-accent/80 transition-colors"
                  >
                    <span>View Products</span>
                    <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Applications;