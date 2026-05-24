import { describe, it, expect } from 'vitest';
import {
  pickNextState,
  pickNextType1Category,
  pickNextType2Topic,
  pickNextType3Topic,
  STATES_BY_PRIORITY,
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
    expect(result.slug).toBe('buyer-contingency-deadlines');
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
});

describe('pickNextType3Topic', () => {
  it('picks the first unused topic', () => {
    const existing = ['nar-settlement-year-one.md'];
    const result = pickNextType3Topic(existing);
    expect(result.slug).toBe('rising-inventory-operations');
  });
});
