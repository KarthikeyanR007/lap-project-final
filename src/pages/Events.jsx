import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaCalendarAlt, FaMapMarkerAlt, FaTag, FaLink } from 'react-icons/fa';

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

      <section className="bg-gradient-to-r from-primary to-primary/90 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            <p className="text-sm text-accent font-semibold uppercase tracking-wider">Events</p>
            <h1 className="text-3xl font-bold mt-2">Upcoming & Past Events</h1>
            <p className="text-gray-300 mt-2 max-w-2xl">Join us at industry events and stay connected with the latest innovations.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upcoming Events */}
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
            <span>Upcoming Events</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="h-56 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold uppercase tracking-wider">{event.type}</span>
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full font-semibold uppercase tracking-wider">{event.status}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mt-3">{event.title}</h3>
                  <div className="space-y-2 mt-3 text-sm text-gray-500">
                    <p className="flex items-center space-x-2"><FaCalendarAlt className="text-accent" /> <span>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                    <p className="flex items-center space-x-2"><FaMapMarkerAlt className="text-accent" /> <span>{event.location}</span></p>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">{event.description}</p>
                  <a href={event.registrationLink} className="inline-flex items-center space-x-2 mt-4 bg-accent text-white px-6 py-2.5 rounded-full font-medium hover:bg-accent/90 transition-colors">
                    <span>Register / Know More</span>
                    <FaLink />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Past Events */}
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center space-x-2">
            <span className="w-3 h-3 bg-gray-400 rounded-full inline-block"></span>
            <span>Past Events</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-100 rounded-xl shadow-md overflow-hidden opacity-70"
              >
                <div className="h-48 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover grayscale" />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="bg-gray-300 text-gray-600 px-3 py-1 rounded-full font-semibold uppercase tracking-wider">{event.type}</span>
                    <span className="bg-gray-300 text-gray-600 px-3 py-1 rounded-full font-semibold uppercase tracking-wider">{event.status}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mt-3">{event.title}</h3>
                  <div className="space-y-2 mt-3 text-sm text-gray-500">
                    <p className="flex items-center space-x-2"><FaCalendarAlt className="text-gray-400" /> <span>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                    <p className="flex items-center space-x-2"><FaMapMarkerAlt className="text-gray-400" /> <span>{event.location}</span></p>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;