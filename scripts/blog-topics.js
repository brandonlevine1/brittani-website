export const STATES_BY_PRIORITY = [
  'california', 'texas', 'florida', 'new-york', 'pennsylvania',
  'illinois', 'ohio', 'georgia', 'north-carolina', 'michigan',
  'new-jersey', 'virginia', 'washington', 'arizona', 'tennessee',
  'massachusetts', 'indiana', 'missouri', 'maryland', 'colorado',
  'wisconsin', 'minnesota', 'south-carolina', 'alabama', 'louisiana',
  'kentucky', 'oregon', 'oklahoma', 'connecticut', 'utah',
  'iowa', 'nevada', 'arkansas', 'mississippi', 'kansas',
  'new-mexico', 'nebraska', 'idaho', 'hawaii', 'west-virginia',
  'new-hampshire', 'maine', 'montana', 'rhode-island', 'delaware',
  'south-dakota', 'north-dakota', 'alaska', 'vermont', 'wyoming',
];

export const STATE_DISPLAY_NAMES = Object.fromEntries(
  STATES_BY_PRIORITY.map(s => [s, s.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')])
);

export const TYPE1_CATEGORIES = [
  // Disclosures & compliance
  { slug: 'seller-disclosure-requirements', label: 'Seller Disclosure Requirements' },
  { slug: 'agency-disclosure-requirements', label: 'Agency Disclosure Requirements' },
  { slug: 'lead-paint-disclosure', label: 'Lead Paint Disclosure Requirements' },
  { slug: 'property-condition-disclosures', label: 'Property Condition & Environmental Disclosures' },
  { slug: 'hoa-condo-requirements', label: 'HOA & Condo Disclosure Rules' },
  // Post-NAR settlement (high search volume)
  { slug: 'buyer-agency-agreement-requirements', label: 'Buyer Agency Agreement Requirements' },
  { slug: 'commission-structure-changes', label: 'Commission Structure Rules After the NAR Settlement' },
  // Transaction law
  { slug: 'earnest-money-rules', label: 'Earnest Money & Escrow Laws' },
  { slug: 'buyer-contingency-deadlines', label: 'Buyer Contingency Deadlines' },
  { slug: 'dual-agency-rules', label: 'Dual Agency & Designated Agency Rules' },
  { slug: 'wire-fraud-prevention', label: 'Wire Fraud Prevention Requirements' },
  // Closing & money
  { slug: 'who-pays-closing-costs', label: 'Who Pays Closing Costs — Buyer vs. Seller' },
  { slug: 'transfer-tax-recording-fees', label: 'Transfer Tax & Recording Fee Schedules' },
  { slug: 'attorney-vs-title-company', label: 'Attorney vs. Title Company — Who Must Be at Closing' },
  { slug: 'title-and-closing-procedures', label: 'Title & Closing Procedures' },
  // Licensing & practice
  { slug: 'license-reciprocity-portability', label: 'Real Estate License Reciprocity & Portability' },
  { slug: 'continuing-education-requirements', label: 'Continuing Education Requirements' },
  { slug: 'teams-supervision-rules', label: 'Teams & Supervision Rules' },
  { slug: 'commission-and-licensing-rules', label: 'Commission & Licensing Rules' },
  // Investment & tax
  { slug: 'firpta-withholding-rules', label: 'FIRPTA Withholding Rules for Foreign Sellers' },
  { slug: '1031-exchange-rules', label: '1031 Exchange State Tax Implications' },
  // General
  { slug: 'building-code-updates', label: 'Building Code Updates' },
  { slug: 'new-real-estate-laws', label: 'New Real Estate Laws' },
  { slug: 'escrow-regulations', label: 'Escrow Regulations' },
];

export const TYPE2_TOPICS = [
  { slug: 'track-multiple-active-deals', title: 'How to Track Multiple Active Deals Without Missing a Deadline' },
  { slug: 'email-sequences-for-new-contracts', title: 'The Exact Email Sequence Top TCs Send for Every New Contract' },
  { slug: 'broker-hire-tc-vs-software', title: 'When Should a Broker Hire a TC vs. Use Software? A Cost Analysis' },
  { slug: 'inspection-scheduling-system', title: 'Inspection Scheduling: The 3-Step System That Eliminates Phone Tag' },
  { slug: 'contract-defects-that-kill-deals', title: '5 Contract Defects That Kill Deals — And How to Catch Them in 60 Seconds' },
  { slug: 'introduce-yourself-as-tc', title: 'How to Introduce Yourself as TC to Lenders, Title, and the Other Agent' },
  { slug: 'deal-rescue-checklist', title: 'Deal Falling Apart? The 48-Hour Rescue Checklist' },
  { slug: 'monthly-compliance-audit', title: 'Monthly Compliance Audit: 12 Items Every Broker Should Check' },
  { slug: 'evaluate-tc-software', title: 'How to Evaluate TC Software: The Broker\'s Decision Framework' },
  { slug: 'training-new-agents-timelines', title: 'Training New Agents on Transaction Timelines: A Broker\'s Playbook' },
  { slug: 'managing-addendum-changes', title: 'How to Handle Mid-Contract Addendums Without Losing Track' },
  { slug: 'lender-communication-cadence', title: 'The Weekly Lender Check-In: What to Ask and When' },
  { slug: 'closing-day-coordination', title: 'Closing Day Coordination: A Step-by-Step Timeline' },
  { slug: 'transaction-handoff-checklist', title: 'Agent-to-TC Handoff: The Checklist That Prevents Dropped Balls' },
  { slug: 'scaling-from-5-to-15-deals', title: 'Scaling from 5 to 15 Active Deals: What Breaks and How to Fix It' },
  // Expansion — workflow & systems (added 2026-06-27 to keep daily generation producing net-new content)
  { slug: 'compliance-checklist-by-contract-stage', title: 'The Compliance Checklist Every Contract Stage Needs (Offer to Close)' },
  { slug: 'organize-digital-transaction-files', title: 'How to Organize Digital Transaction Files So Nothing Gets Lost' },
  { slug: 'earnest-money-deposit-tracking', title: 'Earnest Money Tracking: A Simple System That Protects Everyone' },
  { slug: 'title-order-timeline', title: 'When to Order Title — And What to Do While You Wait' },
  { slug: 'appraisal-gap-coordination', title: 'Appraisal Came In Low? The TC Playbook for Closing the Gap' },
  { slug: 'closing-disclosure-3-day-rule', title: 'The Closing Disclosure 3-Day Rule: How to Never Blow a Closing Date' },
  { slug: 'managing-multiple-closings-same-week', title: 'How to Manage Five Closings in One Week Without Dropping a Ball' },
  { slug: 'repair-request-negotiation-tracking', title: 'Tracking Repair Requests and Credits So Nothing Falls Through' },
  { slug: 'contingency-removal-workflow', title: 'The Contingency Removal Workflow That Keeps Deals on Schedule' },
  { slug: 'new-construction-transaction-coordination', title: 'Coordinating a New-Construction Transaction: What\'s Different and Why' },
  { slug: 'cash-deal-closing-checklist', title: 'The Cash Deal Closing Checklist: Faster, But Don\'t Skip These Steps' },
  { slug: 'onboarding-tc-clients', title: 'How to Onboard a New Agent Client as a Transaction Coordinator' },
  { slug: 'tc-pricing-models', title: 'How Transaction Coordinators Price Their Services (3 Proven Models)' },
  { slug: 'weekly-pipeline-review-system', title: 'The 15-Minute Weekly Pipeline Review That Catches Every Risk Early' },
  { slug: 'preventing-closing-delays', title: 'The 7 Most Common Reasons Closings Get Delayed — And How to Prevent Them' },
  { slug: 'buyer-walkthrough-coordination', title: 'Final Walkthrough Coordination: The Checklist That Prevents Surprises' },
  { slug: 'wire-instructions-verification-process', title: 'The Wire Instructions Verification Process Every TC Should Use' },
  { slug: 'short-sale-coordination-checklist', title: 'Coordinating a Short Sale: The Timeline and Documents You\'ll Need' },
  { slug: 'document-collection-from-agents', title: 'How to Get Agents to Send Documents on Time (Without Nagging)' },
  { slug: 'closing-gift-and-followup-system', title: 'The Post-Closing Follow-Up System That Turns Deals Into Referrals' },
];

export const TYPE3_TOPICS = [
  { slug: 'nar-settlement-year-one', title: 'NAR Settlement Year One: What Actually Changed for Transaction Teams' },
  { slug: 'rising-inventory-operations', title: 'Rising Inventory Means More Contracts — Is Your Operations Stack Ready?' },
  { slug: 'ai-powered-vs-actually-using-ai', title: 'The Difference Between "AI-Powered" and Actually Using AI in Real Estate' },
  { slug: 'where-deals-break-down', title: 'We Analyzed 10,000 Transactions: Here\'s Where Deals Actually Break Down' },
  { slug: 'will-ai-replace-tcs', title: 'Will AI Replace Transaction Coordinators? (No — Here\'s What Actually Happens)' },
  { slug: 'hidden-cost-agent-turnover', title: 'The Hidden Cost of Agent Turnover: An Operations Perspective' },
  { slug: 'disclosure-laws-tightening', title: 'States Are Tightening Disclosure Laws — Here\'s the Pattern We\'re Seeing' },
  { slug: 'stop-calling-templates-ai', title: 'Stop Calling It "AI" If It\'s Just a Template Library' },
  { slug: 'compliance-risk-multi-state-teams', title: 'Multi-State Brokerages: The Compliance Gaps Nobody Talks About' },
  { slug: 'real-cost-of-missed-deadlines', title: 'The Real Cost of a Missed Deadline: Lawsuits, Lost Deals, and Reputation' },
  { slug: 'tc-industry-consolidation', title: 'The TC Industry Is Consolidating — What That Means for Agents' },
  { slug: 'why-agents-hate-paperwork', title: 'Why Agents Hate Paperwork (And Why That\'s a Business Problem, Not a Character Flaw)' },
  { slug: 'future-of-real-estate-closings', title: 'The Future of Real Estate Closings: Faster, Digital, and Agent-Optional?' },
  { slug: 'broker-liability-agent-mistakes', title: 'Broker Liability for Agent Compliance Mistakes: What the Courts Say' },
  { slug: 'remote-closings-state-by-state', title: 'Remote Closings in 2026: Which States Allow Them and What\'s Required' },
  // Expansion — opinion & industry (added 2026-06-27 to keep daily generation producing net-new content)
  { slug: 'ai-agents-vs-virtual-assistants', title: 'AI Transaction Assistants vs. Virtual Assistants: What\'s Actually Different' },
  { slug: 'compliance-as-competitive-advantage', title: 'Why Compliance Is About to Become a Competitive Advantage for Brokerages' },
  { slug: 'why-transaction-coordination-is-broken', title: 'Transaction Coordination Is Broken — Here\'s What Replaces It' },
  { slug: 'state-of-real-estate-tech-2026', title: 'The State of Real Estate Technology in 2026: What\'s Hype, What\'s Real' },
  { slug: 'commission-transparency-new-normal', title: 'Commission Transparency Is the New Normal — Are Your Systems Ready?' },
  { slug: 'end-of-the-paper-contract', title: 'The End of the Paper Contract: What Fully Digital Deals Change for Agents' },
  { slug: 'real-estate-data-privacy', title: 'Who Owns Your Transaction Data? The Privacy Question Nobody\'s Asking' },
  { slug: 'agent-burnout-operations-problem', title: 'Agent Burnout Is an Operations Problem, Not a Motivation Problem' },
  { slug: 'in-house-tc-vs-outsourced', title: 'In-House TC Team vs. Outsourced: The Real Trade-Offs for Growing Brokerages' },
  { slug: 'how-ai-reads-real-estate-contracts', title: 'How AI Actually Reads a Real Estate Contract (And Where It Still Needs a Human)' },
  { slug: 'compliance-debt-of-fast-growth', title: 'The Compliance Debt Every Fast-Growing Brokerage Accumulates' },
  { slug: 'transaction-transparency-for-clients', title: 'Why Clients Will Soon Expect Real-Time Visibility Into Their Transaction' },
  { slug: 'commission-lawsuits-aftermath', title: 'Life After the Commission Lawsuits: How Agents Are Actually Adapting' },
  { slug: 'why-checklists-beat-memory', title: 'Why Checklists Beat Memory: The Operations Case Against "I\'ve Got It Handled"' },
  { slug: 'true-cost-of-a-blown-closing', title: 'The True Cost of a Blown Closing — Far Beyond the Lost Commission' },
  { slug: 'referable-transaction-experience', title: 'The Transaction Experience Is the New Referral Engine' },
  { slug: 'automation-vs-human-judgment', title: 'Automation vs. Human Judgment: Where to Draw the Line in Real Estate' },
  { slug: 'mortgage-rate-volatility-operations', title: 'What Mortgage-Rate Volatility Really Does to Your Transaction Pipeline' },
  { slug: 'what-portals-mean-for-tcs', title: 'What the Zillow–Redfin Era Means for Transaction Coordinators' },
  { slug: 'small-brokerage-tech-advantage', title: 'How Small Brokerages Can Out-Operate Big Ones With the Right Stack' },
];

export const AUTHORS = ['Jack Brighenti', 'Brittany Brighenti'];

export const AUTHOR_BIOS = {
  'Jack Brighenti': 'Co-founder at Britanni AI. Licensed broker with 12 years of experience in residential transactions.',
  'Brittany Brighenti': 'Co-founder at Britanni AI. Managed 3,000+ transactions as a senior TC before building Britanni.',
};

export const STATE_ARCHITECTURE = {
  'california': 'Spanish colonial home with stucco walls and terracotta roof tiles',
  'texas': 'Hill Country limestone ranch home with a wide front porch',
  'florida': 'Mediterranean revival home with palm trees and coastal landscaping',
  'new-york': 'Classic brownstone townhouse with mature trees lining the street',
  'pennsylvania': 'Colonial brick home with black shutters and stone pathway',
  'illinois': 'Chicago bungalow with Prairie-style details and a manicured lawn',
  'ohio': 'Colonial revival home with a craftsman front porch',
  'georgia': 'Southern colonial with wraparound porch and white columns',
  'north-carolina': 'Cape Cod home with stone accents and mountain backdrop',
  'michigan': 'Tudor-style home with brick and timber details',
  'new-jersey': 'Colonial with cedar shake siding and a circular driveway',
  'virginia': 'Red brick colonial with dormer windows and boxwood hedges',
  'washington': 'Pacific Northwest craftsman with natural wood siding',
  'arizona': 'Desert modern home with clean stucco lines and desert landscaping',
  'tennessee': 'Craftsman farmhouse with a metal roof and stone chimney',
  'massachusetts': 'New England colonial with clapboard siding and fall foliage',
  'colorado': 'Mountain modern home with large windows and timber framing',
};

export const DEFAULT_ARCHITECTURE = 'Craftsman style home in an established neighborhood with mature landscaping';

// ---------------------------------------------------------------------------
// Slug helpers
// ---------------------------------------------------------------------------

const baseSlug = (filename) => filename.replace(/\.md$/, '');

/** Does any already-used slug belong to this Type-1 category (any state, any year)? */
const slugInCategory = (slug, categorySlug) => slug.includes(`-${categorySlug}`);

/** Does a state already have a guide in this category (year-agnostic)? */
const stateHasCategory = (used, state, categorySlug) =>
  [...used].some((slug) => slug.includes(`${state}-${categorySlug}`));

// ---------------------------------------------------------------------------
// Type-1 selection: category-balanced, highest-priority-state-first.
//
// The matrix is STATES_BY_PRIORITY x TYPE1_CATEGORIES (50 x 24 = 1,200 unique
// cells). We fill the *least-covered section first* so every topic hub gets
// seeded quickly, then deepen sections evenly. High-search-volume states win
// ties within a section. Every cell is unique, so this never overwrites.
// ---------------------------------------------------------------------------

function categoryCoverage(used) {
  const counts = Object.fromEntries(TYPE1_CATEGORIES.map((c) => [c.slug, 0]));
  for (const slug of used) {
    for (const category of TYPE1_CATEGORIES) {
      if (slugInCategory(slug, category.slug)) {
        counts[category.slug]++;
        break;
      }
    }
  }
  return counts;
}

/**
 * Plan a single Type-1 slot against a Set of already-used base slugs.
 * Returns null only if the entire matrix is exhausted (≈1,200 posts in) —
 * the caller treats null as "skip", so we never overwrite.
 */
export function planType1Slot(used, currentYear) {
  const counts = categoryCoverage(used);

  let category = TYPE1_CATEGORIES[0];
  let minCount = Infinity;
  for (const c of TYPE1_CATEGORIES) {
    if (counts[c.slug] < minCount) {
      minCount = counts[c.slug];
      category = c;
    }
  }

  for (const state of STATES_BY_PRIORITY) {
    if (!stateHasCategory(used, state, category.slug)) {
      const slug = `${state}-${category.slug}-${currentYear}`;
      return { type: 1, kind: 'regulatory', state, category, slug };
    }
  }

  return null; // matrix fully covered — skip rather than overwrite
}

/** First curated topic whose slug is not yet used; null when the pool is exhausted. */
function pickFreshTopic(pool, used) {
  for (const topic of pool) {
    if (!used.has(topic.slug)) return topic;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Run planner: builds the full daily plan up front, reserving each slug as it
// goes so nothing is generated twice. Exhausted Type-2/Type-3 slots are
// reallocated to the Type-1 matrix, keeping daily volume constant with zero
// overwrites and zero auto-invented titles (curated titles only = no quality drift).
// ---------------------------------------------------------------------------

export function planRun(existingFilenames, { postsPerType, currentYear }) {
  const used = new Set(existingFilenames.map(baseSlug));
  const slots = [];

  const reserve = (slot) => {
    if (!slot) return null;
    used.add(slot.slug);
    slots.push(slot);
    return slot;
  };

  const planType2 = () => {
    const topic = pickFreshTopic(TYPE2_TOPICS, used);
    return topic
      ? { type: 2, kind: 'operational', topic, slug: topic.slug }
      : planType1Slot(used, currentYear); // reallocate exhausted slot to the matrix
  };

  const planType3 = () => {
    const topic = pickFreshTopic(TYPE3_TOPICS, used);
    return topic
      ? { type: 3, kind: 'opinion', topic, slug: topic.slug }
      : planType1Slot(used, currentYear);
  };

  for (let i = 0; i < postsPerType; i++) {
    reserve(planType1Slot(used, currentYear));
    reserve(planType2());
    reserve(planType3());
  }

  return slots;
}

// ---------------------------------------------------------------------------
// Backward-compatible single-pick helpers (used by tests / ad-hoc tooling).
// The daily generator uses planRun() above.
// ---------------------------------------------------------------------------

export function pickNextState(existingFilenames) {
  const stateCounts = Object.fromEntries(STATES_BY_PRIORITY.map(s => [s, 0]));

  for (const filename of existingFilenames) {
    for (const state of STATES_BY_PRIORITY) {
      if (filename.startsWith(state + '-')) {
        stateCounts[state]++;
        break;
      }
    }
  }

  let minCount = Infinity;
  let picked = STATES_BY_PRIORITY[0];
  for (const state of STATES_BY_PRIORITY) {
    if (stateCounts[state] < minCount) {
      minCount = stateCounts[state];
      picked = state;
    }
  }

  return picked;
}

export function pickNextType1Category(state, existingFilenames) {
  for (const category of TYPE1_CATEGORIES) {
    const expectedSlug = `${state}-${category.slug}`;
    const alreadyExists = existingFilenames.some(f => f.includes(expectedSlug));
    if (!alreadyExists) {
      return category;
    }
  }
  return TYPE1_CATEGORIES[0];
}

export function pickNextType2Topic(existingFilenames) {
  const used = new Set(existingFilenames.map(baseSlug));
  return pickFreshTopic(TYPE2_TOPICS, used); // null when exhausted — no overwrite
}

export function pickNextType3Topic(existingFilenames) {
  const used = new Set(existingFilenames.map(baseSlug));
  return pickFreshTopic(TYPE3_TOPICS, used);
}
