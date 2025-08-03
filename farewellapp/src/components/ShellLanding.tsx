import { useState, useEffect, useRef } from 'react';
import { soundEffects } from '../utils/soundEffects';
import './ShellLanding.css';

interface ShellLandingProps {
  onCardClick: (friend: 'dara' | 'roe') => void;
}

const ShellLanding: React.FC<ShellLandingProps> = ({ onCardClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && orbRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Create subtle floating effect based on mouse position
        const floatX = (mouseX / window.innerWidth) * 20;
        const floatY = (mouseY / window.innerHeight) * 20;
        
        orbRef.current.style.transform = `translate(${floatX}px, ${floatY}px)`;
      }
    };

    if (isMouseOver && !isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMouseOver, isOpen]);

  const handleOrbClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      soundEffects.shellOpen();
    }
  };

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    if (orbRef.current) {
      orbRef.current.style.transform = 'translate(0px, 0px)';
    }
  };

  const handleCardHover = (hovering: boolean) => {
    setIsHovering(hovering);
  };

  return (
    <div 
      className={`shell-landing ${isOpen ? 'open' : ''}`} 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'none' }}
    >
      {/* Custom Cursor */}
      <div 
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
        }}
      >
        <div className="cursor-dot"></div>
        <div className="cursor-ring"></div>
      </div>

      <div className="floating-particles">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
      
      <div className="orb-container" onClick={handleOrbClick}>
        <div className="orb" ref={orbRef}>
          <div className="orb-half orb-top"></div>
          <div className="orb-half orb-bottom"></div>
          <div className="orb-glow"></div>
        </div>
        <div className="cards">
          <div 
            className="card dara" 
            onClick={() => onCardClick('dara')}
            onMouseEnter={() => handleCardHover(true)}
            onMouseLeave={() => handleCardHover(false)}
          >
            <div className="card-image">
              <div className="placeholder-avatar">
                <img src="/images/dara-profile.jpg" alt="Dara" />
              </div>
            </div>
            <div className="card-content">
              <h3>Dara</h3>
              <p>Click to explore memories</p>
            </div>
            <div className="card-shine"></div>
          </div>
          <div 
            className="card roe" 
            onClick={() => onCardClick('roe')}
            onMouseEnter={() => handleCardHover(true)}
            onMouseLeave={() => handleCardHover(false)}
          >
            <div className="card-image">
              <div className="placeholder-avatar">
                <img src="/images/roe-profile.jpg" alt="Roe" />
              </div>
            </div>
            <div className="card-content">
              <h3>Roe</h3>
              <p>Click to explore memories</p>
            </div>
            <div className="card-shine"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShellLanding;