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
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      // Set default volume to 80%
      audioRef.current.volume = 0.8;
      
      // Add 10-second delay before playing
      setTimeout(() => {
        audioRef.current?.play().catch(console.error);
      }, 10000);
    }
  }, [friend]);

  const daraMemories = {
    centerLetter: {
      title: 'To My Cutie Senior FE Lead',
      content: `
Thank you for mentoring us these past nine months, for reviewing our MRs, helping us with our Jira tasks, and always guiding us patiently.

Basin nakakatawa ka karon, Miss, kay naa pa gyud music detso para makahilak jud ka ba. Wala pa gyud pause ang player 😆

Thank you, Miss, for patiently introducing us to new things and onboarding us. For sharing your learnings, giving your time especially when we got stuck on complex tasks, and for always encouraging us to keep going.

Even when my questions got confusing at times, you always found a way to explain things clearly and calmly. I never felt too small because you made learning feel safe. You weren’t just our senior dev, Miss, you were like a safe space. You made intimidating things feel doable. ♥️

I really hope someday I can be like you , smart, insightful, full of ideas, and open-minded. Apil na jud ang pagka-cute, Miss. Mas mura pa mi ug senior tan-awon kaysa nimo 😆

I’ve already learned so much from you, miss Jam, from how you speak, how you handle tasks, how you organize your thoughts, and how you deliver them with clarity. I hope I won’t forget any of it. I’ll also start reading the book you gave me, Miss, it means a lot to me  :))

And Miss, tbh I felt really empty atong last nato kita. But I’m still glad kay nibalik mo ato sa The Social. Na-memorize na nako imong face, Miss, nya grabe pajud ang lights ato sa imo likod- super bright, mura kag angel sa backlight xD

Thank you kaayo, Miss, for believing in our potential. This may just be a small percent of our success, but for starters like us, it already means a lot.

I wish you all the best on your next journey. Lisod jud mag-goodbye, Miss, but I truly believe you’ll succeed in whatever you pursue, bc you’re smart, full of vision, and you give your 100% And I hope it brings you the joy you deserve, Miss. Me and Roe will miss you a lot <3 ^___^ :)))  🙇‍♀️

See you around, Miss. :D HEHEHEHE wala pa nahuman ang kanta miss xD?


- Dara ♥(ˆ⌣ˆԅ) `,
      date: '04.08.2025',
    },
    photos: [
      { id: 1, title: 'Cutie Devs', caption: 'Pero ikaw jud pinaka cute diri miss oy', rotation: 0, position: { top: 5, left: 2 }, image: '/images/dara-gaming-marathon.JPG' },
      { id: 2, title: 'Productivity', caption: 'Chika lang sa ta ani miss, kay naa sa sud ang laptop xD', rotation: 0, position: { top: 8, right: 2 }, image: '/images/dara-concert-night.JPG' },
      { id: 3, title: 'FE MileStone', caption: '2030: Frontend Devs Change History? xD.', rotation: 0, position: { top: 35, left: 1 }, image: '/images/dara-coffee-shop.jpg' },
      { id: 4, title: 'Legacy Onboard', caption: 'Bsan unsa nalang ako gibutang diri ahahaha, gamay ra ato pics miss. Kato untang legacy moments hahah kaso wfh man (╯︵╰,)', rotation: 0, position: { top: 38, right: 1 }, image: '/images/dara-road-trip.jpg' },
      { id: 5, title: 'Christmas Party Performance', caption: 'salamat sa pagtudlo sa steppings miss, Bonjour~ Bonjour~  ', rotation: 0, position: { top: 65, left: 3 }, image: '/images/dara-birthday.JPG' },
      { id: 6, title: 'Chika Session', caption: 'Salamat sa tanan nmu advice ate Jam <3 ', rotation: 0, position: { top: 68, right: 3 }, image: '/images/dara-study-session.jpg' },

      
    ],
  };

  const roeMemories = { 
    centerLetter: {
      title: 'To Our Amazing team leader',
      content: `Hello miss,

The first time we met kay sa office. I remember how shy I was, katong naa koy pangutana ni RB nya tapad mo ato, nya ako giiswag gamay ang laptop kay mauwaw ko mutan-aw ka XD. HAHAHAHA.

Anyways, this is our gift to you, miss. Amo jud ni gi-effortan kay love ka namo, yiee.

First of all, congratulations on your new business, miss. I wish you the best of luck as you start this new journey. Even though we're happy for your next success in life, it's still sad to think na mawad-an namig amazing team leader who always pushes us, our friend, mentor, and safe space. HAHAHA legit ang safe space, miss. You just have this approachable vibe that makes you someone we’re not afraid to ask for help from. Katong naabot ka sa FE Team, miss, it felt like a big burden had been lifted. Maybe the best way to say it is, it felt like there was a shield guiding and protecting us.

It's amazing to think we’ve accomplished so many projects and tasks in just a few months with your guidance, support, wisdom, and master skillzzzz, miss. Without you, personally, I don't think ing-ato kadaghan among ma-accomplish, miss. Thank you for the knowledge you've shared with us. Thank you for the tips. Thank you for the lessons, miss. We've really learned a lot. HAHAHAHAHAHA, sagol-sagol na akong thoughts, miss, di ma-organize, di pareha sa imo work miss, so organized :DDD. I became a big fan of how organized you are, miss; that is truly inspiring. For sure, we will keep applying the lessons you've taught us. You taught us well, miss. :)

This part right here, nawad-an nakog mastorya hahahahaha.
Actually, ikaw among first na team leader, miss, and you've set the standard. Wala nay makapuli nimo, miss, huhuhu. Sige nakog balik-balik pero I really, really, really learned a lot, miss. Thank you diay sa gift, miss. I've started reading it na and I’m starting to see a different perspective.

Wala koy ma-share na wisdom or something miss or mahatag na kwarta HAHAHAHAHA, pero ig balik nimo'g basa ang letter, paminawa “Graceland Too” - Phoebe Bridgers na music. Murag sayop akong song choice gigamit ani da AHAHAHAH. Also miss, I'd like to share this: O'mali, I think maganahan ka'g himo and pwede nimo ibutang sa menu HAHAHA. I think rsd ha, paladesisyon kay ko AHAHHA. Bitaw miss, ganahan rako mutilaw balik ana. Actually nakatilaw ko ana because sa ako friend ga own sad silag cafe but sadly wala nila nabutang sa menu, bali ako una naka-tilaw HAHAHAHAH. Actually, ako gi-search kaning Egyptian bread pudding, miss, ha, basin sayop na imong ma-search AHAHAHA.

I think wala najud koy masulti, miss. My words fall short, but I hope you can feel how much you’ve meant to us. We will surely miss you. Even writing this letter now, it feels nostalgic already. I hope you do well in life, miss, your family, your business. I know we will meet again, hehehe, kita tulo. I hope you are proud of us, miss, what we've become and what we will be. You are forever etched in our memories. This is it, miss, but it isn't. This might be the end of a chapter, but not the end of what you’ve started in us.

Thank you for believing in us even when we doubted ourselves.

- Roe ")
`,
      date: 'August 08, 2025',
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

            <div className="center-letter roe-letter" style={{ flex: '0 0 600px', zIndex: 10 }}>
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
                <div className="letter-body dara-letter-content">
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