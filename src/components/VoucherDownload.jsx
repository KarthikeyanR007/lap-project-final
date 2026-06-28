import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFilePdf, FaFileAlt } from 'react-icons/fa';

const VoucherDownload = ({ productName, voucherUrl }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = voucherUrl;
      link.download = `${productName.replace(/\s+/g, '_')}_voucher.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Simulate download completion
      setTimeout(() => {
        setIsDownloading(false);
      }, 2000);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
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
            <h4 className="font-semibold text-primary">Product Voucher</h4>
            <p className="text-gray-500 text-sm mt-1">
              Download the product voucher/brochure for <span className="font-medium text-primary">{productName}</span>
            </p>
            <div className="flex items-center space-x-2 mt-2 text-xs text-gray-400">
              <FaFileAlt />
              <span>PDF Document</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            isDownloading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-accent text-white hover:bg-accent/90 shadow-lg hover:shadow-xl'
          }`}
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <FaDownload />
              <span>Download Voucher</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default VoucherDownload;