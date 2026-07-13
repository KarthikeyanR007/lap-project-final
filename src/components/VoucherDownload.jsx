import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFilePdf, FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa';

const VoucherDownload = ({ productName, voucherUrl }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenInNewTab = () => {
    setIsOpening(true);
    try {
      // Open the brochure in a new tab
      window.open(voucherUrl, '_blank', 'noopener,noreferrer');
      
      // Reset the button state after a moment
      setTimeout(() => {
        setIsOpening(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to open Brochure:', error);
      setIsOpening(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-100"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <FaFilePdf className="text-accent text-2xl" />
          </div>
          <div>
            <h4 className="font-semibold text-primary">Product Brochure</h4>
            <p className="text-gray-500 text-sm mt-1">
              View the product brochure for <span className="font-medium text-primary">{productName}</span>
            </p>
            <div className="flex items-center space-x-2 mt-2 text-xs text-gray-400">
              <FaFileAlt />
              <span>PDF Document - Opens in new tab</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleOpenInNewTab}
          disabled={isOpening}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            isOpening
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-accent text-white hover:bg-accent/90 shadow-lg hover:shadow-xl'
          }`}
        >
          {isOpening ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Opening...</span>
            </>
          ) : (
            <>
              <FaExternalLinkAlt />
              <span>View Brochure</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default VoucherDownload;