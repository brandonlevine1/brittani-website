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
  { slug: 'seller-disclosure-requirements', label: 'Seller Disclosure Requirements' },
  { slug: 'buyer-contingency-deadlines', label: 'Buyer Contingency Deadlines' },
  { slug: 'earnest-money-rules', label: 'Earnest Money Rules' },
  { slug: 'building-code-updates', label: 'Building Code Updates' },
  { slug: 'commission-and-licensing-rules', label: 'Commission & Licensing Rules' },
  { slug: 'hoa-condo-requirements', label: 'HOA/Condo Requirements' },
  { slug: 'title-and-closing-procedures', label: 'Title & Closing Procedures' },
  { slug: 'escrow-regulations', label: 'Escrow Regulations' },
  { slug: 'new-real-estate-laws', label: 'New Real Estate Laws' },
  { slug: 'property-condition-disclosures', label: 'Property Condition & Environmental Disclosures' },
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
];

export const AUTHORS = ['Brandon Levine', 'Jack Brighenti', 'Brittany Brighenti'];

export const AUTHOR_BIOS = {
  'Brandon Levine': 'Co-founder at Britanni AI. Previously managed transaction operations for a 200-agent brokerage in South Florida.',
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
  for (const topic of TYPE2_TOPICS) {
    const alreadyExists = existingFilenames.some(f => f.includes(topic.slug));
    if (!alreadyExists) {
      return topic;
    }
  }
  return TYPE2_TOPICS[0];
}

export function pickNextType3Topic(existingFilenames) {
  for (const topic of TYPE3_TOPICS) {
    const alreadyExists = existingFilenames.some(f => f.includes(topic.slug));
    if (!alreadyExists) {
      return topic;
    }
  }
  return TYPE3_TOPICS[0];
}
