import { useState, useEffect } from 'react';
import './MagicCursor.css';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
}

const MagicCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      addSparkle(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const addSparkle = (x: number, y: number) => {
    const newSparkle = {
      id: Date.now(),
      x,
      y,
      size: Math.random() * 5 + 2,
    };
    setSparkles((prev) => [...prev, newSparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 1000);
  };

  return (
    <>
      <div className="cursor" style={{ left: `${position.x}px`, top: `${position.y}px` }} />
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
        />
      ))}
    </>
  );
};

export default MagicCursor;
