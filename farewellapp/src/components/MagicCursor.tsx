import { useEffect, useRef } from 'react';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
}

const SnowflakeCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const snowflakes = useRef<Snowflake[]>([]);
  const animationFrame = useRef<number | null>(null);
  const lastTime = useRef<number>(0);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const addSnowflake = (x: number, y: number) => {
      const newFlake: Snowflake = {
        id: Date.now() + Math.random(),
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 2 + 1,
        size: Math.random() * 8 + 4,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.01,
      };
      snowflakes.current.push(newFlake);
    };

    const drawSnowflake = (ctx: CanvasRenderingContext2D, flake: Snowflake) => {
      ctx.save();
      ctx.globalAlpha = flake.alpha;
      ctx.font = `${flake.size}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText('❄️', flake.x, flake.y);
      ctx.restore();
    };

    const updateSnowflakes = () => {
      snowflakes.current = snowflakes.current.filter(flake => {
        flake.x += flake.vx;
        flake.y += flake.vy;
        flake.alpha -= flake.decay;
        return flake.alpha > 0 && flake.y < window.innerHeight + 50;
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      snowflakes.current.forEach(flake => drawSnowflake(ctx, flake));
    };

    const animate = (currentTime: number) => {
      if (currentTime - lastTime.current > 16) {
        updateSnowflakes();
        render();
        lastTime.current = currentTime;
      }
      animationFrame.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() < 0.3) {
        addSnowflake(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', setCanvasSize);
    animate(0);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setCanvasSize);
      if (canvasRef.current) {
        document.body.removeChild(canvasRef.current);
      }
    };
  }, []);

  return null;
};

export default SnowflakeCursor;
