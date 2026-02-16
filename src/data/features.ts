export interface Feature {
  title: string;
  description: string;
  icon: string;
  isAI?: boolean;
  span?: string;
}

export const bentoFeatures: Feature[] = [
  {
    title: 'Smart Contract Analysis',
    description:
      'Upload a PDF. Get every critical date, amount, term, and contingency extracted in seconds — plus an audit for missing signatures and defects.',
    icon: 'sparkles',
    isAI: true,
    span: 'col-span-2',
  },
  {
    title: 'Automated Communications',
    description:
      'Context-aware emails to all parties at exactly the right time. Welcome emails, reminders, status updates, and follow-ups.',
    icon: 'mail',
  },
  {
    title: 'Deadline Tracking',
    description:
      'Every inspection window, EMD due date, loan commitment, and closing date — tracked and reminded automatically.',
    icon: 'calendar',
  },
  {
    title: 'Inspection Coordination',
    description:
      'Scheduling across buyer, seller, and agents. Confirmation flows, post-inspection follow-ups, and repair negotiation pauses.',
    icon: 'clipboard-check',
  },
  {
    title: 'Lender & Title Monitoring',
    description:
      'Weekly loan status checks. Title clearance tracking. EMD confirmation. You see everything in one dashboard.',
    icon: 'building',
  },
  {
    title: 'Deal Cancellation Handling',
    description:
      'When deals fall through, Britanni handles the paperwork — cancellation notices distributed to all parties automatically.',
    icon: 'x-circle',
  },
];

export interface FeatureDeepDive {
  eyebrow: string;
  title: string;
  description: string;
  bullets: { icon: string; text: string }[];
  imageAlt: string;
}

export const featureDeepDives: FeatureDeepDive[] = [
  {
    eyebrow: 'Contract Intelligence',
    title: 'Upload a Contract. Get Intelligence in Seconds.',
    description: 'AI-powered analysis extracts everything you need to know — instantly.',
    bullets: [
      { icon: 'search', text: 'Extracts closing date, escrow amount, inspection periods, finance contingencies' },
      { icon: 'alert-triangle', text: 'Identifies missing signatures, undated pages, incomplete addenda' },
      { icon: 'check-circle', text: 'Presents extracted data for agent confirmation before proceeding' },
    ],
    imageAlt: 'Contract analysis results showing extracted dates, amounts, and audit findings',
  },
  {
    eyebrow: 'Communications',
    title: 'Every Email. Every Party. Perfectly Timed.',
    description: 'Automated, context-aware communications to every party in the transaction.',
    bullets: [
      { icon: 'mail', text: 'Welcome emails introducing the TC to all parties' },
      { icon: 'clock', text: 'Deadline reminders sent at configurable intervals' },
      { icon: 'bell', text: 'Status updates distributed automatically when milestones are hit' },
    ],
    imageAlt: 'Communication timeline showing automated emails sent to all transaction parties',
  },
  {
    eyebrow: 'Deadline Management',
    title: 'Never Miss Another Deadline. Ever.',
    description: 'Auto-generated calendar with smart reminders at every critical milestone.',
    bullets: [
      { icon: 'calendar', text: 'Auto-generated calendar from contract data' },
      { icon: 'bell', text: 'Reminders at 3 days, 1 day, and day-of for every critical date' },
      { icon: 'refresh-cw', text: 'Automatic updates when addenda change dates' },
    ],
    imageAlt: 'Deadline calendar view showing all critical dates with reminder indicators',
  },
  {
    eyebrow: 'Inspections',
    title: 'Inspection Scheduling Without the Phone Tag',
    description: 'Coordinate across all parties without the back-and-forth.',
    bullets: [
      { icon: 'users', text: 'Coordinates scheduling across buyer, seller, and agents' },
      { icon: 'check', text: 'Sends confirmation to all parties once scheduled' },
      { icon: 'clock', text: '4-hour post-inspection follow-up triggers automatically' },
      { icon: 'pause', text: 'Pauses automation during repair negotiations' },
    ],
    imageAlt: 'Inspection coordination workflow showing scheduling and confirmation steps',
  },
  {
    eyebrow: 'Financial Monitoring',
    title: 'Weekly Status Checks You Don\'t Have to Make',
    description: 'Automated lender and title monitoring keeps the deal on track.',
    bullets: [
      { icon: 'mail', text: 'Automated weekly lender status emails' },
      { icon: 'dollar-sign', text: 'EMD receipt confirmation tracking with title company' },
      { icon: 'shield', text: 'Title clearance and curative monitoring' },
      { icon: 'alert-circle', text: 'Immediate alerts when issues arise' },
    ],
    imageAlt: 'Lender status dashboard showing loan progress and title clearance status',
  },
  {
    eyebrow: 'Deal Management',
    title: 'All Your Deals. One View.',
    description: 'A single dashboard to manage every active transaction.',
    bullets: [
      { icon: 'layout', text: 'Active deal cards with phase indicators and next action' },
      { icon: 'message-square', text: 'Communication log for every deal' },
      { icon: 'file', text: 'Document storage and version tracking' },
      { icon: 'zap', text: 'Quick actions: upload addendum, update status, cancel deal' },
    ],
    imageAlt: 'Deal dashboard showing active transactions with status indicators',
  },
];

export const additionalCapabilities = [
  {
    title: 'Addendum Processing',
    description: 'Upload changes, AI re-analyzes and updates all parties automatically.',
    icon: 'file-plus',
  },
  {
    title: 'Cash Deal Support',
    description: 'Smart workflows that skip lender steps automatically.',
    icon: 'banknote',
  },
  {
    title: 'HOA/Condo Coordination',
    description: 'Estoppel letters, governing documents, assessment tracking.',
    icon: 'home',
  },
  {
    title: 'Cancellation Workflows',
    description: 'Automated distribution of cancellation notices to all parties.',
    icon: 'x-octagon',
  },
];
