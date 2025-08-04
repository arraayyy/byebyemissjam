import Fireflies from './Fireflies';
import { useState, useEffect, useRef } from 'react';
import { soundEffects } from '../utils/soundEffects';
import { getMemoryImages } from '../utils/imageUtils';
import Lightbox from './Lightbox';
import { AnimatePresence } from 'framer-motion';
import './MemoriesGallery.css';

interface MemoriesGalleryProps {
  friend: 'dara' | 'roe';
  onBack: () => void;
}

interface Photo {
  id: number;
  title: string;
  caption: string;
  rotation: number;
  position: { top?: number; right?: number; bottom?: number; left?: number };
  image: string;
}

const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({ friend, onBack }) => {
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
  const [achievements] = useState<string[]>(['Shell Explorer', 'Memory Explorer']);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, [friend]);

  const daraMemories = {
    centerLetter: {
      title: 'To My Cutie Senior FE Dev',
      content: `Hi Miorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.ss Jam TESTETSTETSTSTT ✨🎮`,
      date: '04.08.2025',
    },
    photos: [
      { id: 1, title: 'Cutie Devs', caption: 'Pero ikaw jud pinaka cute diri miss oy', rotation: 0, position: { top: 5, left: 2 }, image: '/images/dara-gaming-marathon.JPG' },
      { id: 2, title: 'Productivity', caption: 'Chika lang sa ta ani miss, kay naa sa sud ang laptop xD', rotation: 0, position: { top: 8, right: 2 }, image: '/images/dara-concert-night.JPG' },
      { id: 3, title: 'FE MileStone', caption: '2030: Frontend Devs Change History? xD.', rotation: 0, position: { top: 35, left: 1 }, image: '/images/dara-coffee-shop.jpg' },
      { id: 4, title: 'Legacy Onboard', caption: 'Bsan unsa nalang ako gibutang diri ahahaha, gamay ra ato pics miss. Memorize na nako imo nawong miss hahahah', rotation: 0, position: { top: 38, right: 1 }, image: '/images/dara-road-trip.jpg' },
      { id: 5, title: 'Christmas Party Performance', caption: 'salamat sa pagtudlo sa steppings miss, Bonjour~ Bonjour~  ', rotation: 0, position: { top: 65, left: 3 }, image: '/images/dara-birthday.jpg' },
      { id: 6, title: 'Chika Session', caption: 'Salamat sa tanan nmu advice ate Jam <3 ', rotation: 0, position: { top: 68, right: 3 }, image: '/images/dara-study-session.jpg' },

      
    ],
  };

  const roeMemories = { 
    centerLetter: {
      title: 'For My Creative Soul Sister',
      content: `Dearest Roe Ann,\n\nYou bring magic to everything you touch. Watching you create art is like witnessing actual sorcery - the way you see beauty in the simplest things and transform them into something extraordinary.\n\nOur friendship has been one of the most beautiful adventures of my life. From those quiet moments working on art projects together to our spontaneous beach days where we collected shells and stories.\n\nYou have this incredible way of making everyone feel special, like they're the main character in their own fairy tale. Your magical blue glow isn't just in your aesthetic - it radiates from your kind heart.\n\nThank you for being my anchor in chaos and my inspiration in calm. You're more precious than any treasure in the sea.\n\nWith all my love,\nYour Forever Friend 💙⭐`,
      date: 'March 2024',
    },
    photos: [
      { id: 1, title: 'Art Studio Magic', caption: 'You creating masterpieces while I made a mess', rotation: -6, position: { top: 12, left: 6 }, image: '/images/roe-art-studio.jpg' },
      { id: 2, title: 'Beach Day Bliss', caption: 'Collecting shells and making memories', rotation: 8, position: { top: 5, right: 4 }, image: '/images/roe-beach-day.jpg' },
      { id: 3, title: 'Midnight Conversations', caption: 'Deep talks under the stars about dreams and magic', rotation: -4, position: { bottom: 25, left: 5 }, image: '/images/roe-midnight-talks.jpg' },
      { id: 4, title: 'Garden Picnic', caption: 'You made flower crowns while I picked all the snacks', rotation: 10, position: { bottom: 18, right: 6 }, image: '/images/roe-garden-picnic.jpg' },
      { id: 5, title: 'Movie Marathon', caption: 'Fantasy films and way too much popcorn', rotation: -7, position: { top: 42, left: 4 }, image: '/images/roe-movie-marathon.jpg' },
      { id: 6, title: 'Sunrise Adventure', caption: 'You convinced me to wake up at 5am and it was totally worth it', rotation: 5, position: { top: 38, right: 3 }, image: '/images/roe-sunrise-adventure.JPG' },
    ],
  };

  const currentMemories = friend === 'dara' ? daraMemories : roeMemories;

  const allImages = getMemoryImages();

  return (
    <div className="memories-gallery">
      <Fireflies />
      

      <div className="gallery-header">
        <button
          className="back-button memory-font"
          onClick={() => {
            soundEffects.buttonPress();
            onBack();
          }}
          aria-label="Return to memory box selection"
          tabIndex={0}
        >
          ← Back to Memory Box
        </button>
        <h1 className="elegant-font gallery-title">{friend.charAt(0).toUpperCase() + friend.slice(1)} Memories</h1>
      </div>

      <div className="memories-layout">
        {friend === 'roe' ? (
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '20px' }}>
            <div className="scrolling-gallery left-gallery">
              <div className="scrolling-images">
                {[...allImages, ...allImages].map((image, index) => (
                  <img key={`left-${index}`} src={image} alt={`Memory ${index + 1}`} className="scroll-image" />
                ))}
              </div>
            </div>

            <div className="center-letter" style={{ flex: '0 0 600px', zIndex: 10 }}>
              <div className="letter-paper">
                <div className="letter-header">
                  <h2 className="letter-title">{currentMemories.centerLetter.title}</h2>
                  <div className="letter-date">{currentMemories.centerLetter.date}</div>
                </div>
                <div className="letter-body">
                  {currentMemories.centerLetter.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="scrolling-gallery right-gallery">
              <div className="scrolling-images">
                {[...allImages, ...allImages].map((image, index) => (
                  <img key={`right-${index}`} src={image} alt={`Memory ${index + 1}`} className="scroll-image" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="dara-memories-scattered">
            <div className="center-letter">
              <div className="letter-paper">
                <div className="letter-header">
                  <h2 className="letter-title">{currentMemories.centerLetter.title}</h2>
                  <div className="letter-date">{currentMemories.centerLetter.date}</div>
                </div>
                <div className="letter-body">
                  {currentMemories.centerLetter.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="photos-scattered">
              {currentMemories.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`photo-polaroid ${friend}-photo photo-${index + 1}`}
                  onClick={() => setSelectedImage(photo)}
                  style={{
                    '--rotation': `${photo.rotation}deg`,
                    '--photo-index': index,
                    ...(photo.position.top && { top: `${photo.position.top}%` }),
                    ...(photo.position.left && { left: `${photo.position.left}%` }),
                    ...(photo.position.right && { right: `${photo.position.right}%` }),
                  } as React.CSSProperties}
                >
                  <div className="photo-image" role="img" aria-label={`Photo: ${photo.title} - ${photo.caption}`}>
                    <div className="photo-placeholder">
                      <img src={photo.image} alt={photo.title} className="memory-photo" />
                      <div className="photo-title">{photo.title}</div>
                    </div>
                  </div>
                  <div className="photo-caption">{photo.caption}</div>
                  <div className="photo-tape"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <Lightbox 
            imageSrc={selectedImage.image} 
            caption={selectedImage.caption} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </AnimatePresence>

      <audio ref={audioRef} loop autoPlay>
        <source src={friend === 'dara' ? '/music/nostalgic-track.mp3' : '/music/newyears.mp3'} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MemoriesGallery;