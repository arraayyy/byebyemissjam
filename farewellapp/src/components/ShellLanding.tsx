import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllImages } from '../utils/imageUtils';
import FriendSelection from './FriendSelection';
import './ShellLanding.css';

interface ShellLandingProps {
  onCardClick: (friend: 'dara' | 'roe') => void;
}

const PuzzleBackground: React.FC = () => {
  const images = getAllImages();
  return (
    <div className="puzzle-background">
      {Array.from({ length: 40 }).map((_, i) => {
        const imageIndex = i % images.length;
        return (
          <div
            key={i}
            className="puzzle-piece"
            style={{
              backgroundImage: `url(${images[imageIndex]})`,
              width: `${100 / 8}%`,
              height: `${100 / 5}%`,
              left: `${(i % 8) * (100 / 8)}%`,
              top: `${Math.floor(i / 8) * (100 / 5)}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        );
      })}
    </div>
  );
};

const ShellLanding: React.FC<ShellLandingProps> = ({ onCardClick }) => {
  const [isLocketClicked, setIsLocketClicked] = useState(false);

  const handleLocketClick = () => {
    setIsLocketClicked(true);
  };

  const handleBackToLanding = () => {
    setIsLocketClicked(false);
  };

  if (isLocketClicked) {
    return <FriendSelection onFriendSelect={onCardClick} onBack={handleBackToLanding} />;
  }

  return (
    <div className="shell-landing">
      <PuzzleBackground />
      <AnimatePresence>
        {!isLocketClicked && (
          <motion.div
            className="landing-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
          >
            {/* <h1 className="landing-title">1,Days  with Ms. Jam</h1> */}
            <div className="locket-container" onClick={handleLocketClick}>
              <div className="memory-locket">
                <div className="locket-glow"></div>
                <div className="locket-image-container">
                  <img src="/images/4.jpg" alt="A beautiful memory" className="locket-image" />
                </div>
              </div>
            </div>
            <p className="click-prompt">Click the Locket to Open</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShellLanding;