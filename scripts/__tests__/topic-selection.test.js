import { describe, it, expect } from 'vitest';
import {
  pickNextState,
  pickNextType1Category,
  pickNextType2Topic,
  pickNextType3Topic,
  planType1Slot,
  planRun,
  STATES_BY_PRIORITY,
  TYPE1_CATEGORIES,
  TYPE2_TOPICS,
  TYPE3_TOPICS,
} from '../blog-topics.js';

describe('pickNextState', () => {
  it('returns the first state when no posts exist', () => {
    const result = pickNextState([]);
    expect(result).toBe('california');
  });

  it('returns the least-covered state', () => {
    const existingPosts = [
      'california-seller-disclosure-requirements-2026.md',
      'california-earnest-money-rules-2026.md',
      'texas-seller-disclosure-requirements-2026.md',
    ];
    const result = pickNextState(existingPosts);
    expect(result).toBe('florida');
  });

  it('rotates to next priority state when top states are equal', () => {
    const existingPosts = [
      'california-seller-disclosure-requirements-2026.md',
      'texas-seller-disclosure-requirements-2026.md',
      'florida-seller-disclosure-requirements-2026.md',
    ];
    const result = pickNextState(existingPosts);
    expect(result).toBe('new-york');
  });
});

describe('pickNextType1Category', () => {
  it('picks the first unused category for a state', () => {
    const existing = ['california-seller-disclosure-requirements-2026.md'];
    const result = pickNextType1Category('california', existing);
    expect(result.slug).toBe('agency-disclosure-requirements');
  });

  it('picks first category when no posts exist for that state', () => {
    const result = pickNextType1Category('texas', []);
    expect(result.slug).toBe('seller-disclosure-requirements');
  });
});

describe('pickNextType2Topic', () => {
  it('picks the first unused topic', () => {
    const existing = ['track-multiple-active-deals.md'];
    const result = pickNextType2Topic(existing);
    expect(result.slug).toBe('email-sequences-for-new-contracts');
  });

  it('returns null when the pool is exhausted (never overwrites)', () => {
    const existing = TYPE2_TOPICS.map(t => `${t.slug}.md`);
    expect(pickNextType2Topic(existing)).toBeNull();
  });
});

describe('pickNextType3Topic', () => {
  it('picks the first unused topic', () => {
    const existing = ['nar-settlement-year-one.md'];
    const result = pickNextType3Topic(existing);
    expect(result.slug).toBe('rising-inventory-operations');
  });

  it('returns null when the pool is exhausted (never overwrites)', () => {
    const existing = TYPE3_TOPICS.map(t => `${t.slug}.md`);
    expect(pickNextType3Topic(existing)).toBeNull();
  });
});

describe('planType1Slot — category-balanced selection', () => {
  it('seeds the emptiest section first (tie broken by category order)', () => {
    // Every category covered once except all are equal -> first category wins.
    const slot = planType1Slot(new Set(), 2026);
    expect(slot.type).toBe(1);
    expect(slot.category.slug).toBe(TYPE1_CATEGORIES[0].slug);
    expect(slot.state).toBe('california');
  });

  it('moves to a still-empty section before deepening a populated one', () => {
    // seller-disclosure covered for 3 states; everything else empty.
    const used = new Set([
      'california-seller-disclosure-requirements-2026',
      'texas-seller-disclosure-requirements-2026',
      'florida-seller-disclosure-requirements-2026',
    ]);
    const slot = planType1Slot(used, 2026);
    expect(slot.category.slug).toBe(TYPE1_CATEGORIES[1].slug); // next, still-empty section
    expect(slot.state).toBe('california'); // highest-priority uncovered state
  });

  it('returns null when the full 50x24 matrix is exhausted', () => {
    const used = new Set();
    for (const state of STATES_BY_PRIORITY) {
      for (const category of TYPE1_CATEGORIES) {
        used.add(`${state}-${category.slug}-2026`);
      }
    }
    expect(planType1Slot(used, 2026)).toBeNull();
  });
});

describe('planRun — dynamic, non-overwriting scheduler', () => {
  it('plans postsPerType * 3 slots with all-unique slugs', () => {
    const plan = planRun([], { postsPerType: 5, currentYear: 2026 });
    expect(plan).toHaveLength(15);
    const slugs = plan.map(s => s.slug);
    expect(new Set(slugs).size).toBe(15);
  });

  it('never plans a slug that already exists (no overwrite)', () => {
    const existing = [
      'track-multiple-active-deals.md',
      'nar-settlement-year-one.md',
      'california-seller-disclosure-requirements-2026.md',
    ];
    const plan = planRun(existing, { postsPerType: 5, currentYear: 2026 });
    const existingSlugs = new Set(existing.map(f => f.replace(/\.md$/, '')));
    for (const slot of plan) {
      expect(existingSlugs.has(slot.slug)).toBe(false);
    }
  });

  it('seeds five distinct empty sections on a fresh-ish corpus', () => {
    // First three sections fully covered for all states -> Type 1 should spread
    // across the next empty sections rather than repeating one.
    const existing = [];
    for (const state of STATES_BY_PRIORITY) {
      existing.push(`${state}-${TYPE1_CATEGORIES[0].slug}-2026.md`);
      existing.push(`${state}-${TYPE1_CATEGORIES[1].slug}-2026.md`);
      existing.push(`${state}-${TYPE1_CATEGORIES[2].slug}-2026.md`);
    }
    const plan = planRun(existing, { postsPerType: 5, currentYear: 2026 });
    const type1Categories = plan.filter(s => s.type === 1).map(s => s.category.slug);
    expect(new Set(type1Categories).size).toBe(type1Categories.length); // all distinct
    expect(type1Categories).not.toContain(TYPE1_CATEGORIES[0].slug); // already full
  });

  it('reallocates exhausted Type-2/Type-3 pools to the Type-1 matrix (constant volume)', () => {
    const existing = [
      ...TYPE2_TOPICS.map(t => `${t.slug}.md`),
      ...TYPE3_TOPICS.map(t => `${t.slug}.md`),
    ];
    const plan = planRun(existing, { postsPerType: 5, currentYear: 2026 });
    expect(plan).toHaveLength(15); // volume preserved
    expect(plan.every(s => s.type === 1)).toBe(true); // all absorbed by the matrix
    expect(new Set(plan.map(s => s.slug)).size).toBe(15); // still unique
  });
});
