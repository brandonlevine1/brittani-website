// Copy for the "Brittani via SMS" rolling accordion showcase (SMSShowcase.astro).
// One config per page so each audience gets copy tuned to its segment.

export interface SMSMessage {
  from: 'agent' | 'brittani';
  text: string;
}

export interface SMSPanel {
  title: string;
  description: string;
  conversation: SMSMessage[];
}

export interface SMSShowcaseConfig {
  eyebrow: string;
  headline: string;
  subheadline: string;
  panels: SMSPanel[];
  cta?: {
    label: string;
    href: string;
    note?: string;
  };
}

// Home — broad agent audience, pain-point-led moments.
export const homeSMSShowcase: SMSShowcaseConfig = {
  eyebrow: 'Brittani via SMS',
  headline: 'Your TC Is One Text Away',
  subheadline:
    'No app. No login. No waiting on a callback. Text Brittani like you’d text a human TC — and get your answer in 3 seconds.',
  panels: [
    {
      title: 'Check any deadline from anywhere',
      description:
        'Between showings, at a listing appointment, in the school pickup line. Ask about any date on any deal and get the answer before the light turns green.',
      conversation: [
        { from: 'agent', text: "when's the inspection deadline on 4021 maple?" },
        {
          from: 'brittani',
          text: 'Inspection contingency ends Fri Jul 24, 5pm — 3 days out. Inspector confirmed for tomorrow 9am.',
        },
      ],
    },
    {
      title: 'Get a full deal status in seconds',
      description:
        'Your client calls asking where things stand. Instead of "let me check and call you back," you have the whole picture before they finish the question.',
      conversation: [
        { from: 'agent', text: 'status on the rodriguez deal?' },
        {
          from: 'brittani',
          text: '112 Palm Ave:\n• EMD received\n• Inspection complete\n• Appraisal ordered — ETA Jul 28\nNext deadline: loan commitment Aug 1.',
        },
      ],
    },
    {
      title: 'Approve emails without opening a laptop',
      description:
        'Brittani drafts the update, you reply "send." Your sellers get a professional status email from your address — while you stay in the field.',
      conversation: [
        {
          from: 'brittani',
          text: 'Draft ready: appraisal update for your sellers at 88 Bayshore. Want me to send it?',
        },
        { from: 'agent', text: 'send' },
        { from: 'brittani', text: 'Sent from your email. I’ll flag their reply when it comes in.' },
      ],
    },
    {
      title: 'Catch problems before they cost you',
      description:
        'Brittani doesn’t just answer — she warns you. Stalled title work, quiet lenders, approaching deadlines: flagged by text before they become fires.',
      conversation: [
        {
          from: 'brittani',
          text: 'Heads up — title hasn’t confirmed lien clearance on 4021 Maple and closing is 6 days out. Want me to draft a follow-up to Premier Title?',
        },
        { from: 'agent', text: 'yes' },
        { from: 'brittani', text: 'Draft ready. Reply "send" and it goes out from your email.' },
        { from: 'agent', text: 'send' },
        { from: 'brittani', text: 'Sent to Premier Title. I’ll text you when they respond.' },
      ],
    },
  ],
  cta: {
    label: 'Start Free Trial',
    href: 'https://app.brittani.ai/sign-up',
    note: '14-day free trial. No credit card required.',
  },
};

// Features — capability-led: what the SMS agent can actually do.
export const featuresSMSShowcase: SMSShowcaseConfig = {
  eyebrow: 'Brittani via SMS',
  headline: 'Every Deal Answer. One Text Thread.',
  subheadline:
    'Text Brittani from the car, the closing table, or a showing — and get an answer in 3 seconds. Deadlines, summaries, approvals, follow-ups — no dashboard required.',
  panels: [
    {
      title: 'Ask anything about any deal',
      description:
        'Every date, dollar, and contact Brittani extracted from your contracts is one question away. Plain-English questions, plain-English answers.',
      conversation: [
        { from: 'agent', text: 'what’s the escrow amount on elm st?' },
        {
          from: 'brittani',
          text: '$15,000 EMD — received by Coastal Escrow Jul 14. Receipt is on file in the deal record.',
        },
      ],
    },
    {
      title: 'Pull a deal summary on demand',
      description:
        'One text returns the full state of a transaction: what’s done, what’s pending, and the next deadline — pulled live from the deal record.',
      conversation: [
        { from: 'agent', text: 'summary of 745 oak ridge' },
        {
          from: 'brittani',
          text: '745 Oak Ridge:\n• Contract executed Jul 10\n• EMD confirmed\n• Appraisal scheduled Jul 23\nNext deadline: financing contingency Jul 31.',
        },
      ],
    },
    {
      title: 'Review and approve outgoing emails',
      description:
        'Brittani drafts every party communication and waits for your go-ahead. Approve from your phone and it sends from your real email address.',
      conversation: [
        {
          from: 'brittani',
          text: '2 drafts ready for Elm St: deadline reminder to buyer’s agent, status update to your sellers. Reply PREVIEW to read them or SEND to approve both.',
        },
        { from: 'agent', text: 'send' },
        { from: 'brittani', text: 'Both sent from your email. I’m watching for replies and will text you the moment either one answers.' },
      ],
    },
    {
      title: 'Kick off follow-ups by text',
      description:
        'Lender gone quiet? Title dragging? Tell Brittani to chase it and get back to selling. She drafts the follow-up, waits for your yes, then reports back with the answer.',
      conversation: [
        { from: 'agent', text: 'any word from the lender on palm ave?' },
        {
          from: 'brittani',
          text: 'Last update Jul 15: conditional approval. Want me to request a status update from the loan officer?',
        },
        { from: 'agent', text: 'yes' },
        { from: 'brittani', text: 'Request sent. I’ll text you the moment they reply.' },
      ],
    },
  ],
  cta: {
    label: 'Start Free Trial',
    href: 'https://app.brittani.ai/sign-up',
    note: '14-day free trial. No credit card required.',
  },
};

// Solutions/agents — solo agent, day-in-the-life moments.
export const agentsSMSShowcase: SMSShowcaseConfig = {
  eyebrow: 'Brittani via SMS',
  headline: 'Run Your Deals From Your Car',
  subheadline:
    'You’re never at your desk — and now you don’t need to be. A full transaction coordinator in your text thread, for $29/month — not $400 a file.',
  panels: [
    {
      title: '9:40 AM — between showings',
      description:
        'Your buyer asks about the appraisal in the driveway of the next showing. You answer on the spot instead of promising to "check when I’m back at my desk."',
      conversation: [
        { from: 'agent', text: 'appraisal status 210 sunset?' },
        { from: 'brittani', text: 'Scheduled for tomorrow 10am. Appraiser confirmed access with the listing agent yesterday.' },
      ],
    },
    {
      title: '2:15 PM — the other agent needs an answer',
      description:
        'The listing agent texts asking if your buyer’s loan is on track. You answer before they’re done typing — like you never left your desk.',
      conversation: [
        { from: 'agent', text: 'loan status 77 magnolia ct?' },
        { from: 'brittani', text: 'Conditional approval cleared Monday. Loan commitment is due Fri Jul 24 — processor confirmed on track yesterday.' },
      ],
    },
    {
      title: '6:30 PM — approvals from the pickup line',
      description:
        'The day got away from you. The client update didn’t. Approve Brittani’s draft with one word and it goes out from your email — tonight, not tomorrow.',
      conversation: [
        { from: 'brittani', text: 'Draft ready: weekly status update to your buyers on Oak St. Send it?' },
        { from: 'agent', text: 'send' },
        { from: 'brittani', text: 'Sent. That’s every party updated this week — nothing else is waiting on you.' },
      ],
    },
    {
      title: '11:00 PM — nothing left to chase',
      description:
        'No late-night email session. No 2am "did I miss a deadline?" panic. Brittani already tracked every date and sent every follow-up — you get to be done.',
      conversation: [
        { from: 'agent', text: 'anything need me tonight?' },
        {
          from: 'brittani',
          text: 'All quiet. EMD confirmed on Palm Ave, tomorrow’s reminders are scheduled, nothing due this week. Get some sleep.',
        },
      ],
    },
  ],
  cta: {
    label: 'Start Free Trial',
    href: 'https://app.brittani.ai/sign-up',
    note: '14-day free trial. No credit card required.',
  },
};

// Solutions/teams — team lead oversight without chasing agents.
export const teamsSMSShowcase: SMSShowcaseConfig = {
  eyebrow: 'Brittani via SMS',
  headline: 'Your Whole Pipeline, One Text Away',
  subheadline:
    'Stop texting your agents for status. Text Brittani instead — and get deal-level truth across the whole team in seconds.',
  panels: [
    {
      title: 'Check any deal without pinging your agent',
      description:
        'It’s Saturday and a seller calls you directly. Get the real status of any team deal without interrupting your agent’s open house.',
      conversation: [
        { from: 'agent', text: 'status on marcus’s deal at 55 harbor?' },
        {
          from: 'brittani',
          text: '55 Harbor Ln: inspection done, appraisal came in at value, clear to close pending final walkthrough Fri. On track for Jul 31.',
        },
      ],
    },
    {
      title: 'Spot the deal that’s slipping',
      description:
        'Brittani watches every deadline on every team deal and texts you when something stalls — so you coach before it becomes a fire, not after.',
      conversation: [
        {
          from: 'brittani',
          text: 'Heads up — financing contingency on 902 Cypress (Dana’s deal) expires in 48h and the lender hasn’t confirmed. Want me to follow up and copy Dana?',
        },
        { from: 'agent', text: 'yes do it' },
        { from: 'brittani', text: 'Follow-up sent to the loan officer from Dana’s email. I’ll alert you both when they reply.' },
      ],
    },
    {
      title: 'Morning pipeline check-in',
      description:
        'One text replaces the Monday status meeting. Every active deal, every deadline this week, every item needing attention — before your first coffee.',
      conversation: [
        { from: 'agent', text: 'what needs attention this week?' },
        {
          from: 'brittani',
          text: '14 active deals. This week:\n• 3 inspection deadlines\n• 2 closings (Thu, Fri)\n• 1 flag: lender still hasn’t confirmed on 902 Cypress\nEverything else is on schedule.',
        },
      ],
    },
    {
      title: 'Every agent, the same standard',
      description:
        'Your newest agent texts Brittani the same way your top producer does. Consistent answers, consistent client experience — no $400-per-file TC bottleneck in between.',
      conversation: [
        { from: 'agent', text: 'did jordan send the welcome emails on her new listing?' },
        {
          from: 'brittani',
          text: 'Yes — intro emails went to all parties on 18 Coral Way yesterday at 4:02pm, from Jordan’s address. Deadline reminders are scheduled.',
        },
      ],
    },
  ],
  cta: {
    label: 'Start Free Trial',
    href: 'https://app.brittani.ai/sign-up',
    note: '14-day free trial. No credit card required.',
  },
};
