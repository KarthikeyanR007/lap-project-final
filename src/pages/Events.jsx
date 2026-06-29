import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaTag, FaLink, FaCalendarCheck, FaClock } from 'react-icons/fa';
import PageBanner from '../components/PageBanner';

import eventsData from '../data/events.json';

const Events = () => {
  const upcomingEvents = eventsData.filter(e => e.status === 'upcoming');
  const pastEvents = eventsData.filter(e => e.status === 'past');

  return (
    <>
      <Helmet>
        <title>Events - LabEquip</title>
        <meta name="description" content="Stay updated with our upcoming events, exhibitions, workshops, and conferences in the laboratory industry." />
      </Helmet>

      {/* Page Banner with Local Image */}
      <PageBanner
        tagline="EVENTS"
        title="Upcoming & Past Events"
        subtitle="Join us at industry events and stay connected with the latest innovations"
        breadcrumb={
          <>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Events</span>
          </>
        }
        backgroundImage="/images/banners/banner-events.jpg"
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
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Stay Connected</span>
            <h2 className="text-3xl font-bold text-primary mt-2">Join Us at Our Events</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              From exhibitions and workshops to conferences, we're always excited to meet you at industry events.
            </p>
          </motion.div>

          {/* Upcoming Events */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-1 h-8 bg-green-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-primary flex items-center space-x-2">
                <FaCalendarCheck className="text-green-500" />
                <span>Upcoming Events</span>
              </h2>
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                {upcomingEvents.length} Events
              </span>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      {/* Date Badge */}
                      <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white rounded-lg p-3 text-center min-w-[60px]">
                        <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                        <div className="text-xs uppercase">{new Date(event.date).toLocaleString('en', { month: 'short' })}</div>
                      </div>
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider shadow-lg">
                          {event.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 text-xs mb-2">
                        <span className="bg-accent/10 text-accent px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                          <FaTag className="inline mr-1" />
                          {event.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                        {event.title}
                      </h3>
                      <div className="space-y-2 mt-3 text-sm text-gray-500">
                        <p className="flex items-center space-x-2">
                          <FaCalendarAlt className="text-accent flex-shrink-0" /> 
                          <span>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-accent flex-shrink-0" /> 
                          <span>{event.location}</span>
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                        {event.description}
                      </p>
                      <a 
                        href={event.registrationLink} 
                        className="inline-flex items-center space-x-2 mt-4 bg-accent text-white px-6 py-2.5 rounded-full font-medium hover:bg-accent/90 transition-colors shadow-md hover:shadow-lg"
                      >
                        <span>Register / Know More</span>
                        <FaLink />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-bold text-primary mb-2">No Upcoming Events</h3>
                <p className="text-gray-500">Check back later for our upcoming events and exhibitions.</p>
              </div>
            )}
          </div>

          {/* Past Events */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-1 h-8 bg-gray-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-primary flex items-center space-x-2">
                <FaClock className="text-gray-400" />
                <span>Past Events</span>
              </h2>
              <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-semibold">
                {pastEvents.length} Events
              </span>
            </div>

            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-100 rounded-xl shadow-md overflow-hidden opacity-75 hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover grayscale" 
                      />
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider shadow-lg">
                          {event.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 text-xs mb-2">
                        <span className="bg-gray-300 text-gray-600 px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                          <FaTag className="inline mr-1" />
                          {event.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-primary">{event.title}</h3>
                      <div className="space-y-2 mt-3 text-sm text-gray-500">
                        <p className="flex items-center space-x-2">
                          <FaCalendarAlt className="text-gray-400 flex-shrink-0" /> 
                          <span>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" /> 
                          <span>{event.location}</span>
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                        {event.description}
                      </p>
                      <div className="mt-4">
                        <span className="text-xs text-gray-400 bg-gray-200 px-3 py-1 rounded-full">
                          Event Completed
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-primary mb-2">No Past Events</h3>
                <p className="text-gray-500">Stay tuned for our upcoming events!</p>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 text-center text-white"
          >
            <h3 className="text-2xl font-bold mb-3">Want to Partner With Us?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Interested in collaborating or hosting an event with us? Get in touch with our team.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Contact Us</span>
              <FaLink />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Events;