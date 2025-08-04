import { useState, useEffect, useRef } from 'react';
import { soundEffects } from '../utils/soundEffects';
import { getAllImages } from '../utils/imageUtils';
import './ShellLanding.css';

interface ShellLandingProps {
  onCardClick: (friend: 'dara' | 'roe') => void;
}

// Generate puzzle piece clip paths with knobs/indentations
const generatePuzzlePieceClipPath = (hasTopKnob: boolean, hasRightKnob: boolean, hasBottomKnob: boolean, hasLeftKnob: boolean) => {
  const knobSize = 15; // Percentage
  const knobOffset = 42.5; // Percentage from edge (centered)
  
  let points: string[] = [];
  
  // Start from top-left corner
  points.push('0% 0%');
  
  // Top edge
  if (hasTopKnob) {
    points.push(`${knobOffset}% 0%`);
    points.push(`${knobOffset + 2}% -${knobSize * 0.3}%`);
    points.push(`${knobOffset + knobSize * 0.5}% -${knobSize}%`);
    points.push(`${knobOffset + knobSize - 2}% -${knobSize * 0.3}%`);
    points.push(`${knobOffset + knobSize}% 0%`);
  }
  points.push('100% 0%');
  
  // Right edge
  if (hasRightKnob) {
    points.push(`100% ${knobOffset}%`);
    points.push(`${100 + knobSize * 0.3}% ${knobOffset + 2}%`);
    points.push(`${100 + knobSize}% ${knobOffset + knobSize * 0.5}%`);
    points.push(`${100 + knobSize * 0.3}% ${knobOffset + knobSize - 2}%`);
    points.push(`100% ${knobOffset + knobSize}%`);
  }
  points.push('100% 100%');
  
  // Bottom edge
  if (hasBottomKnob) {
    points.push(`${knobOffset + knobSize}% 100%`);
    points.push(`${knobOffset + knobSize - 2}% ${100 + knobSize * 0.3}%`);
    points.push(`${knobOffset + knobSize * 0.5}% ${100 + knobSize}%`);
    points.push(`${knobOffset + 2}% ${100 + knobSize * 0.3}%`);
    points.push(`${knobOffset}% 100%`);
  }
  points.push('0% 100%');
  
  // Left edge
  if (hasLeftKnob) {
    points.push(`0% ${knobOffset + knobSize}%`);
    points.push(`-${knobSize * 0.3}% ${knobOffset + knobSize - 2}%`);
    points.push(`-${knobSize}% ${knobOffset + knobSize * 0.5}%`);
    points.push(`-${knobSize * 0.3}% ${knobOffset + 2}%`);
    points.push(`0% ${knobOffset}%`);
  }
  
  return `polygon(${points.join(', ')})`;
};

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
      {/* Puzzle Background */}
      <div className="puzzle-background">
        {(() => {
          const cols = 8;
          const rows = 7;
          const pieces = [];
          
          // Create patterns for horizontal and vertical connections
          const horizontalKnobs: boolean[][] = Array(rows).fill(null).map(() => Array(cols - 1).fill(false));
          const verticalKnobs: boolean[][] = Array(rows - 1).fill(null).map(() => Array(cols).fill(false));
          
          // Generate random knob patterns for connections
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols - 1; col++) {
              horizontalKnobs[row][col] = Math.random() > 0.5;
            }
          }
          
          for (let row = 0; row < rows - 1; row++) {
            for (let col = 0; col < cols; col++) {
              verticalKnobs[row][col] = Math.random() > 0.5;
            }
          }
          
          const images = getAllImages();
          
          for (let i = 0; i < cols * rows; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const pieceWidth = 100 / cols;
            const pieceHeight = 100 / rows;
            const imageIndex = i % images.length;
            
            // Determine knobs based on connection patterns
            const hasTopKnob = row > 0 ? verticalKnobs[row - 1][col] : false;
            const hasRightKnob = col < cols - 1 ? horizontalKnobs[row][col] : false;
            const hasBottomKnob = row < rows - 1 ? !verticalKnobs[row][col] : false;
            const hasLeftKnob = col > 0 ? !horizontalKnobs[row][col - 1] : false;
            
            const clipPath = generatePuzzlePieceClipPath(hasTopKnob, hasRightKnob, hasBottomKnob, hasLeftKnob);
            
            pieces.push(
              <div
                key={i}
                className="puzzle-piece"
                style={{
                  backgroundImage: `url(${images[imageIndex]})`,
                  width: `${pieceWidth}%`,
                  height: `${pieceHeight}%`,
                  left: `${col * pieceWidth}%`,
                  top: `${row * pieceHeight}%`,
                  clipPath: clipPath,
                }}
              />
            );
          }
          
          return pieces;
        })()}
      </div>

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