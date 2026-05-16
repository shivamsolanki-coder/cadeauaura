'use client';

import { useCallback, useState } from 'react';

import { fetchComposerDrafts, type ComposerInput } from '@/lib/api/ai';

/**
 * Hard cap on regenerates per session. After this many attempts the
 * sender is almost certainly hunting variety the prompt can't give
 * them — better to nudge them back to writing their own.
 */
const MAX_COMPOSER_ATTEMPTS = 5;

/** Caller-side shape: tone + name + telling + anchors. The hook adds attempt. */
export type ComposerTriggerInput = Omit<ComposerInput, 'attempt'>;

export interface UseComposerResult {
  drafts: string[];
  loading: boolean;
  attempts: number;
  canRetry: boolean;
  trigger: (input: ComposerTriggerInput) => Promise<void>;
  dismiss: () => void;
  reset: () => void;
}

const MIN_TELLING_LENGTH = 10;

export function useComposer(): UseComposerResult {
  const [drafts, setDrafts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const trigger = useCallback(async (input: ComposerTriggerInput) => {
    if (
      input.recipientName.trim().length === 0 ||
      input.telling.trim().length < MIN_TELLING_LENGTH
    ) {
      return;
    }
    // Increment optimistically so retries past the cap are silently no-ops.
    let attemptNumber = 0;
    setAttempts((current) => {
      if (current >= MAX_COMPOSER_ATTEMPTS) {
        attemptNumber = current;
        return current;
      }
      attemptNumber = current;
      return current + 1;
    });
    if (attemptNumber >= MAX_COMPOSER_ATTEMPTS) return;

    setLoading(true);
    try {
      const result = await fetchComposerDrafts({
        ...input,
        attempt: attemptNumber,
      });
      setDrafts(result);
    } catch {
      setDrafts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const dismiss = useCallback(() => {
    setDrafts([]);
  }, []);

  const reset = useCallback(() => {
    setDrafts([]);
    setAttempts(0);
  }, []);

  return {
    drafts,
    loading,
    attempts,
    canRetry: attempts < MAX_COMPOSER_ATTEMPTS,
    trigger,
    dismiss,
    reset,
  };
}
