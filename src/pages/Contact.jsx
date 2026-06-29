import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaYoutube,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import PageBanner from '../components/PageBanner';

import productsData from '../data/products.json';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  // Get all product names for dropdown
  const allProducts = [];
  productsData.brands.forEach(brand => {
    brand.categories.forEach(category => {
      category.products.forEach(product => {
        allProducts.push({
          id: product.id,
          name: product.name,
          brand: brand.name
        });
      });
    });
  });

  // Pre-fill product from URL
  useEffect(() => {
    const productParam = searchParams.get('product');
    if (productParam) {
      setValue('product', decodeURIComponent(productParam));
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // EMAILJS CONFIGURATION
      // Replace these with your actual EmailJS credentials
      const EMAILJS_SERVICE_ID = 'your_service_id';
      const EMAILJS_TEMPLATE_ID = 'your_template_id';
      const EMAILJS_PUBLIC_KEY = 'your_public_key';

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        company: data.company || 'N/A',
        product: data.product || 'N/A',
        message: data.message,
        city: data.city || 'N/A'
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitError('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: <FaFacebook />, url: '#', label: 'Facebook' },
    { icon: <FaTwitter />, url: '#', label: 'Twitter' },
    { icon: <FaLinkedin />, url: '#', label: 'LinkedIn' },
    { icon: <FaYoutube />, url: '#', label: 'YouTube' },
  ];

  const contactInfo = [
    { 
      icon: <FaMapMarkerAlt />, 
      title: 'Address', 
      details: ['123, Lab Equipment City,', 'Chennai - 600001, India'] 
    },
    { 
      icon: <FaPhone />, 
      title: 'Phone', 
      details: ['+91 12345 67890', '+91 98765 43210'] 
    },
    { 
      icon: <FaEnvelope />, 
      title: 'Email', 
      details: ['info@labequip.com', 'sales@labequip.com'] 
    },
    { 
      icon: <FaClock />, 
      title: 'Working Hours', 
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 9:00 AM - 2:00 PM', 'Sun: Closed'] 
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - LabEquip</title>
        <meta name="description" content="Get in touch with our team for inquiries, quotes, or support. We're here to help with all your laboratory equipment needs." />
      </Helmet>

      {/* Page Banner with Local Image */}
      <PageBanner
        tagline="INQUIRY"
        title="Get in Touch"
        subtitle="Have questions about our products or need assistance? Our team is here to help"
        breadcrumb={
          <>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </>
        }
        backgroundImage="/images/banners/banner-contact.jpg"
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
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Contact Us</span>
            <h2 className="text-3xl font-bold text-primary mt-2">We'd Love to Hear From You</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Whether you have a question about our products, need technical support, or want to request a quote, our team is ready to assist you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Form - 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 bg-white rounded-xl shadow-md p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1 h-8 bg-accent rounded-full"></div>
                <h2 className="text-2xl font-bold text-primary">Send Us a Message</h2>
              </div>

              {submitSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start space-x-3"
                >
                  <FaCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-700 font-medium">Thank you for your message!</p>
                    <p className="text-green-600 text-sm">We'll get back to you shortly.</p>
                  </div>
                </motion.div>
              )}

              {submitError && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
                >
                  <p className="text-red-700 text-sm">{submitError}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9+\-\s]{10,15}$/,
                        message: 'Invalid phone number'
                      }
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+91 12345 67890"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      {...register('company')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City / State
                    </label>
                    <input
                      {...register('city')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      placeholder="Your location"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product of Interest
                  </label>
                  <select
                    {...register('product')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  >
                    <option value="">Select a product (optional)</option>
                    {allProducts.map((product) => (
                      <option key={product.id} value={product.name}>
                        {product.name} - {product.brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message / Query *
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows="5"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell us about your requirements..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-white py-3.5 rounded-lg font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FaArrowRight />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Details - 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Info Cards */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center space-x-2">
                  <span className="w-1 h-6 bg-accent rounded-full"></span>
                  <span>Contact Information</span>
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/5 transition-colors">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent text-xl flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium text-primary text-sm">{item.title}</p>
                        {item.details.map((detail, i) => (
                          <p key={i} className="text-gray-500 text-sm">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center space-x-2">
                  <span className="w-1 h-6 bg-accent rounded-full"></span>
                  <span>Connect With Us</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="w-12 h-12 bg-background rounded-full flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-primary">Find Us</h3>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31104.779820726807!2d80.210077!3d13.08269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265f9f4e5d5a5%3A0x5c8b5c8b5c8b5c8b!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;