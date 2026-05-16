'use client';

import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import type { Group } from 'three';

/**
 * Shared motion for every artefact.
 *
 *   - useFrame applies a slow continuous Y-rotation. Active objects
 *     rotate ~4× faster than idle, just enough that the eye registers
 *     attention without the object feeling busy.
 *   - useEffect runs a GSAP tween on scale + a slight forward tilt
 *     when the active flag flips. This is what makes hover feel like
 *     "the object listens" rather than a snap.
 *
 * Both motions are mild on purpose. The brand language is restraint;
 * any motion that drew attention to itself would break it.
 */
export function useObjectMotion(active: boolean) {
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += active ? 0.0045 : 0.0011;
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    gsap.to(node.scale, {
      x: active ? 1.08 : 1,
      y: active ? 1.08 : 1,
      z: active ? 1.08 : 1,
      duration: 1.0,
      ease: 'power2.out',
      overwrite: true,
    });

    gsap.to(node.rotation, {
      x: active ? -0.12 : 0,
      duration: 1.2,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    return () => {
      gsap.killTweensOf(node.scale);
      gsap.killTweensOf(node.rotation);
    };
  }, [active]);

  return ref;
}
