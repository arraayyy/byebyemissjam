// Utility to get all images from the public/images folder
export const getAllImages = (): string[] => {
  // List of all image files in public/images (excluding profiles and README)
  const imageFiles = [
    '1.jpg',
    '2.jpg', 
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpeg',
    '7.jpg',
    '8.jpeg',
    '9.jpeg',
    'dara-birthday.JPG',
    'dara-concert-night.JPG',
    'dara-gaming-marathon.JPG',
    'roe-sunrise-adventure.JPG'
  ];
  
  return imageFiles.map(file => `/images/${file}`);
};

// Get images excluding profile pictures
export const getMemoryImages = (): string[] => {
  return getAllImages().filter(img => 
    !img.includes('dara-profile') && 
    !img.includes('roe-profile')
  );
};