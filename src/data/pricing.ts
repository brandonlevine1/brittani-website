export interface PricingTier {
  name: string;
  tagline: string;
  monthlyPrice: string;
  annualPrice: string;
  features: string[];
  cta: string;
  ctaLink: string;
  popular?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    tagline: 'For individual agents',
    monthlyPrice: 'XX',
    annualPrice: 'XX',
    features: [
      'Up to 5 active deals',
      'Contract analysis & audit',
      'Automated party communications',
      'Deadline tracking & reminders',
      'Email support',
    ],
    cta: 'Start Free Trial',
    ctaLink: '#',
  },
  {
    name: 'Professional',
    tagline: 'For busy agents',
    monthlyPrice: 'XX',
    annualPrice: 'XX',
    features: [
      'Unlimited active deals',
      'Everything in Starter',
      'Inspection coordination',
      'Lender & title monitoring',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaLink: '#',
    popular: true,
  },
  {
    name: 'Team',
    tagline: 'For real estate teams',
    monthlyPrice: 'XX',
    annualPrice: 'XX',
    features: [
      'Everything in Professional',
      '5 agent seats included',
      'Team dashboard & reporting',
      'Shared deal templates',
      'Dedicated onboarding',
    ],
    cta: 'Contact Sales',
    ctaLink: '#',
  },
];

export interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    starter: boolean | string;
    professional: boolean | string;
    team: boolean | string;
  }[];
}

export const comparisonFeatures: ComparisonFeature[] = [
  {
    category: 'Contract Analysis',
    features: [
      { name: 'AI contract extraction', starter: true, professional: true, team: true },
      { name: 'Missing signature detection', starter: true, professional: true, team: true },
      { name: 'Addendum re-analysis', starter: false, professional: true, team: true },
    ],
  },
  {
    category: 'Communications',
    features: [
      { name: 'Welcome emails to all parties', starter: true, professional: true, team: true },
      { name: 'Deadline reminders', starter: true, professional: true, team: true },
      { name: 'Custom email templates', starter: false, professional: true, team: true },
    ],
  },
  {
    category: 'Scheduling',
    features: [
      { name: 'Inspection coordination', starter: false, professional: true, team: true },
      { name: 'Final walkthrough scheduling', starter: false, professional: true, team: true },
    ],
  },
  {
    category: 'Monitoring',
    features: [
      { name: 'Lender status tracking', starter: false, professional: true, team: true },
      { name: 'Title clearance monitoring', starter: false, professional: true, team: true },
      { name: 'EMD receipt confirmation', starter: true, professional: true, team: true },
    ],
  },
  {
    category: 'Support & Collaboration',
    features: [
      { name: 'Email support', starter: true, professional: true, team: true },
      { name: 'Priority support', starter: false, professional: true, team: true },
      { name: 'Team dashboard', starter: false, professional: false, team: true },
      { name: 'Shared templates', starter: false, professional: false, team: true },
      { name: 'Dedicated onboarding', starter: false, professional: false, team: true },
    ],
  },
];
