/**
 * Lightweight evaluation harness.
 *
 *   npm run eval
 *
 * Runs the deterministic fallback paths of every agent against a
 * JSON corpus and asserts shape, tone classification, restraint
 * compliance, sentence/word counts, plan structure, and beat
 * sequence sanity. No model tokens are spent — the goal is to catch
 * prompt + restraint + heuristic regressions before they ship.
 *
 * Exits non-zero on any failure so this can hook into CI later.
 */

import { readFileSync } from 'node:fs';

import { composeAgent } from '@/lib/agents/communication';
import { deepenAgent, reflectAgent } from '@/lib/agents/emotion';
import { planningAgent } from '@/lib/agents/planning';
import { surpriseAgent } from '@/lib/agents/surprise';
import { passesRestraint, type RestraintProfile } from '@/lib/ai/restraint';
import { MOMENT_TYPES, type MomentType } from '@/lib/domain/plan';

interface DeepenCase {
  id: string;
  telling: string;
  expectedTone: string;
}

interface RestraintCase {
  id: string;
  text: string;
  profile: RestraintProfile;
  shouldPass: boolean;
}

interface PlanningCase {
  id: string;
  recipientName: string;
  tone: string;
  expectMomentType: MomentType[];
}

interface ComposeCase {
  id: string;
  recipientName: string;
  telling: string;
  tone: string;
  anchors: string[];
}

interface SurpriseCase {
  id: string;
  message: string;
  tone: string;
}

interface Corpus {
  version: number;
  deepenCases: DeepenCase[];
  restraintCases: RestraintCase[];
  planningCases: PlanningCase[];
  composeCases: ComposeCase[];
  surpriseCases: SurpriseCase[];
}

const corpusUrl = new URL('./corpus.json', import.meta.url);
const corpus = JSON.parse(readFileSync(corpusUrl, 'utf-8')) as Corpus;

let passed = 0;
let failed = 0;

function report(suite: string, id: string, issues: string[], extra?: string): void {
  if (issues.length === 0) {
    console.log(`  ✓ ${suite}/${id}${extra ? ` — ${extra}` : ''}`);
    passed += 1;
  } else {
    console.log(`  ✗ ${suite}/${id}${extra ? ` — ${extra}` : ''}`);
    for (const issue of issues) console.log(`      ${issue}`);
    failed += 1;
  }
}

async function runDeepenCases() {
  console.log('\nDeepen — tone classification + shape:');
  for (const c of corpus.deepenCases) {
    const issues: string[] = [];
    const result = await deepenAgent.run({ telling: c.telling });

    if (!result.ok) {
      issues.push(`agent failed: ${result.reason}`);
      report('deepen', c.id, issues);
      continue;
    }

    if (result.data.tone !== c.expectedTone) {
      issues.push(`tone: got "${result.data.tone}", expected "${c.expectedTone}"`);
    }
    if (!Array.isArray(result.data.anchors) || result.data.anchors.length < 1) {
      issues.push(`anchors empty`);
    }
    const followUpCheck = passesRestraint(result.data.followUp, 'reflector');
    if (!followUpCheck.ok) {
      issues.push(`followUp restraint: ${followUpCheck.reason}`);
    }

    report(
      'deepen',
      c.id,
      issues,
      `tone=${result.data.tone}, anchors=[${result.data.anchors.join(', ')}]`,
    );
  }
}

async function runReflectCases() {
  console.log('\nReflect — single-sentence + restraint:');
  for (const c of corpus.deepenCases) {
    const issues: string[] = [];
    const result = await reflectAgent.run({ telling: c.telling });

    if (!result.ok) {
      issues.push(`agent failed: ${result.reason}`);
      report('reflect', c.id, issues);
      continue;
    }
    const check = passesRestraint(result.data.text, 'reflector');
    if (!check.ok) {
      issues.push(`restraint: ${check.reason}`);
    }
    if (result.data.text.length < 8) {
      issues.push('text too short');
    }
    report('reflect', c.id, issues, `"${result.data.text.slice(0, 60)}..."`);
  }
}

function runRestraintCases() {
  console.log('\nRestraint gate:');
  for (const c of corpus.restraintCases) {
    const issues: string[] = [];
    const r = passesRestraint(c.text, c.profile);
    const got = r.ok ? 'passed' : `blocked (${r.reason})`;
    if (r.ok !== c.shouldPass) {
      issues.push(`expected ${c.shouldPass ? 'pass' : 'block'}, got ${got}`);
    }
    report('restraint', c.id, issues, got);
  }
}

async function runPlanningCases() {
  console.log('\nPlanning — plan shape + momentType validity:');
  for (const c of corpus.planningCases) {
    const issues: string[] = [];
    const result = await planningAgent.run({
      recipientName: c.recipientName,
      tone: c.tone as Parameters<typeof planningAgent.run>[0]['tone'],
    });

    if (!result.ok) {
      issues.push(`agent failed: ${result.reason}`);
      report('plan', c.id, issues);
      continue;
    }
    const plan = result.data.plan;
    if (!MOMENT_TYPES.includes(plan.momentType)) {
      issues.push(`unknown momentType: ${plan.momentType}`);
    }
    if (!c.expectMomentType.includes(plan.momentType)) {
      issues.push(
        `momentType "${plan.momentType}" not in expected [${c.expectMomentType.join(', ')}]`,
      );
    }
    if (!plan.durationHint || plan.durationHint.length < 3) {
      issues.push('durationHint too short');
    }
    if (!Array.isArray(plan.keyBeats) || plan.keyBeats.length < 2) {
      issues.push('keyBeats too few');
    }
    for (const beat of plan.keyBeats) {
      const beatCheck = passesRestraint(beat, 'gift-direction');
      if (!beatCheck.ok) {
        issues.push(`beat restraint: "${beat}" — ${beatCheck.reason}`);
      }
    }
    report(
      'plan',
      c.id,
      issues,
      `momentType=${plan.momentType}, beats=${plan.keyBeats.length}`,
    );
  }
}

async function runComposeCases() {
  console.log('\nCompose — three drafts + restraint:');
  for (const c of corpus.composeCases) {
    const issues: string[] = [];
    const result = await composeAgent.run({
      recipientName: c.recipientName,
      telling: c.telling,
      tone: c.tone as Parameters<typeof composeAgent.run>[0]['tone'],
      anchors: c.anchors,
      attempt: 0,
    });

    if (!result.ok) {
      issues.push(`agent failed: ${result.reason}`);
      report('compose', c.id, issues);
      continue;
    }
    if (result.data.drafts.length !== 3) {
      issues.push(`expected 3 drafts, got ${result.data.drafts.length}`);
    }
    for (const draft of result.data.drafts) {
      const check = passesRestraint(draft, 'composer');
      if (!check.ok) {
        issues.push(`draft restraint: "${draft.slice(0, 40)}..." — ${check.reason}`);
      }
    }
    report('compose', c.id, issues, `drafts=${result.data.drafts.length}`);
  }
}

async function runSurpriseCases() {
  console.log('\nSurprise — beat sequence sanity:');
  for (const c of corpus.surpriseCases) {
    const issues: string[] = [];
    const result = await surpriseAgent.run({
      message: c.message,
      tone: c.tone as Parameters<typeof surpriseAgent.run>[0]['tone'],
      plan: null,
    });

    if (!result.ok) {
      issues.push(`agent failed: ${result.reason}`);
      report('surprise', c.id, issues);
      continue;
    }
    const seq = result.data.sequence;
    if (seq.beats.length !== 3) {
      issues.push(`expected 3 beats, got ${seq.beats.length}`);
    }
    const types = seq.beats.map((b) => b.type);
    for (const required of ['envelope', 'reveal', 'sign-off']) {
      if (!types.includes(required as (typeof types)[number])) {
        issues.push(`missing beat type: ${required}`);
      }
    }
    if (typeof seq.choreographyVersion !== 'number') {
      issues.push('choreographyVersion not a number');
    }
    report('surprise', c.id, issues, `beats=${types.join(' → ')}`);
  }
}

async function main() {
  await runReflectCases();
  await runDeepenCases();
  runRestraintCases();
  await runPlanningCases();
  await runComposeCases();
  await runSurpriseCases();

  const total = passed + failed;
  console.log(`\nResult: ${passed}/${total} passed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error('eval crashed:', err);
  process.exit(2);
});
