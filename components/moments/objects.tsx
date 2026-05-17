'use client';

import { Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useMemo, useRef } from 'react';
import {
  DoubleSide,
  type Group,
  type MeshStandardMaterial,
  Shape,
  ShapeGeometry,
} from 'three';

/**
 * FocalEnvelope — the single 3D artefact at the centre of the Moments
 * section.
 *
 * Built from simple primitives so the silhouette reads cleanly at any
 * viewport size and the bundle stays small. The wax seal's colour and
 * gold-rim emissive intensity are driven by props, so the typographic
 * list beside the canvas can shift the envelope's tone as the sender
 * moves between captions.
 *
 * GSAP eases the seal colour and intensity changes — no snap, just a
 * quiet settling. Rotation is always slow; this is the focal piece,
 * not five floating distractions, so the eye should rest on it.
 *
 * To swap this for a real Blender asset later, replace the primitives
 * below with:
 *   const { scene } = useGLTF('/models/envelope.glb');
 *   return <primitive object={scene} />;
 * Keep the seal material exposed so the colour-shift effect still
 * works on the GLTF version.
 */

interface FocalEnvelopeProps {
  sealColor: string;
  sealGlow: number;
}

export function FocalEnvelope({ sealColor, sealGlow }: FocalEnvelopeProps) {
  const groupRef = useRef<Group>(null);
  const sealRef = useRef<MeshStandardMaterial>(null);
  const goldRef = useRef<MeshStandardMaterial>(null);

  // Pentagonal flap geometry, built once.
  const flapGeometry = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(-0.72, 0);
    shape.lineTo(0.72, 0);
    shape.lineTo(0, 0.46);
    shape.closePath();
    return new ShapeGeometry(shape);
  }, []);

  // Always-on slow Y rotation. The focal piece breathes; it does not perform.
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
  });

  // GSAP-tween wax seal colour + gold rim emissive intensity when the
  // active caption changes. Subtle settle, not a flash.
  useEffect(() => {
    if (sealRef.current) {
      gsap.to(sealRef.current.color, {
        r: parseInt(sealColor.slice(1, 3), 16) / 255,
        g: parseInt(sealColor.slice(3, 5), 16) / 255,
        b: parseInt(sealColor.slice(5, 7), 16) / 255,
        duration: 1.4,
        ease: 'power2.out',
        overwrite: true,
      });
    }
    if (goldRef.current) {
      gsap.to(goldRef.current, {
        emissiveIntensity: sealGlow,
        duration: 1.4,
        ease: 'power2.out',
        overwrite: true,
      });
    }
  }, [sealColor, sealGlow]);

  return (
    <Float speed={0.5} rotationIntensity={0.06} floatIntensity={0.32}>
      <group
        ref={groupRef}
        // Slight tilt toward camera for a cinematic three-quarter angle.
        rotation={[-0.18, 0.4, 0]}
        scale={1.05}
      >
        {/* Envelope body — slightly heavy paper. */}
        <mesh>
          <boxGeometry args={[1.5, 0.95, 0.03]} />
          <meshStandardMaterial color="#FFF7EF" roughness={0.78} metalness={0} />
        </mesh>

        {/* Inner shadow strip across the seam — subtle but adds depth. */}
        <mesh position={[0, 0.04, 0.018]}>
          <boxGeometry args={[1.5, 0.012, 0.001]} />
          <meshStandardMaterial color="#E6D5C2" roughness={0.9} metalness={0} />
        </mesh>

        {/* Flap — a real triangle, not a rotated square. */}
        <mesh position={[0, 0.04, 0.022]} geometry={flapGeometry}>
          <meshStandardMaterial
            color="#F8EADF"
            roughness={0.82}
            metalness={0}
            side={DoubleSide}
          />
        </mesh>

        {/* Wax seal — slightly raised, gold-rimmed. */}
        <mesh position={[0, -0.05, 0.045]}>
          <cylinderGeometry args={[0.12, 0.12, 0.022, 48]} />
          <meshStandardMaterial
            ref={sealRef}
            color={sealColor}
            roughness={0.5}
            metalness={0.05}
            emissive={sealColor}
            emissiveIntensity={0.08}
          />
        </mesh>

        {/* Tiny gold ring around the seal — premium touch. */}
        <mesh position={[0, -0.05, 0.057]}>
          <cylinderGeometry args={[0.125, 0.125, 0.003, 48]} />
          <meshStandardMaterial
            ref={goldRef}
            color="#D7A25D"
            roughness={0.28}
            metalness={0.88}
            emissive="#F3C982"
            emissiveIntensity={sealGlow}
          />
        </mesh>

        {/* Tiny gold sigil inside the seal — a single mark. */}
        <mesh position={[0, -0.05, 0.058]}>
          <ringGeometry args={[0.025, 0.035, 32]} />
          <meshStandardMaterial
            color="#D7A25D"
            roughness={0.32}
            metalness={0.85}
            emissive="#F3C982"
            emissiveIntensity={Math.min(sealGlow + 0.1, 0.4)}
            side={DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}
