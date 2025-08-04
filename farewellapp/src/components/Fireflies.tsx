import { useEffect, useState } from 'react';
import './Fireflies.css';

const Fireflies = () => {
  const [fireflies, setFireflies] = useState<any[]>([]);

  useEffect(() => {
    const createFireflies = () => {
      const newFireflies = Array.from({ length: 20 }).map(() => ({
        id: Math.random(),
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
        size: `${Math.random() * 3 + 1}px`,
        '--tx': `${Math.random() * 100 - 50}px`,
        '--ty': `${Math.random() * 100 - 50}px`,
      }));
      setFireflies(newFireflies);
    };

    createFireflies();
  }, []);

  return (
    <div className="fireflies-container">
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className="firefly"
          style={{
            top: firefly.top,
            left: firefly.left,
            width: firefly.size,
            height: firefly.size,
            animationDuration: firefly.animationDuration,
            animationDelay: firefly.animationDelay,
            '--tx': firefly['--tx'],
            '--ty': firefly['--ty'],
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default Fireflies;
