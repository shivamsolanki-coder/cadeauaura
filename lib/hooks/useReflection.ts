'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchReflection } from '@/lib/api/ai';

const TYPEWRITER_CPS = 27;
const MAX_ATTEMPTS = 5;
const DEBOUNCE_MS = 600;
const MIN_TELLING_LENGTH = 3;

export interface UseReflectionResult {
  fullText: string;
  displayedText: string;
  loading: boolean;
  done: boolean;
  attemptCount: number;
  maxAttemptsReached: boolean;
  tryAgain: () => void;
}

/**
 * Owns the Reflector beat:
 *
 *   - debounces telling changes (600 ms)
 *   - calls /api/reflect once the telling settles
 *   - runs a client-side typewriter so the sender sees the sentence
 *     unfold rather than appear all at once
 *   - exposes a Try Again handler that re-fetches with an attempt
 *     counter so the server can vary
 *
 * `enabled` should mirror the page's hydration flag — pass false on
 * the first render so we do not try to read from a not-yet-loaded
 * draft.
 */
export function useReflection(
  telling: string,
  enabled: boolean,
): UseReflectionResult {
  const [fullText, setFullText] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typewriterRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  const trigger = useCallback(async (text: string, attempt: number) => {
    if (text.trim().length < MIN_TELLING_LENGTH) return;
    setLoading(true);
    setFullText('');
    try {
      const result = await fetchReflection(text.trim(), attempt);
      setFullText(result);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (telling.trim().length < MIN_TELLING_LENGTH) {
      setFullText('');
      setDisplayedText('');
      return;
    }

    debounceRef.current = setTimeout(() => {
      setAttemptCount(0);
      void trigger(telling, 0);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [telling, enabled, trigger]);

  useEffect(() => {
    if (!fullText) {
      setDisplayedText('');
      return;
    }
    setDisplayedText('');
    indexRef.current = 0;
    if (typewriterRef.current) clearInterval(typewriterRef.current);

    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayedText(fullText.slice(0, indexRef.current));
      if (indexRef.current >= fullText.length) {
        clearInterval(interval);
        typewriterRef.current = null;
      }
    }, Math.round(1000 / TYPEWRITER_CPS));

    typewriterRef.current = interval;
    return () => clearInterval(interval);
  }, [fullText]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (typewriterRef.current) clearInterval(typewriterRef.current);
    };
  }, []);

  const tryAgain = useCallback(() => {
    const next = Math.min(attemptCount + 1, MAX_ATTEMPTS);
    setAttemptCount(next);
    void trigger(telling, next);
  }, [attemptCount, telling, trigger]);

  const done = displayedText === fullText && fullText.length > 0;
  const maxAttemptsReached = attemptCount >= MAX_ATTEMPTS;

  return {
    fullText,
    displayedText,
    loading,
    done,
    attemptCount,
    maxAttemptsReached,
    tryAgain,
  };
}
