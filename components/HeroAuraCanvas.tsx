'use client';

import { useEffect, useRef } from 'react';

export function HeroAuraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrame = 0;
    let time = 0;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = Math.min(rect.width, rect.height) * 0.22;

      for (let i = 0; i < 90; i += 1) {
        const angle = (i / 90) * Math.PI * 2 + time * 0.012;
        const orbit = radius + Math.sin(time * 0.02 + i) * 42;
        const depth = 0.55 + Math.cos(angle + time * 0.01) * 0.45;
        const x = centerX + Math.cos(angle) * orbit * (1.4 - depth * 0.25);
        const y = centerY + Math.sin(angle) * orbit * 0.62;
        const particleRadius = 1.1 + depth * 3.6;

        context.beginPath();
        context.fillStyle = `rgba(${220 + depth * 25}, ${165 + depth * 40}, ${82 + depth * 30}, ${0.14 + depth * 0.56})`;
        context.shadowColor = 'rgba(183, 120, 255, 0.75)';
        context.shadowBlur = 18;
        context.arc(x, y, particleRadius, 0, Math.PI * 2);
        context.fill();
      }

      const glow = context.createRadialGradient(centerX, centerY, 8, centerX, centerY, radius * 2.8);
      glow.addColorStop(0, 'rgba(255, 221, 145, 0.3)');
      glow.addColorStop(0.4, 'rgba(124, 58, 237, 0.18)');
      glow.addColorStop(1, 'rgba(5, 3, 10, 0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, rect.width, rect.height);

      time += 1;
      animationFrame = window.requestAnimationFrame(render);
    };

    render();
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return <canvas ref={canvasRef} className="h-[360px] w-full rounded-[2rem] border border-gold-300/20 bg-black/20 shadow-2xl shadow-purple-950/40" />;
}
