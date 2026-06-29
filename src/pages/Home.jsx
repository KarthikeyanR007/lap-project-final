import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FaMicroscope, 
  FaUserMd, 
  FaChartLine,
  FaShieldAlt,
  FaHeadset,
  FaBoxes,
  FaAward,
  FaArrowRight,
  FaQuoteLeft
} from 'react-icons/fa';

import productsData from '../data/products.json';
import testimonialsData from '../data/testimonials.json';
import applicationsData from '../data/applications.json';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Get featured products
    const featured = [];
    productsData.brands.forEach(brand => {
      brand.categories.forEach(category => {
        category.products.forEach(product => {
          if (product.featured) {
            featured.push({ ...product, brand: { id: brand.id, name: brand.name } });
          }
        });
      });
    });
    setFeaturedProducts(featured.slice(0, 8));

    // Stats
    let totalProducts = 0;
    productsData.brands.forEach(brand => {
      brand.categories.forEach(category => {
        totalProducts += category.products.length;
      });
    });

    setStats([
      { icon: <FaBoxes />, value: `${totalProducts}+`, label: 'Products' },
      { icon: <FaAward />, value: '20+', label: 'Years Experience' },
      { icon: <FaUserMd />, value: '1000+', label: 'Happy Clients' },
      { icon: <FaChartLine />, value: '50+', label: 'Categories' },
    ]);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>LabEquip - Precision Instruments for Scientific Excellence</title>
        <meta name="description" content="Leading provider of precision laboratory equipment, consumables, and environmental chambers for research, clinical, and industrial applications." />
      </Helmet>

      {/* Hero Section - ACCURACY AT MAXIMUM Style with Visible Background */}
      {/* Hero Section - Using local image */}
<section className="relative min-h-[600px] flex items-center overflow-hidden">
  {/* Background Image - Local */}
  <div 
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: 'url(/images/banners/banner-home.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  />
  
  {/* Lighter Overlay */}
  <div 
    className="absolute inset-0 z-1"
    style={{
      background: 'linear-gradient(135deg, rgba(10, 37, 64, 0.70) 0%, rgba(10, 37, 64, 0.55) 50%, rgba(10, 37, 64, 0.40) 100%)'
    }}
  />

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block bg-accent/30 backdrop-blur-sm text-accent font-bold text-sm uppercase tracking-wider px-5 py-2 rounded-full mb-4 border border-accent/40">
          ACCURACY AT MAXIMUM
        </span>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Precision Instruments for
          <span className="text-accent block mt-2">Scientific Excellence</span>
        </h1>
        
        <p className="text-gray-200 text-lg mt-6 max-w-lg">
          Empowering Research, Innovation & Quality Control with world-class laboratory equipment and consumables.
        </p>
        
        <div className="flex flex-wrap gap-4 mt-8">
          <Link
            to="/products"
            className="bg-accent text-white px-8 py-3.5 rounded-full font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
          >
            <span>Explore Products</span>
            <FaArrowRight />
          </Link>
          <Link
            to="/contact"
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/30 transition-all border border-white/30"
          >
            Contact Us
          </Link>
        </div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-1 bg-accent rounded-full mt-8"
        />
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="grid grid-cols-2 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white/15 backdrop-blur-sm rounded-xl p-6 text-center border border-white/15"
          >
            <div className="text-accent text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-gray-200 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
</section>

      {/* Stats Bar - Animated */}
      <section className="bg-primary/5 py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-accent text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h2 className="text-3xl font-bold text-primary mt-2">Your Trusted Partner in Laboratory Excellence</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                For over two decades, LabEquip has been at the forefront of providing cutting-edge laboratory 
                equipment and consumables to research institutions, pharmaceutical companies, and industrial 
                laboratories across India and beyond.
              </p>
              <p className="text-gray-600 mt-3 leading-relaxed">
                Our commitment to quality, precision, and customer satisfaction has made us the preferred choice 
                for scientists, researchers, and laboratory professionals who demand nothing but the best.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 mt-6 text-accent font-medium hover:text-accent/80 transition-colors"
              >
                <span>Know More</span>
                <FaArrowRight />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.unsplash.com/photo-1586017387104-a6b1da67e4be?w=400&h=300&fit=crop&random=80"
                alt="Laboratory"
                className="rounded-xl shadow-lg h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1586017387104-a6b1da67e4be?w=400&h=300&fit=crop&random=81"
                alt="Lab Equipment"
                className="rounded-xl shadow-lg h-64 object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* About Snippet Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h2 className="text-3xl font-bold text-primary mt-2">Your Trusted Partner in Laboratory Excellence</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                For over two decades, LabEquip has been at the forefront of providing cutting-edge laboratory 
                equipment and consumables to research institutions, pharmaceutical companies, and industrial 
                laboratories across India and beyond.
              </p>
              <p className="text-gray-600 mt-3 leading-relaxed">
                Our commitment to quality, precision, and customer satisfaction has made us the preferred choice 
                for scientists, researchers, and laboratory professionals who demand nothing but the best.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 mt-6 text-accent font-medium hover:text-accent/80 transition-colors"
              >
                <span>Know More</span>
                <FaArrowRight />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="/images/home/home-content-1.jpg"
                alt="Laboratory Equipment"
                className="rounded-xl shadow-lg h-64 object-cover"
              />
              <img
                src="/images/home/home-content-2.jpg"
                alt="Lab Instruments"
                className="rounded-xl shadow-lg h-64 object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Categories */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Brands</span>
            <h2 className="text-3xl font-bold text-primary mt-2">World-Class Laboratory Solutions</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Partnering with the industry's most trusted brands to deliver excellence in laboratory equipment and consumables.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {productsData.brands.map((brand) => {
              let productCount = 0;
              brand.categories.forEach(cat => productCount += cat.products.length);
              return (
                <motion.div
                  key={brand.id}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-center"
                >
                  <Link to={`/products?brand=${brand.id}`}>
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl text-accent font-bold">{brand.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-bold text-primary text-sm">{brand.name}</h3>
                    <p className="text-gray-400 text-xs mt-1">{productCount} Products</p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl font-bold text-primary mt-2">Setting the Standard in Laboratory Solutions</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaShieldAlt />, title: 'Precision Quality', desc: 'Rigorous quality control and ISO-certified manufacturing processes.' },
              { icon: <FaHeadset />, title: 'After-Sales Support', desc: 'Dedicated technical support and service team for peace of mind.' },
              { icon: <FaBoxes />, title: 'Wide Product Range', desc: 'Comprehensive portfolio covering all laboratory equipment needs.' },
              { icon: <FaAward />, title: 'Certified Products', desc: 'All products meet international quality and safety standards.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-background rounded-xl p-6 text-center hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent text-2xl">
                  {item.icon}
                </div>
                <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Snippet */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Applications</span>
            <h2 className="text-3xl font-bold text-white mt-2">Serving Diverse Industries</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {applicationsData.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all border border-white/10"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaMicroscope className="text-accent text-xl" />
                </div>
                <h4 className="text-sm font-medium">{app.name}</h4>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/applications"
              className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors"
            >
              <span>View All Applications</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Featured Products</span>
            <h2 className="text-3xl font-bold text-primary mt-2">Popular & Trusted Instruments</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} brand={product.brand} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
            >
              <span>View All Products</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl font-bold text-primary mt-2">What Our Clients Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <FaQuoteLeft className="text-accent text-2xl mb-4 opacity-30" />
                <p className="text-gray-600 text-sm leading-relaxed italic">"{testimonial.testimonial}"</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-gray-400 text-xs">{testimonial.designation}, {testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Looking for the Right Lab Instrument?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Our team of experts is ready to help you find the perfect solution for your laboratory needs.
            </p>
            <Link
              to="/contact"
              className="bg-highlight text-white px-10 py-4 rounded-full font-semibold hover:bg-yellow-600 transition-all shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
            >
              <span>Request a Quote</span>
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;