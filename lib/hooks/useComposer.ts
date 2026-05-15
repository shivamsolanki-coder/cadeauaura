'use client';

import { useCallback, useState } from 'react';

import { fetchComposerDrafts, type ComposerInput } from '@/lib/api/ai';

export interface UseComposerResult {
  drafts: string[];
  loading: boolean;
  trigger: (input: ComposerInput) => Promise<void>;
  dismiss: () => void;
  reset: () => void;
}

const MIN_TELLING_LENGTH = 10;

export function useComposer(): UseComposerResult {
  const [drafts, setDrafts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const trigger = useCallback(async (input: ComposerInput) => {
    if (
      input.recipientName.trim().length === 0 ||
      input.telling.trim().length < MIN_TELLING_LENGTH
    ) {
      return;
    }
    setLoading(true);
    try {
      const result = await fetchComposerDrafts(input);
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
  }, []);

  return { drafts, loading, trigger, dismiss, reset };
}
