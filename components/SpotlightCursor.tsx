'use client';

import { useEffect, useState } from 'react';

export function SpotlightCursor() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const updatePosition = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('pointermove', updatePosition);
    return () => window.removeEventListener('pointermove', updatePosition);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 hidden transition-opacity duration-500 md:block"
      style={{
        background: `radial-gradient(520px circle at ${position.x}px ${position.y}px, rgba(216, 180, 95, 0.16), rgba(135, 92, 255, 0.08) 32%, transparent 68%)`
      }}
    />
  );
}
