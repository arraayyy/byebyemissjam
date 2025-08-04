import React, { useState, useRef, useEffect } from 'react';
import { Music2 } from 'lucide-react';
import './DaraSection.css';

const DaraSection: React.FC = () => {
  const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isMusicPlayerVisible && audioRef.current) {
      audioRef.current.play();
    }
  }, [isMusicPlayerVisible]);

  return (
    <div className="dara-section">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          💎 Dara's Special Corner 💎
        </h1>
        <p className="text-xl text-white/90">
          Heartfelt messages from Dara
        </p>
      </div>

      {/* ... content of the page ... */}

      <button 
        className="music-player-toggle"
        onClick={() => setIsMusicPlayerVisible(!isMusicPlayerVisible)}
        aria-label="Toggle Music Player"
      >
        <Music2 size={30} color="#fff" />
      </button>

      <div className={`music-player-container ${isMusicPlayerVisible ? '' : 'hidden'}`}>
        <audio ref={audioRef} controls autoPlay loop>
          <source src="/music/nostalgic-track.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default DaraSection;
