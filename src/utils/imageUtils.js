// src/utils/imageUtils.js

/**
 * Get the correct image path for a product
 * @param {string} imagePath - The image path from the product data
 * @param {string} brandId - The brand ID (optional)
 * @param {string} productId - The product ID (optional)
 * @returns {string} - The correct image URL
 */
export const getProductImage = (imagePath, brandId = '', productId = '') => {
  // If no image path is provided, return a default image
  if (!imagePath) {
    return '/images/products/default-product.jpg';
  }

  // If it's already a full URL (starts with http or https), use it as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it's a local path that starts with '/', use it directly
  if (imagePath.startsWith('/')) {
    return imagePath;
  }

  // Check if the path already includes the brand folder
  // Your image paths look like: "dlab/HiPette Fully Autoclavable Manual 12-Channel Adjustable Color-Coded Pipette.png"
  // or "accumax/smart-pipette.jpg"
  
  // If the path doesn't start with '/images/' and doesn't have a folder structure,
  // we need to handle it properly
  if (!imagePath.includes('/')) {
    // Try to find image in brand folder
    if (brandId) {
      return `/images/brands/${brandId}/${imagePath}`;
    }
    return `/images/products/${imagePath}`;
  }

  // If the path already has a folder structure (like "dlab/filename.png"),
  // it should be in the /images/brands/ directory
  // But we need to check if it's already in the correct format
  if (imagePath.includes('/') && !imagePath.startsWith('images/')) {
    // The path is like "dlab/filename.png" or "accumax/filename.jpg"
    // We need to convert it to "/images/brands/dlab/filename.png"
    const parts = imagePath.split('/');
    if (parts.length === 2) {
      const [folder, filename] = parts;
      return `/images/brands/${folder}/${filename}`;
    }
  }

  // If it has a folder structure but not in the brands folder, use as is
  return `/images/${imagePath}`;
};

/**
 * Handle image errors - provide fallback images
 * @param {Event} event - The error event from img tag
 * @param {string} brandId - The brand ID (optional)
 */
export const handleImageError = (event, brandId = '') => {
  const img = event.target;
  
  // If the image failed, try a brand-specific fallback
  if (brandId) {
    const brandFallback = `/images/brands/${brandId}/brand-logo.jpg`;
    // Only set if not already trying this fallback
    if (img.src !== brandFallback && !img.src.includes('brand-logo.jpg')) {
      img.src = brandFallback;
      return;
    }
  }
  
  // Ultimate fallback - use a default image
  img.src = '/images/products/default-product.jpg';
};

/**
 * Get the correct image path for a brand logo
 * @param {string} brandId - The brand ID
 * @returns {string} - The brand logo URL
 */
export const getBrandLogo = (brandId) => {
  if (!brandId) return '/images/brands/default-brand.jpg';
  return `/images/brands/${brandId}/brand-logo.jpg`;
};