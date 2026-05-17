/**
 * The five emotional addresses CadeauAura speaks to.
 *
 * After the Moments section was reduced to a single focal artefact —
 * a sealed envelope — the five entries here serve as a typographic
 * list beside the 3D scene. Each one corresponds to a wax-seal
 * accent colour so the envelope quietly shifts its tone as the
 * sender moves between captions.
 *
 * Captions are written in CadeauAura's voice: italic, second-person,
 * no clichés, no exclamation marks. None of them sound like product
 * categories.
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
  /** Wax-seal base colour for the focal envelope when this moment is active. */
  sealColor: string;
  /** Gold rim emissive intensity for this moment. Subtle differentiation. */
  sealGlow: number;
}

export const MOMENTS: readonly MomentConfig[] = [
  {
    key: 'velvet-box',
    label: 'A keepsake',
    caption:
      'For the year you almost lost, and the one who carried you through it.',
    ctaHref: '/create',
    ctaLabel: 'Begin',
    sealColor: '#7E102C',
    sealGlow: 0.22,
  },
  {
    key: 'sealed-envelope',
    label: 'A letter, in waiting',
    caption: 'For the words you have been waiting to send.',
    ctaHref: '/create',
    ctaLabel: 'Begin',
    sealColor: '#8F1431',
    sealGlow: 0.28,
  },
  {
    key: 'memory-capsule',
    label: 'A small remembrance',
    caption: 'For the time you have not closed.',
    ctaHref: '/create',
    ctaLabel: 'Begin',
    sealColor: '#A03A55',
    sealGlow: 0.18,
  },
  {
    key: 'gold-edge-card',
    label: 'A quiet thanks',
    caption: 'For the one who has held you through every quiet hour.',
    ctaHref: '/create',
    ctaLabel: 'Begin',
    sealColor: '#B26B3C',
    sealGlow: 0.32,
  },
  {
    key: 'quiet-candle',
    label: 'For someone gone',
    caption: 'For someone you have already said goodbye to.',
    ctaHref: '/create',
    ctaLabel: 'Begin',
    sealColor: '#5A0B18',
    sealGlow: 0.14,
  },
];

export const DEFAULT_MOMENT: MomentKey = 'sealed-envelope';
