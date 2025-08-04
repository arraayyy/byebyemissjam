import React from 'react';
import { motion } from 'framer-motion';
import './FriendSelection.css';

const daraProfile = '/images/dara-profile.jpg';
const roeProfile = '/images/roe-profile.jpg';
const daraHeader = '/images/dara-concert-night.JPG';
const roeHeader = '/images/roe-sunrise-adventure.JPG';

interface FriendSelectionProps {
  onFriendSelect: (friend: 'dara' | 'roe') => void;
  onBack: () => void;
}

// const cardVariants = {
//   hidden: { opacity: 0, y: 50, scale: 0.9 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       delay: i * 0.25,
//       duration: 0.7,
//       ease: [0.16, 1, 0.3, 1]
//     }
//   })
// };

const FloatingParticles: React.FC = () => (
  <div className="floating-particles">
    {Array.from({ length: 25 }).map((_, i) => (
      <div 
        key={i} 
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${10 + Math.random() * 20}s`,
          animationDelay: `${Math.random() * 10}s`,
        }}
      />
    ))}
  </div>
);

const FriendSelection: React.FC<FriendSelectionProps> = ({ onFriendSelect, onBack }) => {
  return (
    <div className="friend-selection-container">
      <FloatingParticles />
      <div className="selection-header">
        <button
          className="back-button"
          onClick={onBack}
          aria-label="Return to landing page"
        >
          ← 
            
        </button>
      </div>
      <motion.h1 
        className="selection-title"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Farewell Messages from the Cutie Front-EndJunior Devs
      </motion.h1>
      <motion.p 
        className="selection-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: 'easeIn' }}
      >
We've bottled up our memories for the past months (and a few tears) for you Ms. Jam :D. Built with 100% love, 90% copy-paste, and 10% crying sessions. Powered by all the LLMs that exist in the world, with very satisfying effects and combinations of colors      </motion.p>

      <div className="friend-cards-container">
        <motion.div 
          className="friend-card dara"
          onClick={() => onFriendSelect('dara')}
          custom={0}
          // variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
        >
          <div className="card-header">
            <img src={daraHeader} alt="Dara at a concert" className="card-header-image" />
          </div>
          <img src={daraProfile} alt="Dara" className="card-profile-image" />
          <div className="card-body">
            <h2 className="card-name">Dara's Message</h2>
            <p className="card-tagline">"Unaha lang basa iya roe miss kay chada ug effects and music "</p>
          </div>
        </motion.div>

        <motion.div 
          className="friend-card roe"
          onClick={() => onFriendSelect('roe')}
          custom={1}
          // variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
        >
          <div className="card-header">
            <img src={roeHeader} alt="Roe Ann at sunrise" className="card-header-image" />
          </div>
          <img src={roeProfile} alt="Roe Ann" className="card-profile-image" />
          <div className="card-body">
            <h2 className="card-name">Roe Ann's Heartbreak</h2>
            <p className="card-tagline">"makahilak jud ka ani miss. <br/> - Hala si Dara gasuwat ana"</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FriendSelection;