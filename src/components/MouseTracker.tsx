import { useState } from 'react';
import { useWindowListener } from '../helpers/useWindowListener';

export default function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useWindowListener('pointermove', (e: PointerEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  });

  return (
    <div style={{
      position: 'absolute',
      backgroundColor: 'pink',
      borderRadius: '50%',
      opacity: 0.6,
      transform: `translate(${position.x}px, ${position.y}px)`,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
    }} />
  );
}
