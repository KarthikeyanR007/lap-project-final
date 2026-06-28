import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FaArrowLeft, 
  FaDownload, 
  FaFilePdf,
  FaBoxes,
  FaRuler,
  FaWeight,
  FaBolt,
  FaThermometerHalf,
  FaFlask,
  FaCheckCircle
} from 'react-icons/fa';
import { HiOutlineArrowRight } from 'react-icons/hi';

import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import VoucherDownload from '../components/VoucherDownload';

const ProductDetail = () => {
  const { brand: brandId, productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    // Find the product
    let foundProduct = null;
    let foundBrand = null;

    for (const b of productsData.brands) {
      if (b.id === brandId) {
        foundBrand = b;
        for (const category of b.categories) {
          for (const p of category.products) {
            if (p.id === productId) {
              foundProduct = { ...p, category: { id: category.id, name: category.name } };
              break;
            }
          }
          if (foundProduct) break;
        }
        break;
      }
    }

    if (foundProduct && foundBrand) {
      setProduct(foundProduct);
      setBrand(foundBrand);

      // Get related products (same category)
      const related = [];
      for (const category of foundBrand.categories) {
        if (category.id === foundProduct.category.id) {
          for (const p of category.products) {
            if (p.id !== foundProduct.id) {
              related.push({ ...p, brand: { id: foundBrand.id, name: foundBrand.name } });
            }
          }
          break;
        }
      }
      setRelatedProducts(related.slice(0, 4));
    } else {
      navigate('/products');
    }
  }, [brandId, productId, navigate]);

  if (!product || !brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  const getSpecIcon = (key) => {
    const icons = {
      'Temperature Range': <FaThermometerHalf />,
      'Capacity': <FaBoxes />,
      'Power Supply': <FaBolt />,
      'Material': <FaFlask />,
      'Weight': <FaWeight />,
      'Dimensions': <FaRuler />,
    };
    return icons[key] || <FaCheckCircle />;
  };

  const handleQuoteClick = () => {
    navigate(`/contact?product=${encodeURIComponent(product.name)}`);
  };

  return (
    <>
      <Helmet>
        <title>{product.name} - {brand.name} | LabEquip</title>
        <meta name="description" content={product.shortDescription} />
      </Helmet>

      {/* Breadcrumb */}
      <section className="bg-background pt-32 pb-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-accent transition-colors">Products</Link>
            <span>/</span>
            <Link to={`/products?brand=${brand.id}`} className="hover:text-accent transition-colors">{brand.name}</Link>
            <span>/</span>
            <span className="text-accent font-medium">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
              {product.featured && (
                <div className="p-4 bg-highlight/10 border-t border-highlight/20">
                  <span className="text-highlight font-semibold text-sm flex items-center space-x-2">
                    <FaCheckCircle />
                    <span>Featured Product</span>
                  </span>
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {brand.name}
                  </span>
                  <span className="text-xs text-gray-400">{product.category.name}</span>
                </div>
                <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
                <p className="text-gray-500 mt-2">{product.shortDescription}</p>
              </div>

              <div className="bg-background rounded-xl p-4">
                <p className="text-gray-700 leading-relaxed">{product.fullDescription}</p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleQuoteClick}
                  className="bg-highlight text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-600 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <span>Request a Quote</span>
                  <HiOutlineArrowRight />
                </button>
                <Link
                  to="/products"
                  className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-md flex items-center space-x-2 border border-gray-200"
                >
                  <FaArrowLeft />
                  <span>Back to Products</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Specifications & Voucher Tabs */}
          <div className="mt-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex space-x-4 px-6">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'description'
                        ? 'border-accent text-accent'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('specifications')}
                    className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'specifications'
                        ? 'border-accent text-accent'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('voucher')}
                    className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'voucher'
                        ? 'border-accent text-accent'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Voucher
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'description' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="prose max-w-none"
                  >
                    <h3 className="text-lg font-semibold text-primary mb-3">Product Overview</h3>
                    <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>
                  </motion.div>
                )}

                {activeTab === 'specifications' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h3 className="text-lg font-semibold text-primary mb-4">Technical Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div
                          key={key}
                          className="bg-background rounded-lg p-4 flex items-start space-x-3"
                        >
                          <div className="text-accent text-lg mt-0.5">
                            {getSpecIcon(key)}
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{key}</p>
                            <p className="text-sm font-medium text-primary mt-1">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'voucher' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <VoucherDownload
                      productName={product.name}
                      voucherUrl={product.voucher}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-primary mb-6">Related Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} brand={brand} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetail;