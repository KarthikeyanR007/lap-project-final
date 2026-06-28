import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    // Filter products based on selections
    let products = [];
    
    productsData.brands.forEach(brand => {
      // Check if brand matches filter
      if (selectedBrand && brand.id !== selectedBrand) return;
      
      brand.categories.forEach(category => {
        // Check if category matches filter
        if (selectedCategory && category.id !== selectedCategory) return;
        
        category.products.forEach(product => {
          products.push({
            ...product,
            brand: { id: brand.id, name: brand.name },
            category: { id: category.id, name: category.name }
          });
        });
      });
    });

    // Apply search filter
    if (searchQuery.trim()) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.shortDescription && product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProducts(products);
  }, [selectedBrand, selectedCategory, searchQuery]);

  const handleBrandSelect = (brandId) => {
    setSelectedBrand(brandId);
    setSelectedCategory('');
    if (brandId) {
      setSearchParams({ brand: brandId });
    } else {
      setSearchParams({});
    }
    setIsMobileFilterOpen(false);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsMobileFilterOpen(false);
  };

  const clearFilters = () => {
    setSelectedBrand('');
    setSelectedCategory('');
    setSearchQuery('');
    setSearchParams({});
  };

  const getBrandCategories = () => {
    const brand = productsData.brands.find(b => b.id === selectedBrand);
    return brand ? brand.categories : [];
  };

  const getProductCount = (brandId) => {
    const brand = productsData.brands.find(b => b.id === brandId);
    if (!brand) return 0;
    let count = 0;
    brand.categories.forEach(cat => count += cat.products.length);
    return count;
  };

  // Get all brand names for display
  const getBrandName = (brandId) => {
    const brand = productsData.brands.find(b => b.id === brandId);
    return brand ? brand.name : '';
  };

  return (
    <>
      <Helmet>
        <title>Products - LabEquip</title>
        <meta name="description" content="Browse our comprehensive range of laboratory equipment, consumables, and environmental chambers from leading brands." />
      </Helmet>

      {/* Page Hero */}
      <section className="bg-gradient-to-r from-primary to-primary/90 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            <p className="text-sm text-accent font-semibold uppercase tracking-wider">Products</p>
            <h1 className="text-3xl font-bold mt-2">Our Product Portfolio</h1>
            <p className="text-gray-300 mt-2 max-w-2xl">
              Explore our comprehensive range of laboratory equipment and consumables from world-class brands.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-28">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-primary">Filters</h3>
                  {(selectedBrand || selectedCategory || searchQuery) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-accent hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Brands</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => handleBrandSelect('')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        !selectedBrand ? 'bg-accent/10 text-accent font-medium' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      All Brands
                    </button>
                    {productsData.brands.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => handleBrandSelect(brand.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                          selectedBrand === brand.id ? 'bg-accent/10 text-accent font-medium' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>{brand.name}</span>
                        <span className="text-xs text-gray-400">({getProductCount(brand.id)})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories - Dynamic */}
                {selectedBrand && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Categories</h4>
                    <div className="space-y-1">
                      <button
                        onClick={() => handleCategorySelect('')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          !selectedCategory ? 'bg-accent/10 text-accent font-medium' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        All Categories
                      </button>
                      {getBrandCategories().map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                            selectedCategory === category.id ? 'bg-accent/10 text-accent font-medium' : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className="text-xs text-gray-400">({category.products.length})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="w-full bg-white rounded-xl shadow-md p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <FaFilter className="text-accent" />
                  <span className="font-medium">Filters</span>
                  {(selectedBrand || selectedCategory) && (
                    <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-400">
                  {filteredProducts.length} products
                </span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-primary">{filteredProducts.length}</span> products
                </p>
                {selectedBrand && (
                  <p className="text-sm text-accent">
                    {getBrandName(selectedBrand)}
                  </p>
                )}
              </div>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredProducts.map((product) => (
                      <ProductCard key={`${product.brand.id}-${product.id}`} product={product} brand={product.brand} />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <div className="text-6xl mb-4">🔬</div>
                  <h3 className="text-xl font-bold text-primary mb-2">No products found</h3>
                  <p className="text-gray-500">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-accent hover:underline font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-primary">Filters</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Brands</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => handleBrandSelect('')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        !selectedBrand ? 'bg-accent/10 text-accent font-medium' : 'text-gray-600'
                      }`}
                    >
                      All Brands
                    </button>
                    {productsData.brands.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => handleBrandSelect(brand.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                          selectedBrand === brand.id ? 'bg-accent/10 text-accent font-medium' : 'text-gray-600'
                        }`}
                      >
                        <span>{brand.name}</span>
                        <span className="text-xs text-gray-400">({getProductCount(brand.id)})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                {selectedBrand && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Categories</h4>
                    <div className="space-y-1">
                      <button
                        onClick={() => handleCategorySelect('')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          !selectedCategory ? 'bg-accent/10 text-accent font-medium' : 'text-gray-600'
                        }`}
                      >
                        All Categories
                      </button>
                      {getBrandCategories().map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                            selectedCategory === category.id ? 'bg-accent/10 text-accent font-medium' : 'text-gray-600'
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className="text-xs text-gray-400">({category.products.length})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      clearFilters();
                      setIsMobileFilterOpen(false);
                    }}
                    className="w-full bg-gray-100 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Products;