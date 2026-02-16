export interface FAQItem {
  question: string;
  answer: string;
}

export const homeFAQ: FAQItem[] = [
  {
    question: 'What exactly does Britanni AI do?',
    answer:
      'Britanni AI acts as your AI-powered Transaction Coordinator. When you create a deal, upload a contract, and enter party information, Britanni takes over — analyzing the contract for critical dates and defects, sending communications to all parties, tracking every deadline, coordinating inspections, monitoring lender and title status, and keeping you updated every step of the way.',
  },
  {
    question: 'How much does it cost compared to a human TC?',
    answer:
      'A human TC typically charges $300–$500 per transaction. Britanni costs a fraction of that — you can coordinate unlimited deals per month for less than what a single human-managed transaction costs. Check our pricing page for current plans.',
  },
  {
    question: 'Is my contract data secure?',
    answer:
      'Absolutely. All contract data is encrypted in transit and at rest using AES-256 encryption. We follow industry-standard security practices, undergo regular security audits, and never share your data with third parties. Your contracts and client information remain strictly confidential.',
  },
  {
    question: 'How does the AI analyze contracts?',
    answer:
      'When you upload a contract PDF, our AI reads through every page to extract critical information — closing dates, escrow amounts, contingency periods, inspection windows, and more. It also audits for missing signatures, undated pages, and incomplete addenda. The entire process takes less than 60 seconds.',
  },
  {
    question: 'What happens if the AI makes a mistake?',
    answer:
      'Britanni always presents extracted contract data for your review and confirmation before taking any action. You remain in control of every deal. If the AI flags something incorrectly, you can easily correct it. We also have human support available for any questions or concerns.',
  },
  {
    question: 'Which states do you support?',
    answer:
      'Britanni AI currently supports residential real estate transactions in Florida, with deep knowledge of Florida-specific contract forms, disclosure requirements, and market conventions. We are actively expanding to additional states — contact us if you would like to be notified when we launch in your market.',
  },
  {
    question: 'Can I try it before subscribing?',
    answer:
      'Yes! Every plan includes a 14-day free trial with full access to all features. No credit card required to start. You can create deals, upload contracts, and experience the full AI TC workflow before deciding.',
  },
  {
    question: 'Does it work for teams?',
    answer:
      'Yes. Our Team plan is designed for real estate teams of 2–7+ agents. It includes a shared team dashboard, reporting across all team deals, shared templates, and dedicated onboarding to get your whole team up and running quickly.',
  },
];

export const pricingFAQ: FAQItem[] = [
  {
    question: 'How does the free trial work?',
    answer:
      'Every plan comes with a 14-day free trial. You get full access to all features in your chosen tier. No credit card is required to start. At the end of the trial, you can choose to subscribe or your account will be paused.',
  },
  {
    question: 'Can I change plans later?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to new features. When downgrading, the change takes effect at the start of your next billing cycle.',
  },
  {
    question: 'What counts as an "active deal"?',
    answer:
      'An active deal is any transaction that has not been marked as closed or cancelled. Once a deal is closed, it no longer counts against your active deal limit but remains accessible for your records.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'We offer a full refund within the first 30 days of your paid subscription if you are not satisfied. After 30 days, you can cancel anytime and your subscription will remain active until the end of your current billing period.',
  },
  {
    question: 'Is there a discount for annual billing?',
    answer:
      'Yes, annual billing saves you 20% compared to monthly billing. All annual plans are billed as a single payment at the start of each year.',
  },
  {
    question: 'How does team pricing work?',
    answer:
      'The Team plan includes 5 agent seats. Additional seats can be added for a per-seat monthly fee. Each agent gets their own login, deal management, and activity tracking, while team leads get a unified dashboard.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, American Express) and ACH bank transfers for annual plans.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes. There are no long-term contracts or cancellation fees. You can cancel your subscription at any time from your account settings. You will retain access to all features until the end of your current billing period.',
  },
];
