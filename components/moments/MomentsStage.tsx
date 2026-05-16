'use client';

import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, Preload } from '@react-three/drei';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  DEFAULT_MOMENT,
  MOMENTS,
  type MomentConfig,
  type MomentKey,
} from './config';
import { MobileFallback } from './MobileFallback';
import {
  GoldEdgeCard,
  MemoryCapsule,
  QuietCandle,
  SealedEnvelope,
  VelvetBox,
} from './objects';

/**
 * The 3D stage. Holds a single Canvas with five floating artefacts,
 * the lighting rig, and the typographic caption that responds to
 * pointer activity.
 *
 * Mobile + prefers-reduced-motion: render the typographic
 * MobileFallback instead. The WebGL libs are still in the lazy
 * chunk, but no Canvas mounts.
 *
 * dpr is clamped via PerformanceMonitor so the scene quietly drops to
 * 1× pixel density if the frame rate sags.
 */

function useShouldFallback(): boolean {
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const check = () => {
      const narrow = window.innerWidth < 768;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setFallback(narrow || reduced);
    };
    check();
    window.addEventListener('resize', check);
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    mql.addEventListener('change', check);
    return () => {
      window.removeEventListener('resize', check);
      mql.removeEventListener('change', check);
    };
  }, []);

  return fallback;
}

interface ObjectsProps {
  active: MomentKey;
  onHover: (key: MomentKey) => void;
  onSelect: (key: MomentKey) => void;
}

function Objects({ active, onHover, onSelect }: ObjectsProps) {
  return (
    <>
      {MOMENTS.map((moment) => {
        const props = {
          config: moment,
          active: active === moment.key,
          onPointerOver: () => onHover(moment.key),
          onPointerOut: () => {
            /* leave selection in place; pointer-out should not jitter the caption */
          },
          onClick: () => onSelect(moment.key),
        };
        switch (moment.key) {
          case 'velvet-box':
            return <VelvetBox key={moment.key} {...props} />;
          case 'sealed-envelope':
            return <SealedEnvelope key={moment.key} {...props} />;
          case 'memory-capsule':
            return <MemoryCapsule key={moment.key} {...props} />;
          case 'gold-edge-card':
            return <GoldEdgeCard key={moment.key} {...props} />;
          case 'quiet-candle':
            return <QuietCandle key={moment.key} {...props} />;
        }
      })}
    </>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.22} color="#FFF7EF" />
      <directionalLight position={[3, 4, 3]} intensity={0.55} color="#FFF7EF" />
      <directionalLight position={[-3, 1.2, 2]} intensity={0.22} color="#F3C982" />
      <pointLight
        position={[0, -1.4, 2]}
        color="#D7A25D"
        intensity={0.5}
        distance={6}
        decay={1.4}
      />
      <pointLight
        position={[0, 2.2, 1.6]}
        color="#8F1431"
        intensity={0.18}
        distance={5}
        decay={1.6}
      />
    </>
  );
}

interface CaptionProps {
  moment: MomentConfig;
}

function Caption({ moment }: CaptionProps) {
  return (
    <div key={moment.key} className="mx-auto mt-10 max-w-2xl text-center aura-fade-up">
      <p className="text-[0.6rem] font-light uppercase tracking-[0.32em] text-cream-50/40">
        {moment.label}
      </p>
      <p className="mx-auto mt-4 font-display text-lg italic font-light leading-relaxed text-cream-50/85 sm:text-xl md:text-2xl">
        {moment.caption}
      </p>
      <Link
        href={moment.ctaHref}
        className="group mt-8 inline-flex items-center gap-2 rounded-full border border-cream-50/20 px-6 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-cream-50/75 transition hover:border-cream-50/45 hover:text-cream-50"
      >
        <span>{moment.ctaLabel}</span>
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </div>
  );
}

export function MomentsStage() {
  const shouldFallback = useShouldFallback();
  const [active, setActive] = useState<MomentKey>(DEFAULT_MOMENT);
  const [dpr, setDpr] = useState(1.5);

  const activeMoment =
    MOMENTS.find((m) => m.key === active) ?? MOMENTS[0];

  if (shouldFallback) {
    return <MobileFallback />;
  }

  return (
    <div>
      <div
        className="relative h-[60svh] min-h-[420px] w-full"
        aria-label="Five emotional artefacts"
        role="group"
      >
        <Canvas
          camera={{ position: [0, 0.4, 6.2], fov: 34 }}
          dpr={dpr}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          shadows={false}
        >
          <PerformanceMonitor
            onDecline={() => setDpr(1)}
            onIncline={() => setDpr(1.5)}
          />
          <SceneLighting />
          <Objects active={active} onHover={setActive} onSelect={setActive} />
          <Preload all />
        </Canvas>
      </div>

      <Caption moment={activeMoment} />
    </div>
  );
}
