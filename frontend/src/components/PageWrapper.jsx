import React from 'react';
import { motion } from 'framer-motion';

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.95 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.43, 0.13, 0.23, 0.96] 
      }}
      className="min-h-screen pt-20"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
