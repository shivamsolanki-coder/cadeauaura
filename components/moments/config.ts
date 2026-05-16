/**
 * The five emotional artefacts. Each one is an address, not a product.
 *
 * Positions are scene-space coordinates arranged in a gentle arc
 * across the camera's view. Captions are written in CadeauAura's
 * voice — italic, second-person, no clichés, no exclamation marks.
 *
 * When real GLTF assets land, swap the procedural object in
 * components/moments/objects.tsx for a <Gltf path="..." /> import.
 * Nothing else here changes.
 */

export type MomentKey =
  | 'velvet-box'
  | 'sealed-envelope'
  | 'memory-capsule'
  | 'gold-edge-card'
  | 'quiet-candle';

export interface MomentConfig {
  key: MomentKey;
  label: string;
  caption: string;
  ctaHref: string;
  ctaLabel: string;
  position: [number, number, number];
}

export const MOMENTS: readonly MomentConfig[] = [
  {
    key: 'velvet-box',
    label: 'Velvet keepsake',
    caption:
      'For the year you almost lost, and the one who carried you through it.',
    ctaHref: '/create',
    ctaLabel: 'Begin',
    position: [-2.7, 0.1, 0],
  },
  {
    key: 'sealed-envelope',
    label: 'Sealed envelope',
    caption: 'For the words you have been waiting to send.',
    ctaHref: '/create',
    ctaLabel: 'Begin',
    position: [-1.35, 0.4, 0.5],
  },
  {
    key: 'memory-capsule',
    label: 'Glass memory',
    caption: 'For the time you have not closed.',
    ctaHref: '/create',
    ctaLabel: 'Begin',
    position: [0, -0.1, 0.9],
  },
  {
    key: 'gold-edge-card',
    label: 'Gold-edged card',
    caption: 'For the one who has held you through every quiet hour.',
    ctaHref: '/create',
    ctaLabel: 'Begin',
    position: [1.35, 0.4, 0.5],
  },
  {
    key: 'quiet-candle',
    label: 'A quiet flame',
    caption: 'For someone you have already said goodbye to.',
    ctaHref: '/create',
    ctaLabel: 'Begin',
    position: [2.7, -0.05, 0],
  },
];

export const DEFAULT_MOMENT: MomentKey = 'memory-capsule';
