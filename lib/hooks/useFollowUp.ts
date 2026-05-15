'use client';

import { useEffect, useRef, useState } from 'react';

import { fetchFollowUp } from '@/lib/api/ai';
import type { Tone } from '@/lib/draft';

const TYPEWRITER_CPS = 27;
const POST_REFLECTION_DELAY_MS = 700;
const MIN_TELLING_LENGTH = 3;

export interface UseFollowUpInput {
  telling: string;
  reflection: string;
  reflectionDone: boolean;
}

export interface UseFollowUpResult {
  fullText: string;
  displayedText: string;
  loading: boolean;
  done: boolean;
  anchors: string[];
  tone: Tone;
}

/**
 * Owns the post-Reflector beat:
 *
 *   - waits for the reflection typewriter to finish
 *   - pauses 700 ms so the two sentences feel like distinct breaths
 *   - calls /api/follow-up once per (telling, reflection) pair
 *   - runs its own typewriter on the returned sentence
 *   - surfaces anchors + tone so the parent can persist them to the
 *     draft (the parent owns the draft; this hook is a producer)
 *
 * The fetch key is internal — the same reflection will never trigger
 * a duplicate fetch even if the parent re-renders mid-flight.
 */
export function useFollowUp(input: UseFollowUpInput): UseFollowUpResult {
  const [fullText, setFullText] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [anchors, setAnchors] = useState<string[]>([]);
  const [tone, setTone] = useState<Tone>('');

  const typewriterRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);
  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fetchKeyRef = useRef('');

  // Fire the fetch when the reflection finishes typing. Keyed on
  // (telling, reflection) so we never trigger twice for the same one.
  useEffect(() => {
    if (!input.reflection) {
      setFullText('');
      setDisplayedText('');
      setAnchors([]);
      setTone('');
      fetchKeyRef.current = '';
      if (delayRef.current) {
        clearTimeout(delayRef.current);
        delayRef.current = null;
      }
      return;
    }

    if (!input.reflectionDone) return;

    const key = `${input.telling.trim()}::${input.reflection}`;
    if (fetchKeyRef.current === key) return;
    fetchKeyRef.current = key;

    if (delayRef.current) clearTimeout(delayRef.current);
    delayRef.current = setTimeout(async () => {
      const trimmed = input.telling.trim();
      if (trimmed.length < MIN_TELLING_LENGTH) return;
      setLoading(true);
      setFullText('');
      try {
        const result = await fetchFollowUp(trimmed, input.reflection);
        setFullText(result.followUp);
        setAnchors(result.anchors);
        setTone(result.tone);
      } catch {
        // The follow-up is optional — failing silently keeps the page calm.
      } finally {
        setLoading(false);
      }
    }, POST_REFLECTION_DELAY_MS);

    return () => {
      if (delayRef.current) clearTimeout(delayRef.current);
    };
  }, [input.telling, input.reflection, input.reflectionDone]);

  // Typewriter playback.
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

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (delayRef.current) clearTimeout(delayRef.current);
      if (typewriterRef.current) clearInterval(typewriterRef.current);
    };
  }, []);

  const done = displayedText === fullText && fullText.length > 0;

  return {
    fullText,
    displayedText,
    loading,
    done,
    anchors,
    tone,
  };
}
