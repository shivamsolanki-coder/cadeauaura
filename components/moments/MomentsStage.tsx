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
import { FocalEnvelope } from './objects';

/**
 * The Moments stage — hybrid composition.
 *
 *   Left  : a single 3D envelope, slowly rotating, its wax seal
 *           subtly responding to the active caption.
 *   Right : a typographic list of five emotional addresses. Hovering
 *           or tapping one shifts the envelope's seal and surfaces a
 *           single Begin link.
 *
 * The 3D is supporting, not headlining. The list is where the sender
 * actually reads.
 *
 * Mobile + prefers-reduced-motion: the WebGL Canvas never mounts.
 * The same five addresses appear as the MobileFallback list.
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

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.28} color="#FFF7EF" />
      {/* Key light — warm cream from upper-right */}
      <directionalLight position={[4, 3.5, 4]} intensity={0.7} color="#FFF7EF" />
      {/* Gold fill from upper-left */}
      <directionalLight position={[-3, 2, 2.5]} intensity={0.35} color="#F3C982" />
      {/* Warm rim from below — gives the envelope edge-light */}
      <pointLight
        position={[0, -2, 2]}
        color="#D7A25D"
        intensity={0.5}
        distance={6}
        decay={1.4}
      />
      {/* Soft rose top-glow — bridges the section back to the page palette */}
      <pointLight
        position={[0, 2.6, 1.4]}
        color="#8F1431"
        intensity={0.22}
        distance={5}
        decay={1.6}
      />
    </>
  );
}

interface CaptionListProps {
  active: MomentKey;
  onSelect: (key: MomentKey) => void;
  activeMoment: MomentConfig;
}

function CaptionList({ active, onSelect, activeMoment }: CaptionListProps) {
  return (
    <div className="flex flex-col gap-1">
      <ul className="space-y-1">
        {MOMENTS.map((moment) => {
          const isActive = moment.key === active;
          return (
            <li key={moment.key}>
              <button
                type="button"
                onMouseEnter={() => onSelect(moment.key)}
                onFocus={() => onSelect(moment.key)}
                onClick={() => onSelect(moment.key)}
                aria-pressed={isActive}
                className={`group block w-full border-l py-3 pl-5 text-left transition ${
                  isActive
                    ? 'border-gold-300/55'
                    : 'border-gold-300/12 hover:border-gold-300/35'
                }`}
              >
                <span
                  className={`block text-[0.6rem] font-light uppercase tracking-[0.32em] transition ${
                    isActive ? 'text-gold-300/85' : 'text-cream-50/50'
                  }`}
                >
                  {moment.label}
                </span>
                <span
                  className={`mt-1.5 block font-display text-base italic leading-7 transition sm:text-lg ${
                    isActive ? 'text-cream-50/90' : 'text-cream-50/60'
                  }`}
                >
                  {moment.caption}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 pl-5">
        <Link
          href={activeMoment.ctaHref}
          className="group inline-flex items-center gap-2 rounded-full border border-cream-50/20 px-6 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-cream-50/80 transition hover:border-cream-50/45 hover:text-cream-50"
        >
          <span>{activeMoment.ctaLabel} this moment</span>
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

export function MomentsStage() {
  const shouldFallback = useShouldFallback();
  const [active, setActive] = useState<MomentKey>(DEFAULT_MOMENT);
  const [dpr, setDpr] = useState(1.5);

  const activeMoment = MOMENTS.find((m) => m.key === active) ?? MOMENTS[0];

  if (shouldFallback) {
    return <MobileFallback />;
  }

  return (
    <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
      {/* 3D canvas — wider column for visual weight */}
      <div className="md:col-span-7">
        <div className="relative h-[64svh] min-h-[440px] w-full">
          <Canvas
            camera={{ position: [0, 0.25, 4.6], fov: 32 }}
            dpr={dpr}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            shadows={false}
          >
            <PerformanceMonitor
              onDecline={() => setDpr(1)}
              onIncline={() => setDpr(1.5)}
            />
            <SceneLighting />
            <FocalEnvelope
              sealColor={activeMoment.sealColor}
              sealGlow={activeMoment.sealGlow}
            />
            <Preload all />
          </Canvas>
        </div>
      </div>

      {/* Typographic list */}
      <div className="md:col-span-5">
        <CaptionList
          active={active}
          onSelect={setActive}
          activeMoment={activeMoment}
        />
      </div>
    </div>
  );
}
