import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaMicroscope, FaFlask, FaLeaf, FaIndustry, FaUniversity, FaUtensils } from 'react-icons/fa';
import PageBanner from '../components/PageBanner';

import applicationsData from '../data/applications.json';

const Applications = () => {
  // Icon mapping for each application
  const getIcon = (id) => {
    const icons = {
      'pharmaceutical': <FaFlask />,
      'food-beverage': <FaUtensils />,
      'environmental': <FaLeaf />,
      'chemical-petrochemical': <FaIndustry />,
      'research-academic': <FaUniversity />,
      'industrial-qc': <FaMicroscope />
    };
    return icons[id] || <FaMicroscope />;
  };

  return (
    <>
      <Helmet>
        <title>Applications - LabEquip</title>
        <meta name="description" content="Explore our laboratory equipment applications across pharmaceutical, food, environmental, and research industries." />
      </Helmet>

      {/* Page Banner with Local Image */}
      <PageBanner
        tagline="APPLICATIONS"
        title="Industry Solutions"
        subtitle="Discover how our laboratory equipment serves diverse industries and applications"
        breadcrumb={
          <>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Applications</span>
          </>
        }
        backgroundImage="/images/banners/banner-applications.png"
      />

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Solutions</span>
            <h2 className="text-3xl font-bold text-primary mt-2">Serving Diverse Industries</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Our comprehensive range of laboratory equipment serves various industries with precision and reliability.
            </p>
          </motion.div>

          {/* Applications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicationsData.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={app.image} 
                    alt={app.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <span className="text-accent text-xl">{getIcon(app.id)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    {app.description}
                  </p>
                  
                  {/* Related Brands */}
                  {app.relatedBrands && app.relatedBrands.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {app.relatedBrands.slice(0, 3).map((brandId) => {
                        // You can map brand IDs to names here
                        const brandNames = {
                          'rs-equipments': 'R.S Equipments',
                          'accumax': 'Accumax',
                          'neuation': 'Neuation',
                          'dlab': 'DLAB',
                          'sr-lab-instruments': 'SR LAB'
                        };
                        return (
                          <span key={brandId} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                            {brandNames[brandId] || brandId}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  <Link 
                    to={`/products?application=${app.id}`} 
                    className="inline-flex items-center space-x-2 text-accent font-medium mt-4 hover:text-accent/80 transition-colors group"
                  >
                    <span>View Products</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-primary rounded-2xl p-8 text-white"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-accent">6+</div>
                <div className="text-sm text-gray-300 mt-1">Industries Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">500+</div>
                <div className="text-sm text-gray-300 mt-1">Products Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">50+</div>
                <div className="text-sm text-gray-300 mt-1">Application Areas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">1000+</div>
                <div className="text-sm text-gray-300 mt-1">Happy Clients</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-500 mb-6 max-w-2xl mx-auto">
              Our team of experts can help you find the perfect equipment for your specific application requirements.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Contact Our Experts</span>
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Applications;