import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaPaperPlane, 
  FaUsers,
  FaRocket,
  FaAward,
  FaCheckCircle,
  FaTimes,
  FaArrowRight
} from 'react-icons/fa';
import PageBanner from '../components/PageBanner';

import careersData from '../data/careers.json';

const Careers = () => {
  const [showApplication, setShowApplication] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplication(true);
    setFormSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data
    setFormSubmitted(true);
    setTimeout(() => {
      setShowApplication(false);
      setFormSubmitted(false);
    }, 3000);
  };

  const benefits = [
    { 
      icon: <FaRocket />, 
      title: 'Career Growth', 
      desc: 'Opportunities for professional development and advancement through training and mentorship programs.' 
    },
    { 
      icon: <FaCalendarAlt />, 
      title: 'Work-Life Balance', 
      desc: 'Flexible working hours, remote work options, and a supportive work environment.' 
    },
    { 
      icon: <FaUsers />, 
      title: 'Great Culture', 
      desc: 'Collaborative and inclusive workplace culture where every voice is valued and heard.' 
    },
    { 
      icon: <FaAward />, 
      title: 'Innovation & Excellence', 
      desc: 'Work with cutting-edge technology and innovative products that make a difference.' 
    },
  ];

  return (
    <>
      <Helmet>
        <title>Careers - LabEquip</title>
        <meta name="description" content="Join our team and build a career in the laboratory equipment industry. Explore our open positions and grow with us." />
      </Helmet>

      {/* Page Banner with Local Image */}
      <PageBanner
        tagline="CAREERS"
        title="Join Our Team"
        subtitle="Build a rewarding career with LabEquip and be part of our journey in laboratory excellence"
        breadcrumb={
          <>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Careers</span>
          </>
        }
        backgroundImage="/images/banners/banner-careers.png"
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
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Join Us</span>
            <h2 className="text-3xl font-bold text-primary mt-2">Why Work With Us</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              At LabEquip, we believe in nurturing talent and providing an environment where you can grow, innovate, and make a difference.
            </p>
          </motion.div>

          {/* Why Work With Us - Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <div className="text-accent text-3xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                </div>
                <h4 className="font-bold text-primary group-hover:text-accent transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Open Positions */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-8 bg-accent rounded-full"></div>
                <h2 className="text-2xl font-bold text-primary">Open Positions</h2>
                <span className="bg-accent/10 text-accent text-xs px-3 py-1 rounded-full font-semibold">
                  {careersData.length} Positions
                </span>
              </div>
              {careersData.length === 0 && (
                <span className="text-sm text-gray-400">Check back later</span>
              )}
            </div>

            {careersData.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {careersData.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-accent/20"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-primary hover:text-accent transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-accent text-sm font-medium flex items-center space-x-2">
                          <FaBriefcase className="text-xs" />
                          <span>{job.department}</span>
                        </p>
                      </div>
                      <span className="bg-accent/10 text-accent text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ml-4">
                        {job.experience}
                      </span>
                    </div>
                    <div className="mt-3 space-y-2 text-sm">
                      <p className="flex items-center space-x-2 text-gray-500">
                        <FaMapMarkerAlt className="text-accent flex-shrink-0" /> 
                        <span>{job.location}</span>
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center space-x-3">
                      <button
                        onClick={() => handleApply(job)}
                        className="bg-accent text-white px-6 py-2.5 rounded-full font-medium hover:bg-accent/90 transition-colors text-sm shadow-md hover:shadow-lg"
                      >
                        Apply Now
                      </button>
                      <span className="text-xs text-gray-400">Posted recently</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="text-6xl mb-4">💼</div>
                <h3 className="text-xl font-bold text-primary mb-2">No Open Positions</h3>
                <p className="text-gray-500">
                  We don't have any open positions right now, but we're always looking for talented people.
                  <br />
                  <span className="text-sm">Check back later or send us your resume.</span>
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 mt-4 text-accent font-medium hover:text-accent/80 transition-colors"
                >
                  <span>Contact Us</span>
                  <FaArrowRight />
                </Link>
              </div>
            )}
          </div>

          {/* Application Form Modal */}
          {showApplication && selectedJob && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowApplication(false)}
              />
              
              {/* Form Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  {/* Modal Header */}
                  <div className="bg-primary rounded-t-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">Apply for {selectedJob.title}</h3>
                        <p className="text-gray-300 text-sm mt-1">Fill in your details and we'll get back to you.</p>
                      </div>
                      <button
                        onClick={() => setShowApplication(false)}
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        <FaTimes className="text-2xl" />
                      </button>
                    </div>
                  </div>

                  {/* Form Body */}
                  <div className="p-6">
                    {formSubmitted ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FaCheckCircle className="text-green-500 text-3xl" />
                        </div>
                        <h4 className="text-xl font-bold text-primary mb-2">Application Submitted!</h4>
                        <p className="text-gray-500">Thank you for applying. We'll review your application and get back to you soon.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name *
                            </label>
                            <input 
                              type="text" 
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" 
                              placeholder="Your full name" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address *
                            </label>
                            <input 
                              type="email" 
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" 
                              placeholder="your@email.com" 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number *
                          </label>
                          <input 
                            type="tel" 
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" 
                            placeholder="+91 12345 67890" 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Position Applying For
                          </label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" 
                            value={selectedJob.title} 
                            disabled 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Resume *
                          </label>
                          <input 
                            type="file" 
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" 
                            accept=".pdf,.doc,.docx" 
                          />
                          <p className="text-xs text-gray-400 mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
                        </div>
                        
                        <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                          <button 
                            type="submit" 
                            className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors shadow-md hover:shadow-lg"
                          >
                            Submit Application
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setShowApplication(false)} 
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 text-center text-white"
          >
            <h3 className="text-2xl font-bold mb-3">Don't See the Right Role?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and we'll reach out when a suitable position opens up.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 bg-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
              >
                <span>Contact Us</span>
                <FaPaperPlane />
              </Link>
              <a
                href="mailto:careers@labequip.com"
                className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all border border-white/20"
              >
                <span>Email Us</span>
                <FaPaperPlane />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Careers;