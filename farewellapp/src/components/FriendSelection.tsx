import { useState, useEffect } from 'react'
import { soundEffects } from '../utils/soundEffects'
import './FriendSelection.css'

interface FriendSelectionProps {
  onFriendSelect: (friend: 'dara' | 'roe') => void
  onClose: () => void
}

const FriendSelection: React.FC<FriendSelectionProps> = ({ onFriendSelect, onClose }) => {
  const [shellState, setShellState] = useState<'closed' | 'half-open' | 'fully-open'>('closed')
  const [showCards, setShowCards] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    // First show shell half-open with pearl glimpses
    const timer1 = setTimeout(() => {
      setShellState('half-open')
      soundEffects.shellOpen()
    }, 500)

    // Then fully open and show cards
    const timer2 = setTimeout(() => {
      setShellState('fully-open')
      setShowCards(true)
      soundEffects.achievementUnlock()
    }, 2000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const handleFriendSelect = (friend: 'dara' | 'roe') => {
    soundEffects.cardSelect()
    onFriendSelect(friend)
  }

  return (
    <div className="friend-selection">
      <div className="shell-opening-container">
        <div className={`shell-top ${shellState}`}>
          <div className="shell-half top">
            <div className="shell-ridges-half">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="ridge-half" style={{ 
                  transform: `translate(-50%, -100%) rotate(${(i * 18) - 90}deg)`,
                  height: `${85 + Math.sin(i * 0.3) * 15}%`
                }} />
              ))}
            </div>
          </div>
        </div>
        
        <div className={`shell-bottom ${shellState}`}>
          <div className="shell-half bottom">
            <div className="shell-ridges-half">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="ridge-half" style={{ 
                  transform: `translate(-50%, -100%) rotate(${(i * 18) + 90}deg)`,
                  height: `${85 + Math.sin(i * 0.3) * 15}%`
                }} />
              ))}
            </div>
            
            <div className="shell-interior">
              {shellState === 'half-open' && (
                <div className="pearl-glimpses">
                  <div className="pearl-hint dara-hint"></div>
                  <div className="pearl-hint roe-hint"></div>
                </div>
              )}
              
              {shellState === 'fully-open' && (
                <div className="pearl-center">
                  <button className="close-button" onClick={onClose}>
                    <span className="elegant-font">×</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {showCards && (
          <div className="floating-cards">
            <div className="friend-cards">
              <button 
                className={`friend-card dara ${hoveredCard === 'dara' ? 'hovered' : ''}`}
                onMouseEnter={() => {
                  setHoveredCard('dara')
                  soundEffects.hover()
                }}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleFriendSelect('dara')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleFriendSelect('dara')
                  }
                }}
                aria-label="View Dara's memories - A collection of gaming adventures and friendship moments"
                tabIndex={0}
              >
                <div className="card-glow dara-glow"></div>
                <div className="card-content">
                  <div className="avatar-container">
                    <div className="avatar dara-avatar">
                      <div className="pixel-art">
                        <div className="hair"></div>
                        <div className="face"></div>
                        <div className="eyes"></div>
                      </div>
                    </div>
                    <div className="aura-effect dara-aura"></div>
                  </div>
                  
                  <div className="card-info">
                    <h3 className="elegant-font card-name">DARA</h3>
                  </div>
                </div>
                
                <div className="particle-system dara-particles">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="card-particle" style={{ 
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }} />
                  ))}
                </div>
              </button>

              <button 
                className={`friend-card roe ${hoveredCard === 'roe' ? 'hovered' : ''}`}
                onMouseEnter={() => {
                  setHoveredCard('roe')
                  soundEffects.hover()
                }}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleFriendSelect('roe')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleFriendSelect('roe')
                  }
                }}
                aria-label="View Roe Ann's memories - A collection of creative moments and magical experiences"
                tabIndex={0}
              >
                <div className="card-glow roe-glow"></div>
                <div className="card-content">
                  <div className="avatar-container">
                    <div className="avatar roe-avatar">
                      <div className="pixel-art">
                        <div className="hair"></div>
                        <div className="face"></div>
                        <div className="eyes"></div>
                      </div>
                    </div>
                    <div className="aura-effect roe-aura"></div>
                  </div>
                  
                  <div className="card-info">
                    <h3 className="elegant-font card-name">ROE ANN</h3>
                  </div>
                </div>
                
                <div className="particle-system roe-particles">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="card-particle" style={{ 
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }} />
                  ))}
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {shellState === 'closed' && (
        <div className="opening-effects">
          <div className="light-burst"></div>
          <div className="achievement-popup">
            <div className="memory-font">Memory Box Opened!</div>
            <div className="achievement-glow"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FriendSelection