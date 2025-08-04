import React from 'react';
import { motion } from 'framer-motion';
import './Lightbox.css';

interface LightboxProps {
  imageSrc: string;
  caption: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ imageSrc, caption, onClose }) => {
  return (
    <motion.div 
      className="lightbox-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="lightbox-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the content
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <img src={imageSrc} alt={caption} className="lightbox-image" />
        <p className="lightbox-caption">{caption}</p>
        <button className="lightbox-close-button" onClick={onClose}>×</button>
      </motion.div>
    </motion.div>
  );
};

export default Lightbox;
