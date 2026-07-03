import Link from 'next/link';

import { BeatRenderer } from '@/components/reveal/BeatRenderer';
import { recallMomentAgent } from '@/lib/agents/memory';
import { surpriseAgent } from '@/lib/agents/surprise';
import type { BeatSequence } from '@/lib/domain/beats';
import { CHOREOGRAPHY_VERSION, isValidMomentId, type Moment } from '@/lib/moment';

// Server-side default runtime (Node). The agent-driven render pulls
// in lib/agents/* which transitively imports the Anthropic SDK and
// pushes the edge bundle over Vercel's 1 MB Hobby limit; the Node
// serverless runtime has a 50 MB cap and no behaviour difference for
// this page.

/**
 * Recipient reveal page.
 *
 * Server-rendered: fetches the moment via the Memory Archive Agent
 * and builds the beat sequence via the Surprise Script Agent. The
 * interactive state machine (sealed → opening → open) lives in the
 * BeatRenderer client component.
 *
 * Fallback: if Surprise Script fails to return a sequence (shouldn't
 * happen — it's deterministic), the page renders a default v1
 * sequence so the moment never breaks.
 */

const DEFAULT_FALLBACK_SEQUENCE: BeatSequence = {
  beats: [
    {
      type: 'envelope',
      text: 'Something is waiting for you',
      durationMs: 1000,
      ctaLabel: 'Open the moment',
    },
    { type: 'reveal', durationMs: 1400 },
    { type: 'sign-off', text: 'Made for you, with care.' },
  ],
  choreographyVersion: CHOREOGRAPHY_VERSION,
};

async function loadMoment(id: string): Promise<Moment | null> {
  if (!isValidMomentId(id)) return null;
  const result = await recallMomentAgent.run({ id });
  return result.ok ? result.data.moment : null;
}

async function loadSequence(moment: Moment): Promise<BeatSequence> {
  const result = await surpriseAgent.run({
    message: moment.message,
    tone: moment.tone,
    plan: null,
  });
  return result.ok ? result.data.sequence : DEFAULT_FALLBACK_SEQUENCE;
}

export default async function MomentRevealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const moment = await loadMoment(id);

  if (!moment) {
    return (
      <main className="flex min-h-[88svh] items-center justify-center bg-ink-950 px-6 text-cream-50">
        <div className="max-w-md text-center">
          <p className="text-xs font-light uppercase tracking-[0.32em] text-gold-300/70">
            Nothing here
          </p>
          <h1 className="mt-4 font-display text-3xl text-cream-50">
            There is nothing waiting at this address.
          </h1>
          <p className="mt-4 text-sm leading-7 text-cream-50/60">
            It may have already been read, or the link may have changed.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-cream-50/20 px-7 py-4 text-sm font-light text-cream-50/80 transition hover:border-cream-50/45 hover:text-cream-50"
          >
            Return to CadeauAura
          </Link>
        </div>
      </main>
    );
  }

  const sequence = await loadSequence(moment);
  const message =
    moment.message.trim().length > 0
      ? moment.message
      : `A moment, for ${moment.recipientDisplayName}.`;

  return (
    <main className="relative min-h-[88svh] overflow-hidden bg-ink-950 px-6 py-16 text-cream-50 sm:px-10 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(215,162,93,0.10),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(143,20,49,0.20),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-xl">
        <h1 className="sr-only">
          A moment for {moment.recipientDisplayName}
        </h1>
        <BeatRenderer
          sequence={sequence}
          recipientName={moment.recipientDisplayName}
          message={message}
          emotion={moment.emotion}
        />
      </div>
    </main>
  );
}
