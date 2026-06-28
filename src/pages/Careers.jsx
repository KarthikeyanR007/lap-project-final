import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaPaperPlane  } from 'react-icons/fa';

import careersData from '../data/careers.json';

const Careers = () => {
  const [showApplication, setShowApplication] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplication(true);
  };

  return (
    <>
      <Helmet>
        <title>Careers - LabEquip</title>
        <meta name="description" content="Join our team and build a career in the laboratory equipment industry. Explore our open positions and grow with us." />
      </Helmet>

      <section className="bg-gradient-to-r from-primary to-primary/90 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            <p className="text-sm text-accent font-semibold uppercase tracking-wider">Careers</p>
            <h1 className="text-3xl font-bold mt-2">Join Our Team</h1>
            <p className="text-gray-300 mt-2 max-w-2xl">Build a rewarding career with LabEquip and be part of our journey in laboratory excellence.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Why Work With Us */}
          <h2 className="text-2xl font-bold text-primary mb-6">Why Work With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: <FaBriefcase />, title: 'Career Growth', desc: 'Opportunities for professional development and advancement.' },
              { icon: <FaCalendarAlt />, title: 'Work-Life Balance', desc: 'Flexible working hours and a supportive work environment.' },
              { icon: <FaMapMarkerAlt />, title: 'Great Culture', desc: 'Collaborative and inclusive workplace culture.' },
              { icon: <FaPaperPlane  />, title: 'Innovation', desc: 'Work with cutting-edge technology and innovative products.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md p-6 text-center"
              >
                <div className="text-accent text-3xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-primary">{item.title}</h4>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Open Positions */}
          <h2 className="text-2xl font-bold text-primary mb-6">Open Positions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {careersData.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-primary">{job.title}</h3>
                    <p className="text-accent text-sm font-medium">{job.department}</p>
                  </div>
                  <span className="bg-accent/10 text-accent text-xs px-3 py-1 rounded-full">{job.experience}</span>
                </div>
                <div className="mt-3 space-y-2 text-sm text-gray-500">
                  <p className="flex items-center space-x-2"><FaMapMarkerAlt className="text-accent" /> <span>{job.location}</span></p>
                  <p className="text-gray-600">{job.description}</p>
                </div>
                <button
                  onClick={() => handleApply(job)}
                  className="mt-4 bg-accent text-white px-6 py-2.5 rounded-full font-medium hover:bg-accent/90 transition-colors text-sm"
                >
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>

          {/* Application Form */}
          {showApplication && selectedJob && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-8 mt-8"
            >
              <h3 className="text-2xl font-bold text-primary mb-2">Apply for {selectedJob.title}</h3>
              <p className="text-gray-500 text-sm mb-6">Fill in your details and we'll get back to you.</p>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent transition-colors" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent transition-colors" placeholder="+91 12345 67890" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position Applying For</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent transition-colors" value={selectedJob.title} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume</label>
                  <input type="file" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent transition-colors" accept=".pdf,.doc,.docx" />
                  <p className="text-xs text-gray-400 mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
                </div>
                <button type="submit" className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
                  Submit Application
                </button>
                <button type="button" onClick={() => setShowApplication(false)} className="ml-4 text-gray-500 hover:text-gray-700 transition-colors">
                  Cancel
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Careers;