/**
 * Agent registry.
 *
 * Every agent imports here and registers itself in the AGENTS map.
 * The conductor route does a runtime lookup by name. No dynamic
 * discovery, no filesystem scanning — additions are explicit, by
 * hand, in this file. That keeps the dispatch surface auditable.
 *
 * Type erasure: the map stores Agent<unknown, unknown> because each
 * agent has its own I/O types. The conductor accepts unknown input
 * from the network and forwards it to the named agent, which is
 * responsible for validating its own shape internally.
 */

import { composeAgent, shareArtefactsAgent } from './communication';
import { deepenAgent, reflectAgent } from './emotion';
import {
  archiveMomentAgent,
  recallMomentAgent,
  recallProfileAgent,
  rememberProfileAgent,
} from './memory';
import { planningAgent } from './planning';
import { surpriseAgent } from './surprise';
import type { Agent } from './types';

export const AGENT_NAMES = [
  // Emotion
  'reflect',
  'deepen',
  // Memory Archive
  'recall-profile',
  'remember-profile',
  'archive-moment',
  'recall-moment',
  // Communication
  'compose',
  'share-artefacts',
  // Planning
  'plan',
  // Surprise Script
  'surprise',
] as const;

export type AgentName = (typeof AGENT_NAMES)[number];

const AGENTS: Record<AgentName, Agent<unknown, unknown>> = {
  reflect: reflectAgent as unknown as Agent<unknown, unknown>,
  deepen: deepenAgent as unknown as Agent<unknown, unknown>,
  'recall-profile': recallProfileAgent as unknown as Agent<unknown, unknown>,
  'remember-profile': rememberProfileAgent as unknown as Agent<unknown, unknown>,
  'archive-moment': archiveMomentAgent as unknown as Agent<unknown, unknown>,
  'recall-moment': recallMomentAgent as unknown as Agent<unknown, unknown>,
  compose: composeAgent as unknown as Agent<unknown, unknown>,
  'share-artefacts': shareArtefactsAgent as unknown as Agent<unknown, unknown>,
  plan: planningAgent as unknown as Agent<unknown, unknown>,
  surprise: surpriseAgent as unknown as Agent<unknown, unknown>,
};

export function isAgentName(value: string): value is AgentName {
  return (AGENT_NAMES as readonly string[]).includes(value);
}

export function getAgent(name: string): Agent<unknown, unknown> | undefined {
  return isAgentName(name) ? AGENTS[name] : undefined;
}

// Re-export the agents themselves for direct imports in workflows.
export {
  reflectAgent,
  deepenAgent,
  recallProfileAgent,
  rememberProfileAgent,
  archiveMomentAgent,
  recallMomentAgent,
  composeAgent,
  shareArtefactsAgent,
  planningAgent,
  surpriseAgent,
};
