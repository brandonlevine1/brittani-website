// Single source of truth for blog topic-hub pages.
// Each hub maps 1:1 to a TYPE1_CATEGORY in scripts/blog-topics.js, so the
// daily generator and the site taxonomy never drift apart.
//
// - title / description: used on the hub page (/blog/topic/<slug>) and its schema.
// - short / blurb: compact labels used in the blog index topic grid.

export interface TopicHub {
  slug: string;
  title: string;
  description: string;
  short: string;
  blurb: string;
}

export const TOPIC_HUBS: TopicHub[] = [
  { slug: 'seller-disclosure-requirements', title: 'Seller Disclosure Requirements by State', description: 'State-by-state seller disclosure laws, forms, and compliance requirements for real estate agents — updated for 2026.', short: 'Seller Disclosure Requirements', blurb: 'What sellers must disclose in each state' },
  { slug: 'agency-disclosure-requirements', title: 'Agency Disclosure Requirements by State', description: 'Agency disclosure rules and forms every agent must follow in each state — updated for 2026.', short: 'Agency Disclosure Requirements', blurb: 'How and when agents must disclose representation' },
  { slug: 'lead-paint-disclosure', title: 'Lead Paint Disclosure Requirements by State', description: 'Federal and state lead paint disclosure rules, forms, and exemptions for residential real estate transactions.', short: 'Lead Paint Disclosure', blurb: 'Federal and state rules, forms, and exemptions' },
  { slug: 'property-condition-disclosures', title: 'Property Condition & Environmental Disclosures by State', description: 'State requirements for disclosing property defects, environmental hazards, and material facts.', short: 'Property Condition Disclosures', blurb: 'Defects, hazards, and material facts by state' },
  { slug: 'hoa-condo-requirements', title: 'HOA & Condo Disclosure Rules by State', description: 'HOA document delivery timelines, condo resale certificates, and buyer cancellation rights in every state.', short: 'HOA & Condo Rules', blurb: 'Resale certificates and buyer cancellation rights' },
  { slug: 'buyer-agency-agreement-requirements', title: 'Buyer Agency Agreement Requirements by State', description: 'Post-NAR settlement buyer agency agreement rules, forms, and compliance requirements by state.', short: 'Buyer Agency Agreements', blurb: 'Post-NAR settlement requirements by state' },
  { slug: 'commission-structure-changes', title: 'Commission Structure Rules After the NAR Settlement', description: 'How commission rules changed after the 2024 NAR settlement — state-by-state requirements for buyer and seller agents.', short: 'Commission Rules After NAR', blurb: 'What changed for buyer and seller agents' },
  { slug: 'earnest-money-rules', title: 'Earnest Money & Escrow Laws by State', description: 'Earnest money deposit rules, escrow holder requirements, and dispute resolution procedures in each state.', short: 'Earnest Money & Escrow Laws', blurb: 'Deposit rules and dispute procedures' },
  { slug: 'buyer-contingency-deadlines', title: 'Buyer Contingency Deadlines by State', description: 'Default contingency periods for inspection, financing, and appraisal in residential contracts by state.', short: 'Buyer Contingency Deadlines', blurb: 'Inspection, financing, and appraisal periods' },
  { slug: 'dual-agency-rules', title: 'Dual Agency & Designated Agency Rules by State', description: 'Which states allow dual agency, designated agency requirements, and disclosure obligations for agents.', short: 'Dual Agency Rules', blurb: 'Which states allow it and under what conditions' },
  { slug: 'wire-fraud-prevention', title: 'Wire Fraud Prevention Requirements by State', description: 'State and federal wire fraud prevention rules, disclosure requirements, and best practices for closings.', short: 'Wire Fraud Prevention', blurb: 'Disclosure rules and closing best practices' },
  { slug: 'who-pays-closing-costs', title: 'Who Pays Closing Costs by State — Buyer vs. Seller', description: 'Customary closing cost splits between buyers and sellers in each state, including transfer taxes and title fees.', short: 'Who Pays Closing Costs', blurb: 'Buyer vs. seller customs in each state' },
  { slug: 'transfer-tax-recording-fees', title: 'Transfer Tax & Recording Fee Schedules by State', description: 'Current transfer tax rates, recording fees, and documentary stamp costs for residential transactions in every state.', short: 'Transfer Taxes & Recording Fees', blurb: 'Current rates for every state' },
  { slug: 'attorney-vs-title-company', title: 'Attorney vs. Title Company States — Who Must Be at Closing', description: 'Which states require an attorney at closing vs. title company only, and what that means for transaction coordination.', short: 'Attorney vs. Title Company States', blurb: 'Who must be at the closing table' },
  { slug: 'title-and-closing-procedures', title: 'Title & Closing Procedures by State', description: 'Title search requirements, closing procedures, and settlement practices that vary by state.', short: 'Title & Closing Procedures', blurb: 'Search requirements and settlement practices' },
  { slug: 'license-reciprocity-portability', title: 'Real Estate License Reciprocity & Portability by State', description: 'Which states have reciprocal licensing agreements, portability compacts, and what agents need to practice across borders.', short: 'License Reciprocity', blurb: 'Practicing across state lines' },
  { slug: 'continuing-education-requirements', title: 'Continuing Education Requirements by State', description: 'CE hour requirements, renewal deadlines, and approved course topics for real estate license renewal in each state.', short: 'Continuing Education', blurb: 'CE hours and renewal deadlines by state' },
  { slug: 'teams-supervision-rules', title: 'Teams & Supervision Rules by State', description: 'State rules for real estate teams, broker supervision requirements, and team advertising compliance.', short: 'Teams & Supervision Rules', blurb: 'Broker oversight and team advertising rules' },
  { slug: 'commission-and-licensing-rules', title: 'Commission & Licensing Rules by State', description: 'Commission payment rules, referral fee regulations, and licensing requirements by state.', short: 'Commission & Licensing Rules', blurb: 'Payment, referral, and licensing rules' },
  { slug: 'firpta-withholding-rules', title: 'FIRPTA Withholding Rules for Foreign Sellers by State', description: 'Federal FIRPTA withholding requirements plus state-level withholding rules for foreign property sellers.', short: 'FIRPTA Withholding', blurb: 'Foreign-seller withholding, federal and state' },
  { slug: '1031-exchange-rules', title: '1031 Exchange State Tax Implications', description: 'State income tax treatment of 1031 exchanges, clawback provisions, and reporting requirements.', short: '1031 Exchange Rules', blurb: 'State tax treatment and clawback provisions' },
  { slug: 'building-code-updates', title: 'Building Code Updates by State', description: 'Recent residential building code changes, effective dates, and what agents need to know about new construction.', short: 'Building Code Updates', blurb: 'Recent code changes and effective dates' },
  { slug: 'new-real-estate-laws', title: 'New Real Estate Laws by State', description: 'Newly enacted real estate legislation by state — bills signed into law affecting agents, brokers, and transactions.', short: 'New Real Estate Laws', blurb: 'Newly enacted legislation affecting agents' },
  { slug: 'escrow-regulations', title: 'Escrow Regulations by State', description: 'Escrow account rules, interest requirements, and disbursement timelines for real estate transactions by state.', short: 'Escrow Regulations', blurb: 'Account rules and disbursement timelines' },
];
