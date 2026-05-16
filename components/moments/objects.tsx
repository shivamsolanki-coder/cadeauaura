'use client';

import { Float } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';

import type { MomentConfig } from './config';
import { useObjectMotion } from './useObjectMotion';

/**
 * Procedural artefacts built from primitives. Materials are tuned for
 * the CadeauAura palette — deep wine, warm gold, cream paper, soft
 * rose under-glow.
 *
 * Each artefact is wrapped in <Float> with its own gentle rhythm so
 * the five objects breathe out of phase. The shared useObjectMotion
 * hook adds the active-state tilt + scale tween.
 *
 * Replacing any artefact with a real GLTF later is a one-line swap:
 *   <primitive object={useGLTF('/models/velvet-box.glb').scene} />
 */

interface ObjectProps {
  config: MomentConfig;
  active: boolean;
  onPointerOver: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (event: ThreeEvent<PointerEvent>) => void;
  onClick: (event: ThreeEvent<MouseEvent>) => void;
}

const FLOAT_BASE = {
  speed: 0.7,
  rotationIntensity: 0.06,
  floatIntensity: 0.32,
};

// ── Velvet keepsake box ────────────────────────────────────────────
export function VelvetBox(props: ObjectProps) {
  const ref = useObjectMotion(props.active);
  const lid = props.active ? '#8F1431' : '#5A0B18';
  const body = props.active ? '#7E102C' : '#4A0716';
  const goldEmissive = props.active ? 0.28 : 0.06;

  return (
    <Float {...FLOAT_BASE}>
      <group
        ref={ref}
        position={props.config.position}
        onPointerOver={props.onPointerOver}
        onPointerOut={props.onPointerOut}
        onClick={props.onClick}
      >
        <mesh castShadow={false} receiveShadow={false}>
          <boxGeometry args={[1.15, 0.32, 0.72]} />
          <meshStandardMaterial color={body} roughness={0.95} metalness={0.02} />
        </mesh>
        <mesh position={[0, 0.19, 0]}>
          <boxGeometry args={[1.18, 0.06, 0.74]} />
          <meshStandardMaterial color={lid} roughness={0.92} metalness={0.02} />
        </mesh>
        <mesh position={[0, 0.19, 0.385]}>
          <boxGeometry args={[1.18, 0.04, 0.006]} />
          <meshStandardMaterial
            color="#D7A25D"
            roughness={0.3}
            metalness={0.85}
            emissive="#F3C982"
            emissiveIntensity={goldEmissive}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ── Sealed envelope ────────────────────────────────────────────────
export function SealedEnvelope(props: ObjectProps) {
  const ref = useObjectMotion(props.active);
  const sealEmissive = props.active ? 0.18 : 0.04;

  return (
    <Float {...FLOAT_BASE} speed={0.8}>
      <group
        ref={ref}
        position={props.config.position}
        rotation={[0, 0.18, 0]}
        onPointerOver={props.onPointerOver}
        onPointerOut={props.onPointerOut}
        onClick={props.onClick}
      >
        <mesh>
          <boxGeometry args={[1.1, 0.72, 0.025]} />
          <meshStandardMaterial color="#FFF7EF" roughness={0.78} metalness={0} />
        </mesh>
        <mesh position={[0, 0.1, 0.015]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.55, 0.55, 0.006]} />
          <meshStandardMaterial color="#F8EADF" roughness={0.8} metalness={0} />
        </mesh>
        <mesh position={[0, -0.04, 0.03]}>
          <cylinderGeometry args={[0.08, 0.08, 0.018, 36]} />
          <meshStandardMaterial
            color="#8F1431"
            roughness={0.55}
            metalness={0.08}
            emissive="#8F1431"
            emissiveIntensity={sealEmissive}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ── Glass memory capsule ───────────────────────────────────────────
export function MemoryCapsule(props: ObjectProps) {
  const ref = useObjectMotion(props.active);

  return (
    <Float {...FLOAT_BASE} speed={0.6} floatIntensity={0.42}>
      <group
        ref={ref}
        position={props.config.position}
        onPointerOver={props.onPointerOver}
        onPointerOut={props.onPointerOut}
        onClick={props.onClick}
      >
        <mesh>
          <capsuleGeometry args={[0.28, 0.44, 16, 32]} />
          <meshPhysicalMaterial
            transmission={0.92}
            thickness={0.6}
            roughness={0.06}
            ior={1.45}
            color="#FFF7EF"
            attenuationColor="#F3C982"
            attenuationDistance={2.2}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.04, 32]} />
          <meshStandardMaterial
            color="#D7A25D"
            roughness={0.32}
            metalness={0.85}
            emissive="#F3C982"
            emissiveIntensity={props.active ? 0.2 : 0.05}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ── Gold-edged card ────────────────────────────────────────────────
export function GoldEdgeCard(props: ObjectProps) {
  const ref = useObjectMotion(props.active);
  const goldEmissive = props.active ? 0.22 : 0.05;
  const goldMaterialProps = {
    color: '#D7A25D',
    roughness: 0.3,
    metalness: 0.85,
    emissive: '#F3C982',
    emissiveIntensity: goldEmissive,
  } as const;

  return (
    <Float {...FLOAT_BASE} speed={0.75}>
      <group
        ref={ref}
        position={props.config.position}
        rotation={[0, -0.22, 0]}
        onPointerOver={props.onPointerOver}
        onPointerOut={props.onPointerOut}
        onClick={props.onClick}
      >
        <mesh>
          <boxGeometry args={[0.78, 1.1, 0.022]} />
          <meshStandardMaterial color="#FFF7EF" roughness={0.74} metalness={0} />
        </mesh>
        <mesh position={[0, 0.54, 0.014]}>
          <boxGeometry args={[0.78, 0.012, 0.005]} />
          <meshStandardMaterial {...goldMaterialProps} />
        </mesh>
        <mesh position={[0, -0.54, 0.014]}>
          <boxGeometry args={[0.78, 0.012, 0.005]} />
          <meshStandardMaterial {...goldMaterialProps} />
        </mesh>
        <mesh position={[-0.385, 0, 0.014]}>
          <boxGeometry args={[0.012, 1.1, 0.005]} />
          <meshStandardMaterial {...goldMaterialProps} />
        </mesh>
        <mesh position={[0.385, 0, 0.014]}>
          <boxGeometry args={[0.012, 1.1, 0.005]} />
          <meshStandardMaterial {...goldMaterialProps} />
        </mesh>
      </group>
    </Float>
  );
}

// ── Quiet flame ────────────────────────────────────────────────────
export function QuietCandle(props: ObjectProps) {
  const ref = useObjectMotion(props.active);
  const flameIntensity = props.active ? 1.4 : 1.0;
  const lightIntensity = props.active ? 0.8 : 0.4;

  return (
    <Float speed={0.45} rotationIntensity={0.02} floatIntensity={0.18}>
      <group
        ref={ref}
        position={props.config.position}
        onPointerOver={props.onPointerOver}
        onPointerOut={props.onPointerOut}
        onClick={props.onClick}
      >
        <mesh position={[0, -0.36, 0]}>
          <cylinderGeometry args={[0.32, 0.34, 0.08, 36]} />
          <meshStandardMaterial color="#F8EADF" roughness={0.85} metalness={0} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.18, 0.2, 0.66, 36]} />
          <meshStandardMaterial color="#FFF7EF" roughness={0.7} metalness={0} />
        </mesh>
        <mesh position={[0, 0.36, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.04, 8]} />
          <meshStandardMaterial color="#160606" roughness={1} metalness={0} />
        </mesh>
        <mesh position={[0, 0.43, 0]} scale={[1, 1.4, 1]}>
          <sphereGeometry args={[0.05, 24, 24]} />
          <meshStandardMaterial
            color="#F3C982"
            emissive="#D7A25D"
            emissiveIntensity={flameIntensity}
            roughness={0.2}
            metalness={0}
            transparent
            opacity={0.94}
          />
        </mesh>
        <pointLight
          position={[0, 0.42, 0]}
          color="#D7A25D"
          intensity={lightIntensity}
          distance={1.8}
          decay={1.6}
        />
      </group>
    </Float>
  );
}
