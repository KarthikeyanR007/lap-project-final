import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFilePdf, FaFileAlt, FaExternalLinkAlt, FaCloudDownloadAlt } from 'react-icons/fa';

const VoucherDownload = ({ productName, voucherUrl }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Check if the voucher is a URL or a local file path
  const isUrl = (url) => {
    if (!url) return false;
    return url.startsWith('http://') || url.startsWith('https://');
  };

  const isLocalFile = (url) => {
    if (!url) return false;
    return url.startsWith('/') || url.startsWith('./') || url.endsWith('.pdf');
  };

  const handleOpenInNewTab = () => {
    if (!voucherUrl) {
      console.error('No brochure available');
      return;
    }

    setIsOpening(true);
    
    try {
      if (isUrl(voucherUrl)) {
        // Open URL in new tab
        window.open(voucherUrl, '_blank', 'noopener,noreferrer');
      } else if (isLocalFile(voucherUrl)) {
        // For local PDF files, we can either:
        // Option 1: Open in new tab using the path
        window.open(voucherUrl, '_blank', 'noopener,noreferrer');
        // Option 2: Force download
        // const link = document.createElement('a');
        // link.href = voucherUrl;
        // link.download = `${productName}-brochure.pdf`;
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
      } else {
        // Try opening as is
        window.open(voucherUrl, '_blank', 'noopener,noreferrer');
      }
      
      setTimeout(() => {
        setIsOpening(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to open brochure:', error);
      setIsOpening(false);
      
      // Fallback: Try to download
      if (voucherUrl) {
        try {
          const link = document.createElement('a');
          link.href = voucherUrl;
          link.download = `${productName.replace(/\s+/g, '-')}-brochure.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (downloadError) {
          console.error('Failed to download brochure:', downloadError);
        }
      }
    }
  };

  const getFileTypeInfo = () => {
    if (!voucherUrl) return 'No brochure available';
    if (isUrl(voucherUrl)) return 'Online PDF - Opens in new tab';
    if (isLocalFile(voucherUrl)) return 'Local PDF - Opens in new tab';
    return 'PDF Document - Opens in new tab';
  };

  const getFileIcon = () => {
    if (!voucherUrl) return <FaFileAlt className="text-gray-400" />;
    if (isUrl(voucherUrl)) return <FaExternalLinkAlt className="text-accent" />;
    if (isLocalFile(voucherUrl)) return <FaCloudDownloadAlt className="text-accent" />;
    return <FaFilePdf className="text-accent" />;
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
              {getFileIcon()}
              <span>{getFileTypeInfo()}</span>
            </div>
            {voucherUrl && (
              <div className="mt-1 text-xs text-gray-500 font-mono truncate max-w-xs">
                {voucherUrl}
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={handleOpenInNewTab}
          disabled={isOpening || !voucherUrl}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            isOpening || !voucherUrl
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
              <span>{voucherUrl ? 'View Brochure' : 'Not Available'}</span>
            </>
          )}
        </button>
      </div>
      
      {/* Show a message if no voucher is available */}
      {!voucherUrl && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            <span className="font-semibold">Note:</span> Brochure for this product is currently not available. Please contact our sales team for more information.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default VoucherDownload;