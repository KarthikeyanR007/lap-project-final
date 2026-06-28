import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa';

const ProductCard = ({ product, brand }) => {
  // Get category name safely
  const categoryName = product.category?.name || product.category || 'General';
  const brandName = brand?.name || product.brand?.name || 'Brand';
  const brandId = brand?.id || product.brand?.id || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1586017387104-a6b1da67e4be?w=400&h=300&fit=crop';
          }}
        />
        {product.featured && (
          <span className="absolute top-3 right-3 bg-highlight text-white text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
            {brandName}
          </span>
          <span className="text-xs text-gray-400">{categoryName}</span>
        </div>

        <h3 className="font-bold text-primary text-lg leading-tight line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm line-clamp-2">
          {product.shortDescription || product.fullDescription?.substring(0, 100) || ''}
        </p>

        <Link
          to={`/products/${brandId}/${product.id}`}
          className="inline-flex items-center space-x-2 text-accent font-medium text-sm hover:text-accent/80 transition-colors group"
        >
          <span>View Details</span>
          <FaEye className="text-sm group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;