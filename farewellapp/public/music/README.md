# Music Files for Farewell App

## Background Music (Memory Pages)
The app currently plays background music on the memory/letter pages. Place your music file in this folder:

### Required Music File
- `nostalgic-track.mp3` - Background music that plays during the memory gallery experience

## Music Player Display
The app shows a music player with these track titles (currently decorative):
1. "You'll Be In My Heart" - Phil Collins (4:18)
2. "Can You Feel The Love Tonight" - Elton John (3:59)
3. "A Whole New World" - Disney (4:02)
4. "Colors of the Wind" - Pocahontas (3:35)
5. "Beauty and the Beast" - Disney (4:05)

## Current Setup
- **Actually Plays:** Only `nostalgic-track.mp3` (loops continuously)
- **Display Only:** The track list above is shown in the music player interface
- **Controls:** Play/pause, volume, and progress bar are functional

## File Format Requirements
- **Format:** MP3 (recommended)
- **Quality:** 128kbps or higher recommended
- **Length:** Any length (will loop automatically)
- **Size:** Keep under 10MB for faster loading

## Notes
- The music starts playing automatically after 5 seconds on the memory pages
- Users can control volume and play/pause
- The same track plays for both Dara's and Roe's memory pages
- Choose a nostalgic, emotional, or meaningful song that fits the farewell theme

## File Location
Place your music file here:
```
public/music/
└── nostalgic-track.mp3
```

## Optional Enhancement
If you want to add more tracks that actually play (not just display), you would need to:
1. Add more MP3 files to this folder
2. Update the MemoriesGallery.tsx component to include the actual file paths
3. Modify the track-switching logic

For now, just add your main farewell song as `nostalgic-track.mp3`!