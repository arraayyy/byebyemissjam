
import { Canvas, useFrame } from 'react-three-fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';

const FloatingShape = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [position, size] = useMemo(() => {
    const pos: [number, number, number] = [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5];
    const sz = Math.random() * 0.5 + 0.1;
    return [pos, sz];
  }, []);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.001;
      mesh.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
    </mesh>
  );
};

const MagicCanvas = () => {
  return (
    <Canvas
      style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
      camera={{ position: [0, 0, 1] }}
    >
      <ambientLight intensity={0.5} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingShape key={i} />
      ))}
    </Canvas>
  );
};

export default MagicCanvas;
