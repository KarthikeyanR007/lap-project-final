import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaCheckCircle, FaClock, FaShieldAlt, FaAward, FaHandshake, FaRocket } from 'react-icons/fa';
import PageBanner from '../components/PageBanner';

const About = () => {
  const milestones = [
    { year: '2005', desc: 'Company founded with a vision to provide quality lab equipment' },
    { year: '2008', desc: 'Expanded operations to 5 states across India' },
    { year: '2012', desc: 'Partnered with leading international brands' },
    { year: '2016', desc: 'Opened state-of-the-art demonstration facility' },
    { year: '2020', desc: 'Launched online product catalog and e-commerce' },
    { year: '2024', desc: 'Expanded product portfolio to 500+ products' },
  ];

  const whyChoose = [
    { icon: <FaShieldAlt />, title: 'Quality Assurance', desc: 'ISO-certified products with rigorous quality control' },
    { icon: <FaHandshake />, title: 'Expert Support', desc: 'Dedicated technical team for after-sales support' },
    { icon: <FaClock />, title: 'Timely Delivery', desc: 'Reliable supply chain for on-time delivery' },
    { icon: <FaAward />, title: 'Trusted Partner', desc: 'Preferred choice for leading research institutions' },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - LabEquip</title>
        <meta name="description" content="Learn about LabEquip - your trusted partner in laboratory equipment since 2005. Quality, innovation, and customer satisfaction." />
      </Helmet>

      {/* Page Banner with Local Image */}
      <PageBanner
        tagline="ABOUT US"
        title="Your Trusted Lab Partner"
        subtitle="Delivering excellence in laboratory solutions since 2005"
        breadcrumb={
          <>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </>
        }
        backgroundImage="/images/banners/banner-about.png"
      />

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Who We Are</span>
              <h2 className="text-3xl font-bold text-primary mt-2 mb-4">Your Trusted Partner in Laboratory Excellence</h2>
              <p className="text-gray-600 leading-relaxed">
                LabEquip is a premier provider of precision laboratory equipment and consumables, 
                serving research institutions, pharmaceutical companies, and industrial laboratories 
                across India since 2005.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                Our commitment to quality, innovation, and customer satisfaction has made us the 
                trusted partner for scientists and researchers who demand excellence in their work.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {whyChoose.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-accent text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-semibold text-sm text-primary">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1586017387104-a6b1da67e4be?w=600&h=400&fit=crop&random=82" 
                alt="About LabEquip" 
                className="rounded-xl shadow-lg w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <FaRocket className="text-accent text-xl" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Our Vision</h3>
              <p className="text-gray-600">To be the most trusted partner for laboratory solutions, empowering scientific discovery and innovation across India and beyond.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.1 }} 
              className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <FaCheckCircle className="text-accent text-xl" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Our Mission</h3>
              <p className="text-gray-600">To provide world-class laboratory equipment and consumables with exceptional service, enabling our customers to achieve scientific excellence.</p>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-primary text-center mb-8">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent/20"></div>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                        <span className="text-accent font-bold text-2xl">{milestone.year}</span>
                        <p className="text-gray-600 mt-2">{milestone.desc}</p>
                      </div>
                    </div>
                    <div className="w-2/12 relative flex items-center justify-center">
                      <div className="w-4 h-4 bg-accent rounded-full border-4 border-white shadow"></div>
                    </div>
                    <div className="w-5/12"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;