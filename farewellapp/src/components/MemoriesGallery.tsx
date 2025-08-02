import Fireflies from './Fireflies';
import { useState, useEffect, useRef } from 'react'
import { soundEffects } from '../utils/soundEffects'
import './MemoriesGallery.css'

interface MemoriesGalleryProps {
  friend: 'dara' | 'roe'
  onBack: () => void
}

const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({ friend, onBack }) => {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [progress, setProgress] = useState(0)
  const [achievements] = useState<string[]>(['Shell Explorer', 'Memory Explorer'])
  const audioRef = useRef<HTMLAudioElement>(null)

  const tracks = [
    { title: "You'll Be In My Heart", artist: 'Phil Collins', duration: '4:18' },
    { title: 'Can You Feel The Love Tonight', artist: 'Elton John', duration: '3:59' },
    { title: 'A Whole New World', artist: 'Disney', duration: '4:02' },
    { title: 'Colors of the Wind', artist: 'Pocahontas', duration: '3:35' },
    { title: 'Beauty and the Beast', artist: 'Disney', duration: '4:05' }
  ]

  const daraMemories = {
    centerLetter: {
      title: 'To My Gaming Partner',
      content: `Hey Dara!

I've been thinking about all our crazy adventures together and just had to write this down. Remember that first time we tried playing that co-op game? We were absolutely terrible but couldn't stop laughing! 

From late night gaming sessions to those random 3am deep talks about life, you've been such an incredible friend. Your cyberpunk aesthetic isn't just a look - it's your whole vibe of being fearlessly yourself.

Thanks for always having my back, whether we're conquering virtual worlds or just trying to figure out real life. Here's to many more epic adventures together!

Stay awesome,
Your Friend ✨🎮`,
      date: 'March 2024'
    },
    photos: [
      { id: 1, title: 'Gaming Marathon', caption: 'Our epic 12-hour gaming session - we actually beat the final boss!', rotation: -3, position: { top: 15, left: 5 } },
      { id: 2, title: 'Concert Night', caption: 'Dancing like no one was watching (but everyone definitely was)', rotation: 5, position: { top: 20, right: 8 } },
      { id: 3, title: 'Coffee Shop Adventures', caption: 'Plotting world domination over lattes', rotation: -2, position: { bottom: 25, left: 12 } },
      { id: 4, title: 'Road Trip Chaos', caption: 'Got lost but found the best hidden cafe ever!', rotation: 4, position: { bottom: 35, right: 15 } },
      { id: 5, title: 'Birthday Surprise', caption: 'The look on your face when we surprised you was priceless', rotation: -1, position: { top: 45, left: 20 } },
      { id: 6, title: 'Study Session', caption: 'Somehow we actually got work done between snack breaks', rotation: 3, position: { top: 55, right: 25 } }
    ]
  }

  const roeMemories = {
    centerLetter: {
      title: 'For My Creative Soul Sister',
      content: `Dearest Roe Ann,

You bring magic to everything you touch. Watching you create art is like witnessing actual sorcery - the way you see beauty in the simplest things and transform them into something extraordinary.

Our friendship has been one of the most beautiful adventures of my life. From those quiet moments working on art projects together to our spontaneous beach days where we collected shells and stories.

You have this incredible way of making everyone feel special, like they're the main character in their own fairy tale. Your magical blue glow isn't just in your aesthetic - it radiates from your kind heart.

Thank you for being my anchor in chaos and my inspiration in calm. You're more precious than any treasure in the sea.

With all my love,
Your Forever Friend 💙⭐`,
      date: 'March 2024'
    },
    photos: [
      { id: 1, title: 'Art Studio Magic', caption: 'You creating masterpieces while I made a mess', rotation: -4, position: { top: 10, left: 8 } },
      { id: 2, title: 'Beach Day Bliss', caption: 'Collecting shells and making memories', rotation: 2, position: { top: 25, right: 10 } },
      { id: 3, title: 'Midnight Conversations', caption: 'Deep talks under the stars about dreams and magic', rotation: -1, position: { bottom: 30, left: 15 } },
      { id: 4, title: 'Garden Picnic', caption: 'You made flower crowns while I picked all the snacks', rotation: 6, position: { bottom: 20, right: 12 } },
      { id: 5, title: 'Movie Marathon', caption: 'Fantasy films and way too much popcorn', rotation: -3, position: { top: 50, left: 25 } },
      { id: 6, title: 'Sunrise Adventure', caption: 'You convinced me to wake up at 5am and it was totally worth it', rotation: 1, position: { top: 40, right: 20 } }
    ]
  }

  const currentMemories = friend === 'dara' ? daraMemories : roeMemories

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        const current = audioRef.current.currentTime
        const duration = audioRef.current.duration
        setProgress((current / duration) * 100 || 0)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }


  return (
    <div className="memories-gallery">
      <Fireflies />
      <div className="gaming-hud">
        <div className="progress-bar">
          <div className="memory-font">Memories Unlocked: 100%</div>
          <div className="progress-meter">
            <div className="progress-fill" style={{ width: '100%' }} />
          </div>
        </div>

        <div className="achievements-display">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-badge">
              <span className="memory-font">{achievement}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="gallery-header">
        <button 
          className="back-button memory-font" 
          onClick={() => {
            soundEffects.buttonPress()
            onBack()
          }}
          aria-label="Return to memory box selection"
          tabIndex={0}
        >
          ← Back to Memory Box
        </button>
        <h1 className="elegant-font gallery-title">
          {friend.charAt(0).toUpperCase() + friend.slice(1)} Memories
        </h1>
      </div>

      <div className="memories-layout">
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
          {currentMemories.photos.map((photo) => (
            <div
              key={photo.id}
              className={`photo-polaroid ${friend}-photo`}
              style={{
                transform: `rotate(${photo.rotation}deg)`,
                ...(photo.position.top && { top: `${photo.position.top}%` }),
                ...(photo.position.bottom && { bottom: `${photo.position.bottom}%` }),
                ...(photo.position.left && { left: `${photo.position.left}%` }),
                ...(photo.position.right && { right: `${photo.position.right}%` })
              }}
            >
              <div className="photo-image" role="img" aria-label={`Photo: ${photo.title} - ${photo.caption}`}>
                <div className="photo-placeholder">
                  <div className="photo-icon">📸</div>
                  <div className="photo-title">{photo.title}</div>
                </div>
              </div>
              <div className="photo-caption">{photo.caption}</div>
              <div className="photo-tape"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="music-player">
        <div className="player-container">
          <div className="player-display">
            <div className="track-info">
              <div className="elegant-font track-title">{tracks[currentTrack].title}</div>
              <div className="track-artist">{tracks[currentTrack].artist}</div>
            </div>
            
            <div className="visualizer">
              {Array.from({ length: 12 }, (_, i) => (
                <div 
                  key={i} 
                  className={`eq-bar ${isPlaying ? 'dancing' : ''}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
          
          <div className="player-controls">
            <button 
              className="control-btn" 
              onClick={() => setCurrentTrack(Math.max(0, currentTrack - 1))}
              aria-label="Previous track"
              disabled={currentTrack === 0}
            >
              ⏮
            </button>
            <button 
              className="control-btn play-btn" 
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button 
              className="control-btn" 
              onClick={() => setCurrentTrack(Math.min(tracks.length - 1, currentTrack + 1))}
              aria-label="Next track"
              disabled={currentTrack === tracks.length - 1}
            >
              ⏭
            </button>
          </div>
          
          <div className="volume-control">
            <span>🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider"
              aria-label={`Volume control, current volume ${Math.round(volume * 100)}%`}
            />
          </div>
          
          <div className="progress-display">
            <div className="progress-bar-audio">
              <div className="progress-fill-audio" style={{ width: `${progress}%` }} />
            </div>
            <div className="time-display memory-font">
              {tracks[currentTrack].duration}
            </div>
          </div>
        </div>
      </div>


      <audio
        ref={audioRef}
        loop
        // volume={volume}
        onEnded={() => setCurrentTrack((currentTrack + 1) % tracks.length)}
      >
        <source src="/music/nostalgic-track.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default MemoriesGallery