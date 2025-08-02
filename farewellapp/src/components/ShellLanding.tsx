import { useState } from 'react';
import { soundEffects } from '../utils/soundEffects';
import './ShellLanding.css';

interface ShellLandingProps {
  onCardClick: (friend: 'dara' | 'roe') => void;
}

const ShellLanding: React.FC<ShellLandingProps> = ({ onCardClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOrbClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      soundEffects.shellOpen();
    }
  };

  return (
    <div className={`shell-landing ${isOpen ? 'open' : ''}`}>
      <div className="orb-container" onClick={handleOrbClick}>
        <div className="orb">
          <div className="orb-half orb-top"></div>
          <div className="orb-half orb-bottom"></div>
        </div>
        <div className="cards">
          <div className="card dara" onClick={() => onCardClick('dara')}>Dara</div>
          <div className="card roe" onClick={() => onCardClick('roe')}>Roe</div>
        </div>
      </div>
    </div>
  );
};

export default ShellLanding;