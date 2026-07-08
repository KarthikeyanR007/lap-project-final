import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaSearch, FaFilter, FaTimes, FaChevronRight, FaChevronDown } from 'react-icons/fa';

import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [expandedBrand, setExpandedBrand] = useState(searchParams.get('brand') || null);

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
    setSelectedCategory(''); // Clear category when brand changes
    
    // Update URL params
    const params = {};
    if (brandId) params.brand = brandId;
    setSearchParams(params);
    
    // Auto-expand the selected brand
    setExpandedBrand(brandId);
    setIsMobileFilterOpen(false);
  };

  const handleCategorySelect = (brandId, categoryId) => {
    // Set both brand and category
    setSelectedBrand(brandId);
    setSelectedCategory(categoryId);
    
    // Update URL params
    const params = {};
    if (brandId) params.brand = brandId;
    if (categoryId) params.category = categoryId;
    setSearchParams(params);
    
    // Expand the brand
    setExpandedBrand(brandId);
    setIsMobileFilterOpen(false);
  };

  const clearFilters = () => {
    setSelectedBrand('');
    setSelectedCategory('');
    setSearchQuery('');
    setSearchParams({});
    setExpandedBrand(null);
  };

  const getBrandCategories = (brandId) => {
    const brand = productsData.brands.find(b => b.id === brandId);
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

  const toggleBrand = (brandId) => {
    if (expandedBrand === brandId) {
      setExpandedBrand(null);
    } else {
      setExpandedBrand(brandId);
    }
  };

  // Handle brand click separately from toggle
  const handleBrandClick = (brandId) => {
    handleBrandSelect(brandId);
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

                {/* Brand Tree */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Brands</h4>
                  <div className="space-y-1">
                    {/* All Brands option */}
                    <button
                      onClick={() => {
                        handleBrandSelect('');
                        setExpandedBrand(null);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        !selectedBrand ? 'bg-accent/10 text-accent font-medium' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      All Brands
                    </button>

                    {/* Brand items */}
                    {productsData.brands.map((brand) => {
                      const isExpanded = expandedBrand === brand.id;
                      const isActive = selectedBrand === brand.id;
                      const productCount = getProductCount(brand.id);
                      const categories = getBrandCategories(brand.id);

                      return (
                        <div key={brand.id} className="border-b border-gray-100 last:border-0">
                          {/* Brand header */}
                          <div className="flex items-center">
                            <button
                              onClick={() => toggleBrand(brand.id)}
                              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                              aria-label={isExpanded ? 'Collapse' : 'Expand'}
                            >
                              {isExpanded ? (
                                <FaChevronDown className="w-3 h-3 text-gray-400" />
                              ) : (
                                <FaChevronRight className="w-3 h-3 text-gray-400" />
                              )}
                            </button>
                            <button
                              onClick={() => handleBrandClick(brand.id)}
                              className={`flex-1 text-left px-2 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                                isActive ? 'bg-accent/10 text-accent font-medium' : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <span>{brand.name}</span>
                              <span className="text-xs text-gray-400">({productCount})</span>
                            </button>
                          </div>

                          {/* Categories sub-list */}
                          {isExpanded && categories.length > 0 && (
                            <div className="ml-8 border-l-2 border-gray-200 pl-2 space-y-1 mb-1">
                              {/* All Categories option for this brand */}
                              <button
                                onClick={() => {
                                  handleCategorySelect(brand.id, '');
                                }}
                                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                  !selectedCategory && isActive ? 'bg-accent/10 text-accent font-medium' : 'text-gray-500 hover:bg-gray-50'
                                }`}
                              >
                                All Categories
                              </button>

                              {categories.map((category) => (
                                <button
                                  key={category.id}
                                  onClick={() => handleCategorySelect(brand.id, category.id)}
                                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                                    selectedCategory === category.id && isActive ? 'bg-accent/10 text-accent font-medium' : 'text-gray-500 hover:bg-gray-50'
                                  }`}
                                >
                                  <span>{category.name}</span>
                                  <span className="text-xs text-gray-400">({category.products.length})</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Active filters summary */}
                {(selectedBrand || selectedCategory) && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {selectedBrand && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-accent/10 text-accent">
                          {getBrandName(selectedBrand)}
                          {selectedCategory && ` › ${getBrandCategories(selectedBrand).find(c => c.id === selectedCategory)?.name}`}
                        </span>
                      )}
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
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-primary">{filteredProducts.length}</span> products
                </p>
                {selectedBrand && (
                  <p className="text-sm text-accent">
                    {getBrandName(selectedBrand)}
                    {selectedCategory && ` - ${getBrandCategories(selectedBrand).find(c => c.id === selectedCategory)?.name}`}
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

                {/* Mobile - Brands Tree */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Brands</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        handleBrandSelect('');
                        setExpandedBrand(null);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        !selectedBrand ? 'bg-accent/10 text-accent font-medium' : 'text-gray-600'
                      }`}
                    >
                      All Brands
                    </button>

                    {productsData.brands.map((brand) => {
                      const isExpanded = expandedBrand === brand.id;
                      const isActive = selectedBrand === brand.id;
                      const productCount = getProductCount(brand.id);
                      const categories = getBrandCategories(brand.id);

                      return (
                        <div key={brand.id} className="border-b border-gray-100 last:border-0">
                          <div className="flex items-center">
                            <button
                              onClick={() => {
                                if (expandedBrand === brand.id) {
                                  setExpandedBrand(null);
                                } else {
                                  setExpandedBrand(brand.id);
                                }
                              }}
                              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              {isExpanded ? (
                                <FaChevronDown className="w-3 h-3 text-gray-400" />
                              ) : (
                                <FaChevronRight className="w-3 h-3 text-gray-400" />
                              )}
                            </button>
                            <button
                              onClick={() => {
                                handleBrandSelect(brand.id);
                                setIsMobileFilterOpen(false);
                              }}
                              className={`flex-1 text-left px-2 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                                isActive ? 'bg-accent/10 text-accent font-medium' : 'text-gray-600'
                              }`}
                            >
                              <span>{brand.name}</span>
                              <span className="text-xs text-gray-400">({productCount})</span>
                            </button>
                          </div>

                          {isExpanded && categories.length > 0 && (
                            <div className="ml-8 border-l-2 border-gray-200 pl-2 space-y-1 mb-1">
                              <button
                                onClick={() => {
                                  handleCategorySelect(brand.id, '');
                                  setIsMobileFilterOpen(false);
                                }}
                                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                  !selectedCategory && isActive ? 'bg-accent/10 text-accent font-medium' : 'text-gray-500'
                                }`}
                              >
                                All Categories
                              </button>

                              {categories.map((category) => (
                                <button
                                  key={category.id}
                                  onClick={() => {
                                    handleCategorySelect(brand.id, category.id);
                                    setIsMobileFilterOpen(false);
                                  }}
                                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                                    selectedCategory === category.id && isActive ? 'bg-accent/10 text-accent font-medium' : 'text-gray-500'
                                  }`}
                                >
                                  <span>{category.name}</span>
                                  <span className="text-xs text-gray-400">({category.products.length})</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

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